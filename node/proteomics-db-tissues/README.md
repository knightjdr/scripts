### Parse Proteomics DB tissue expression from JSON to text 

Place json file in `data` folder.

#### Run script

```
node index.js --file=data/expression.json
```

#### Arguments

| argument | definition                     | default              |
|----------|--------------------------------|----------------------|
| --file   | json file with expression data | 'data/expression.json' |

#### Output

Will output to tab-delimited file call `output/expression.txt`