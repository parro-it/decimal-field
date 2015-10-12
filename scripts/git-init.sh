#!/bin/sh
gh re --new decimal-field --description  &&

git init &&

git remote add origin https://github.com/parro-it/decimal-field.git &&

joe sublimetext node > .gitignore &&
echo '\nprivate\ninit\n' >> .gitignore &&

git add .  &&
git commit -m "project skeleton" &&
git push --set-upstream origin master

