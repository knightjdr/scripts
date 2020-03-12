### Parse HEK293 and HeLa protein expression data 

Place gix database json file in `data` folder.

#### Run script

```
node index.js --file=data/gix.json
```

#### Arguments

| argument | definition                     | default              |
|----------|--------------------------------|----------------------|
| --file   | gix database file              | 'data/gix.json' |

#### Output

Will output to tab-delimited file call `output/expression.txt`