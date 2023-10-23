# MongoDB

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

