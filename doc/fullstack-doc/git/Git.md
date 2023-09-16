# Git

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

