# MongoDB

# Tools

1

### Install Homebrew.[![img](https://www.mongodb.com/docs/database-tools/assets/link.svg)](https://www.mongodb.com/docs/database-tools/installation/installation-macos/#install-homebrew)

macOS does not include the Homebrew `brew` package by default. Install `brew` using the official [Homebrew installation instructions](https://brew.sh/#install).

2

### Tap the MongoDB formula.[![img](https://www.mongodb.com/docs/database-tools/assets/link.svg)](https://www.mongodb.com/docs/database-tools/installation/installation-macos/#tap-the-mongodb-formula)

In your macOS Terminal, run the following command to download the official [MongoDB Homebrew formulae](https://github.com/mongodb/homebrew-brew) for MongoDB and the Database Tools:

```
brew tap mongodb/brew
```

3

### Install the MongoDB Database Tools.[![img](https://www.mongodb.com/docs/database-tools/assets/link.svg)](https://www.mongodb.com/docs/database-tools/installation/installation-macos/#install-the-mongodb-database-tools)

In your macOS Terminal, run the following command to install the MongoDB Database Tools:

```
brew install mongodb-database-tools
```

# QA

#### [How to set DB name and Collection name in Mongoose?](https://stackoverflow.com/questions/61388479/how-to-set-db-name-and-collection-name-in-mongoose)

**Approach 1**

```js
const url = "mongodb://127.0.0.1:27017/DatabaseName"

mongoose.connect(url).then(() => {
    console.log("Connected to Database");
}).catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
});
```

**Approach 2**

```js
const url = "mongodb://127.0.0.1:27017"

mongoose.connect(url,{
    dbName: 'DatabaseName',
}).then(() => {
    console.log("Connected to Database");
}).catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
});
```

#### [How can I tell where mongoDB is storing data? (its not in the default /data/db!)](https://stackoverflow.com/questions/7247474/how-can-i-tell-where-mongodb-is-storing-data-its-not-in-the-default-data-db)

```
$sudo lsof -p `ps aux | grep mongodb | head -n1 | tr -s ' ' | cut -d' ' -f 2` | grep REG
```

