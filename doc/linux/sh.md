# SH

Recursive find file & action

```
find . -type f -name '*.o' -exec rm {} \;
```

Recursive find dir & action

```
find . -depth -name '.git' 
find . -depth -name '.git'  -exec rm -rf {} \;
```

cp ~/codes/js-ts-codes/js-codes/.gitignore .