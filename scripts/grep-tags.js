#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

const grepTags = process.env.GREP_TAGS || ''

if (!grepTags) {
  // No filter, run all tests
  const args = process.argv.slice(2).join(' ')
  execSync(`cypress run ${args}`, { stdio: 'inherit' })
  process.exit(0)
}

// Determine mode: AND (comma) or OR (pipe)
const isAnd = grepTags.includes(',')
const tagsArray = grepTags.split(isAnd ? ',' : '|').map(t => t.trim())
const mode = isAnd ? 'AND' : 'OR'

// Find all spec files
const specDir = path.join(__dirname, '..', 'cypress', 'e2e')
const specs = []

function findSpecs(dir) {
  const files = fs.readdirSync(dir)
  files.forEach(file => {
    const fullPath = path.join(dir, file)
    const stat = fs.statSync(fullPath)
    if (stat.isDirectory()) {
      findSpecs(fullPath)
    } else if (file.endsWith('.cy.js')) {
      const content = fs.readFileSync(fullPath, 'utf8')

      let matches = false
      if (isAnd) {
        // AND mode: all tags must be present
        matches = tagsArray.every(tag => content.includes(tag))
      } else {
        // OR mode: at least one tag must be present
        matches = tagsArray.some(tag => content.includes(tag))
      }

      if (matches) {
        specs.push(fullPath)
      }
    }
  })
}

findSpecs(specDir)

if (specs.length === 0) {
  console.warn(`No tests found matching tags (${mode}): ${grepTags}`)
  process.exit(0)
}

// Build cypress command with matched specs
const specArg = specs.map(s => `'${s}'`).join(',')
const args = process.argv.slice(2).join(' ')
execSync(`cypress run --spec ${specArg} ${args}`, { stdio: 'inherit' })
