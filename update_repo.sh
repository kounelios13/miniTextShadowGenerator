#! /usr/bin/bash
echo "Type a commit message:"
read "msg"
git add "*.*"
git commit -m"$msg"
git push