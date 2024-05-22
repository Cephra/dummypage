#!/usr/bin/env bash

# ensure project root
cd "$(dirname "$0")"

# clean it
rm -rf dist

# install deps
npm install

# build
npm run build

# sync dist folder
rsync -av --delete dist/ /srv/http/www.0x29a.me/