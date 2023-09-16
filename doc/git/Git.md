# Git

### Quick Answer - Merge Branch into Master

If you're looking for a quick answer, to merge a branch into the `master` branch - you `checkout master` and `merge some_branch`:

```
$ git checkout new-branch
# ...develop some code...

$ git add .
$ git commit –m "Some commit message"
$ git checkout master
Switched to branch 'master'
$ git merge new-branch

```



```
git pull origin master --allow-unrelated-histories
```

# [Git, fatal: The remote end hung up unexpectedly](https://stackoverflow.com/questions/15240815/git-fatal-the-remote-end-hung-up-unexpectedly)

This is due to git/https buffer settings.

Run this (taken from [Git fails when pushing commit to github](https://stackoverflow.com/questions/2702731/git-fails-when-pushing-commit-to-github)):

```
git config http.postBuffer 524288000
```



## Clear Entire Git Cache

In some cases, you may want **to clear the cache of your entire Git staging area**.

This is particularly useful when you added multiple files that you want now to be ignored via your .gitignore file.

**To clear your entire Git cache, use the “git rm” command with the “-r” option for recursive.**

```
$ git rm -r --cached .
```

When all files are removed from the index, you can add the regular files back (the one you did not want to ignore)

```
$ git add .
$ git commit -am 'Removed files from the index (now ignored)'
```
