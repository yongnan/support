# Rust

# Getting started

## Installation

### [Installing `rustup` on Linux or macOS](https://doc.rust-lang.org/book/ch01-01-installation.html#installing-rustup-on-linux-or-macos)

If you’re using Linux or macOS, open a terminal and enter the following command:

```bash
$ curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh
```

You will also need a *linker*, which is a program that Rust uses to join its compiled outputs into one file. It is likely you already have one. If you get linker errors, you should install a C compiler, which will typically include a linker. A C compiler is also useful because some common Rust packages depend on C code and will need a C compiler.

On macOS, you can get a C compiler by running:

```console
$ xcode-select --install
```

To check whether you have Rust installed correctly, open a shell and enter this line:

```console
$ rustc --version
```

### [Updating and Uninstalling](https://doc.rust-lang.org/book/ch01-01-installation.html#updating-and-uninstalling)

Once Rust is installed via `rustup`, updating to a newly released version is easy. From your shell, run the following update script:

```console
$ rustup update
```

To uninstall Rust and `rustup`, run the following uninstall script from your shell:

```console
$ rustup self uninstall
```

### [Local Documentation](https://doc.rust-lang.org/book/ch01-01-installation.html#local-documentation)

The installation of Rust also includes a local copy of the documentation so that you can read it offline. Run `rustup doc` to open the local documentation in your browser.

## Hello World

### [Anatomy of a Rust Program](https://doc.rust-lang.org/book/ch01-02-hello-world.html#anatomy-of-a-rust-program)

Let’s review this “Hello, world!” program in detail. Here’s the first piece of the puzzle:

```rust
fn main() {

}
```

`println!` calls a Rust macro. 

```
$ rustc main.rs
$ ./main
Hello, world!
```

## [Cargo](https://doc.rust-lang.org/book/ch01-03-hello-cargo.html#hello-cargo)

Cargo comes installed with Rust.

Cargo is Rust’s build system and package manager. 

### [Creating a Project with Cargo](https://doc.rust-lang.org/book/ch01-03-hello-cargo.html#creating-a-project-with-cargo)

```
$ cargo new hello_cargo
$ cd hello_cargo
```

It has also initialized a new Git repository along with a *.gitignore* file. 

Git files won’t be generated if you run `cargo new` within an existing Git repository; you can override this behavior by using `cargo new --vcs=git`.

Run `cargo new --help` to see the available options.

### [Building and Running a Cargo Project](https://doc.rust-lang.org/book/ch01-03-hello-cargo.html#building-and-running-a-cargo-project)

```
$ cargo build
```

This command creates an executable file in *target/debug/hello_cargo*

the default build is a debug build

```
$ ./target/debug/hello_cargo # or .\target\debug\hello_cargo.exe on Windows
Hello, world!
```

we can also use `cargo run` to compile the code

```console
$ cargo run
    Finished dev [unoptimized + debuginfo] target(s) in 0.0 secs
     Running `target/debug/hello_cargo`
Hello, world!
```