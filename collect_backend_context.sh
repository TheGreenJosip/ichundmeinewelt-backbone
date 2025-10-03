#!/usr/bin/env bash
# =============================================================================
# collect_backend_context.sh
#
# Purpose:
#   Generate a single, structured "context dump" of key backend source files.
#   This is designed for feeding into LLMs or code review tools to provide
#   a quick, holistic view of the backend architecture.
#
# Features:
#   - Configurable file list via external config or inline array
#   - Clear section separators for each file
#   - Missing file warnings both in output and stderr
#   - Language hints for LLMs (```ts, ```graphql, ```bash)
#   - Robust error handling and portability
#
# Usage:
#   ./collect_backend_context.sh
#
# Output:
#   backend_context_dump.txt in the current directory
#
# =============================================================================

set -euo pipefail  # Exit on error, unset var, or failed pipe

# -----------------------------------------------------------------------------
# Configuration
# -----------------------------------------------------------------------------
OUTPUT_FILE="backend_context_dump.txt"
PROJECT_NAME="ichundmeinewelt-backbone"

# List of files to collect (relative to repo root)
FILES=(
  "keystone.ts"
  "schema.ts"
  "schema.prisma"
  "src/models/Post.ts"
  "src/models/Category.ts"
  "src/models/Tag.ts"
  "src/hooks/postHooks.ts"
  "src/access-control/access.ts"
  "src/access-control/role.enum.ts"
  "src/graphql/index.ts"
  "src/graphql/mutations/createContactSubmission.ts"
  "src/graphql/mutations/createSubscriber.ts"
  "src/graphql/queries/helloWorld.ts"
  "src/utils/slugify.ts"
  "src/utils/timestampFields.ts"
  "auth.ts"
  "src/auth.ts"
)

# -----------------------------------------------------------------------------
# Initialize output file
# -----------------------------------------------------------------------------
{
  echo "# Backend Context Dump"
  echo "# Generated on $(date '+%Y-%m-%d %H:%M:%S %Z')"
  echo "# Project: $PROJECT_NAME"
  echo
} > "$OUTPUT_FILE"

# -----------------------------------------------------------------------------
# Function: dump_file
# Dumps a single file with section headers and language hints for LLMs.
# -----------------------------------------------------------------------------
dump_file() {
  local file="$1"
  local ext="${file##*.}"  # Extract extension for language hint

  echo "============================================================" >> "$OUTPUT_FILE"
  echo "### FILE: $file" >> "$OUTPUT_FILE"
  echo "============================================================" >> "$OUTPUT_FILE"

  if [[ -f "$file" ]]; then
    # Language hint for LLMs
    case "$ext" in
      ts)   echo '```ts' >> "$OUTPUT_FILE" ;;
      js)   echo '```js' >> "$OUTPUT_FILE" ;;
      prisma) echo '```prisma' >> "$OUTPUT_FILE" ;;
      graphql) echo '```graphql' >> "$OUTPUT_FILE" ;;
      sh)   echo '```bash' >> "$OUTPUT_FILE" ;;
      *)    echo '```' >> "$OUTPUT_FILE" ;;
    esac

    cat "$file" >> "$OUTPUT_FILE"
    echo '```' >> "$OUTPUT_FILE"
    echo >> "$OUTPUT_FILE"
  else
    echo "WARNING: $file not found, skipping..." >&2
    echo "(NOT FOUND)" >> "$OUTPUT_FILE"
    echo >> "$OUTPUT_FILE"
  fi
}

# -----------------------------------------------------------------------------
# Iterate over files
# -----------------------------------------------------------------------------
for FILE in "${FILES[@]}"; do
  dump_file "$FILE"
done

# -----------------------------------------------------------------------------
# Completion message
# -----------------------------------------------------------------------------
echo "✅ Backend context collected into $OUTPUT_FILE"