# Rust

# Getting started

## Installation

### [Installing `rustup` on Linux or macOS](https://doc.rust-lang.org/book/ch01-01-installation.html#installing-rustup-on-linux-or-macos)

If you’re using Linux or macOS, open a terminal and enter the following command:

```bash
$ curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh
```

```
source "$HOME/.cargo/env"
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

 quickly checks your code to make sure it compiles but doesn’t produce an executable:

```
$ cargo check
   Checking hello_cargo v0.1.0 (file:///projects/hello_cargo)
    Finished dev [unoptimized + debuginfo] target(s) in 0.32 secs
```

### [Building for Release](https://doc.rust-lang.org/book/ch01-03-hello-cargo.html#building-for-release)

When your project is finally ready for release, you can use 

```
cargo build --release
```

to compile it with optimizations. This command will create an executable in *target/release*

# Common Programming Concepts

## Modules

### define locally

```rust
struct MyStruct {}
fn main () {
	let _ms = MyStruct {};
}
```

### module file (based on files)

new file `my_struct.rs` in the same folder (/src)

```
pub struct MyStruct {}
```

```
hello_rust
  - src
    - main.rs
    - my_struct.rs
```

`main.rs`

```rust
mod my_struct;                  <-- Import the module code, placing
                                    it into the 'my_struct'
                                    namespace
use crate::my_struct::MyStruct; <-- Map the fully qualified (from 
                                    the crate root) struct 
                                    declaration to just 'MyStruct'
fn main() {
  let _ms = MyStruct {};        <-- Yay, we found it! .. or did we?
}
```

### Rust modules (based on folders)

creating a folder called `foo/`, rename `my_struct.rs` to 'mod.rs'  

```
- src/
  - main.rs
  - foo/
    - my_struct.rs
```

`mod.rs`, conent remians the same:

```rust
pub struct MyStruct {}
```

include our new module `foo` replacing `my_struct`

```rust
mod foo;                   //<-- Change the module to match the folder
use crate::foo::MyStruct;  //<-- Update the namespace to 'foo'
fn main() {
  let _ms = MyStruct {};
}
```

add another defintion `src/foo/another.rs`:

```rust
pub struct Another {} //<-- We're going to expose this as public
                      //    from the 'foo' module so that we can
                      //    use it in main.rs
```

import our new module into the *mod.rs* file —

```rust
pub mod another; //<-- Add the module import for 'another'
                 //    Note the use of 'pub' to expose the
                 //    module 'another' as public from the
                 //    module 'foo'
pub struct MyStruct {}
```

using our new Another struct in main.rs

```rust
mod foo;
use crate::foo::MyStruct;
use crate::foo::another::Another; //<-- Note that 'another' is a
                                  //    module within 'foo'
fn main() {
  let _ms = MyStruct {};
  let _a = Another {};            //<-- Using prefix '_' as before
}
```

### Prelude

modify *mod.rs* file within the `foo/` folder, Change the contents to:

```rust
mod another; //<-- Remove the 'pub' modifier
pub use another::Another; //<-- Add a use'ing to map Another directly
                          //    into 'foo' and make it public
pub struct MyStruct {}
```

To use of the extended `use` syntax to import multiple names at once.

Last, let’s update our main.rs —

```rust
mod foo;
use crate::foo::{MyStruct,Another};fn main() {
  let _ms = MyStruct {};
  let _a = Another {};
}
```

 a prelude is just a pattern for making available all types you want to be public, in an idiomatic way. 

to our *main.rs* we go - 

```rust
mod foo;
mod prelude {                             //<-- Create module inline
  pub use crate::foo::{MyStruct,Another}; //<-- Note the 'pub' here!
}
use crate::prelude::*;                    //<-- Make the types exposed
                                              in the prelude
                                              available
fn main() {
  let _ms = MyStruct {};
  let _a = Another {};
}
```

 we can also use the `prelude` module just like any other, for example in the *mod.rs* file—

```rust
mod another;
pub use another::Another;
use crate::prelude::*;
pub struct MyStruct {}     
```

## Package, crate and module

### Crate

A crate is the smallest amount of code that the Rust compiler considers at a time.
root is a source file that the Rust compiler starts from and makes up the root module of your crate.

* can contain modules
* the modules defined in other files

two forms of crate

#### binary crate

you can compile to an executable that you can run, such as a command-line program or a server.

Each must have a function called main that defines what happens when the executable runs

#### library crate 

don’t have a main function, and they don’t compile to an executable. Instead, they define functionality intended to be shared with multiple projects. 

Most of the time when Rustaceans say “crate”, they mean library crate, and they use “crate” interchangeably with the general programming concept of a “library".

### Pacakge

A package is a bundle of one or more crates that provides a set of functionality.

A package contains a Cargo.toml file that describes how to build those crates.

A package can contain as many binary crates as you like, but at most only one library crate. 

A package must contain at least one crate, whether that’s a library or binary crate.

root crate file:

- binary: src/main.rs
- library: src/lib.rs

multiple cates:

* src/bin: each file will be a separate binary crate.
