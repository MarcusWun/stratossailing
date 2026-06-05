#!/usr/bin/env bash
set -e

echo "Building..."
npm run build

echo "Staging and committing..."
git add -A
git commit -m "${1:-Deploy: rebuild site}"

echo "Pushing source to main..."
git push origin main

echo "Pushing built site to deploy branch..."
git subtree push --prefix dist origin deploy

echo "Done. Hostinger will pull within ~2 minutes."
