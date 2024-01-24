# Git Submodule

## Starting with Submodules

inside your main project

```bash
$ git submodule add https://github.com/ync-js-nodejs-js/sample-js
```

```console
$ git status
On branch master
Your branch is up-to-date with 'origin/master'.

Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

	new file:   .gitmodules
	new file:   sample-js
```

the new `.gitmodules` file:

```ini
[submodule "DbConnector"]
	path = DbConnector
	url = https://github.com/ync-js-nodejs-js/sample-js
```

`git diff` to check

```
$ git diff --cached DbConnector
diff --git a/DbConnector b/DbConnector
new file mode 160000
index 0000000..c3f01dc
--- /dev/null
+++ b/DbConnector
@@ -0,0 +1 @@
+Subproject commit c3f01dc8862123d317dd46284b05b6892c7b29bc
```

`git diff --submodule `to check in more detail

```
$ git diff --cached --submodule
diff --git a/.gitmodules b/.gitmodules
new file mode 100644
index 0000000..71fc376
--- /dev/null
+++ b/.gitmodules
@@ -0,0 +1,3 @@
+[submodule "DbConnector"]
+       path = DbConnector
+       url = https://github.com/chaconinc/DbConnector
Submodule DbConnector 0000000...c3f01dc (new submodule)
```

commit

```console
$ git commit -am 'Add DbConnector module'
[master fb9093c] Add DbConnector module
 2 files changed, 4 insertions(+)
 create mode 100644 .gitmodules
 create mode 160000 DbConnector
```

Lastly, push these changes:

```console
$ git push origin master
```

## **Cloning a Project with Submodules**

```console
$ git clone https://github.com/chaconinc/MainProject
```

The `DbConnector` directory is there, but empty.

`git submodule init` to initialize your local configuration file,

```console
$ git submodule init
Submodule 'DbConnector' (https://github.com/chaconinc/DbConnector) registered for path 'DbConnector'
```

`git submodule update` fetch all the data from that project and check out the appropriate commit listed in your superproject

```
$ git submodule update
Cloning into 'DbConnector'...
```

or `--recurse-submodules`, to automatically initialize and update each submodule in the repository 

```console
$ git clone --recurse-submodules https://github.com/chaconinc/MainProject
```

To also initialize, fetch and checkout any nested submodules, use `git submodule update --init --recursive`.

### Working on a Project with Submodules

#### Pulling in Upstream Changes from the Submodule Remote