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

## QA

### [git: undo all working dir changes including new files](https://stackoverflow.com/questions/1090309/git-undo-all-working-dir-changes-including-new-files)

git checkout -f

```
git reset --hard # removes staged and working directory changes

## !! be very careful with these !!
## you may end up deleting what you don't want to
## read comments and manual.
git clean -f -d # remove untracked
git clean -f -x -d # CAUTION: as above but removes ignored files like config.
git clean -fxd :/ # CAUTION: as above, but cleans untracked and ignored files through the entire repo (without :/, the operation affects only the current directory)
```

To see what will be deleted before-hand, without actually deleting it, use the `-n` flag (this is basically a test-run). When you are ready to actually delete, then remove the `-n` flag:

```
git clean -nfd
```

 How to Update Fork Repo From Origina



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
