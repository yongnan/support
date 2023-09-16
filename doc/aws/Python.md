# Python 

# Installation 

download: 

https://www.python.org/downloads/release/python-3114/

click .pkg

## 1. Install pyenv

[Moshe Zadka](https://opensource.com/users/moshez) cautions that doing this wrong could result in an unreliable idea of which Python is running that depends too closely on shells loading aliases. I knew Moshe was familiar with Python, but what I didn't know is that he is an author of *many* Python tutorials as well as an upcoming book on Python development on macOS. He helped 40 colleagues develop Python safely and consistently on macOS systems following one core principle:

> "The basic premise of all Python development is to never use the system Python. You do not *want* the Mac OS X 'default Python' to be 'python3.' You want to never care about default Python."

How do we stop caring about the default? Moshe recommends using [**pyenv**](https://github.com/pyenv/pyenv) to manage Python environments (for a deeper dive on configuring pyenv, [see this article](https://opensource.com/article/19/6/virtual-environments-python-macos)). This tool manages multiple versions of Python and is described as "simple, unobtrusive, and follows the Unix tradition of single-purpose tools that do one thing well."

While other [installation options](https://github.com/pyenv/pyenv#installation) are available, the easiest way to get started is with Homebrew:

```bash
$ brew install pyenv 
?  /usr/local/Cellar/pyenv/1.2.10: 634 files, 2.4MB
```

## 2. Install Python

Now let's install the latest Python version (3.7.3 as of this writing):

```bash
$ pyenv install 3.7.3
python-build: use openssl 1.0 from homebrew
python-build: use readline from homebrew
Downloading Python-3.7.3.tar.xz...
-> https://www.python.org/ftp/python/3.7.3/Python-3.7.3.tar.xz
Installing Python-3.7.3...
## further output not included ##
```

## 3. Set your global default

Now that Python 3 is installed through pyenv, we want to set it as our global default version for pyenv environments:

```bash
$ pyenv global 3.7.3
# and verify it worked 
$ pyenv version
3.7.3 (set by /Users/mbbroberg/.pyenv/version)
```

The power of pyenv comes from its control over our shell's path. In order for it to work correctly, we need to add the following to our configuration file (**.zshrc** for me, possibly **.bash_profile** for you):

```text
$ echo -e 'if command -v pyenv 1>/dev/null 2>&1; then\n  eval "$(pyenv init -)"\nfi' >> ~/.zshrc
```

After that command, our dotfile (**.zshrc** for zsh or **.bash_profile** for Bash) should include these lines:

```bash
if command -v pyenv 1>/dev/null 2>&1; then
  eval "$(pyenv init -)"
fi
```

Now we know for certain that we're using Python 3.7.3 and pip will update alongside it without any manual aliasing between versions. Using Moshe's recommendation to use a version manager (pyenv) enables us to easily accept future upgrades without getting confused about which Python we are running at a given time.

## Success

As you get comfortable with this workflow, you can [use pyenv to manage multiple versions of Python](https://opensource.com/article/20/4/pyenv). It's also essential, for dependency management, to use virtual environments. I mention how to use the built in [venv](https://docs.python.org/3/library/venv.html) library in the article, and Moshe recommends [virtualenvwrapper for managing virtual environments](https://opensource.com/article/19/6/python-virtual-environments-mac).