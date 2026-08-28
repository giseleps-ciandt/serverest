#!/bin/bash

# Simula a lógica dos conditionals do GitHub Actions

test_case() {
  local tags="$1"
  local event="${2:-workflow_dispatch}"

  echo "================================"
  echo "Teste: tags='$tags' event='$event'"
  echo "================================"

  # API job condition
  api_skip=false
  if [[ "$event" == "workflow_dispatch" ]]; then
    if [[ "$tags" == *"@frontend"* ]] && [[ "$tags" != *"|"* ]]; then
      api_skip=true
    fi
  fi

  # Frontend job condition
  frontend_skip=false
  if [[ "$event" == "workflow_dispatch" ]]; then
    if [[ "$tags" == *"@api"* ]] && [[ "$tags" != *"|"* ]]; then
      frontend_skip=true
    fi
  fi

  # Calculate GREP_TAGS for each job
  api_grep=""
  if [[ "$tags" != "" ]] && [[ "$tags" != *"@api"* ]] && [[ "$tags" != *"@frontend"* ]]; then
    api_grep="@api,$tags"
  elif [[ "$tags" != "" ]]; then
    api_grep="$tags"
  else
    api_grep="@api"
  fi

  frontend_grep=""
  if [[ "$tags" != "" ]] && [[ "$tags" != *"@api"* ]] && [[ "$tags" != *"@frontend"* ]]; then
    frontend_grep="@frontend,$tags"
  elif [[ "$tags" != "" ]]; then
    frontend_grep="$tags"
  else
    frontend_grep="@frontend"
  fi

  echo "API Job:"
  if [[ "$api_skip" == true ]]; then
    echo "  ❌ SKIPPED"
  else
    echo "  ✅ RUNS with GREP_TAGS='$api_grep'"
  fi

  echo "Frontend Job:"
  if [[ "$frontend_skip" == true ]]; then
    echo "  ❌ SKIPPED"
  else
    echo "  ✅ RUNS with GREP_TAGS='$frontend_grep'"
  fi
  echo ""
}

echo "Testando lógica de workflow..."
echo ""

test_case "" "push"
test_case "@login" "workflow_dispatch"
test_case "@api,@login" "workflow_dispatch"
test_case "@frontend,@login" "workflow_dispatch"
test_case "@api|@login" "workflow_dispatch"
test_case "@api" "workflow_dispatch"
test_case "@frontend" "workflow_dispatch"
