#! /bin/bash

git switch main &&
production_last_local_commit_sha=$(git log -1 --pretty=%H | cat) &&
git pull &&
production_last_origin_commit_sha=$(git log -1 --pretty=%H | cat)

if [ "$production_last_local_commit_sha" != "$production_last_origin_commit_sha" ]; then 
  echo  -e "\033[33mwarning\033[0m your local main commit is different from remote one"
  echo "Check the changes!"
  exit 1
fi

production_last_commit=$(git log -1 --pretty=%B | cat)
if [[ "$production_last_commit" == "chore(release)"* ]]; then 
  echo -e "\033[31merror\033[0m no changes were applied since last release"
  exit 1
fi

yarn release &&
git push --follow-tags