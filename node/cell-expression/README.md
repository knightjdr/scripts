### Parse HEK293 and HeLa protein expression data 

Place gix database json file in `data` folder.

#### Run script

Protein
```
node index.js --file=data/2020-11-12-homo-sapiens.json --cell="HEK-293" --type=protein
```

RNA
```
node index.js --file=data/2020-11-12-homo-sapiens.json --cell="HEK 293" --type=rna
```

#### Arguments

| argument | definition                             | default              |
|----------|----------------------------------------|----------------------|
| --cell   | cell line name                         | HEK-293              |
| --file   | gix database file                      | 'data/gix.json'      |
| --type   | type of expression data (protein, rna) | protein              |

#### Output

Will output to tab-delimited file call `output/expression-[cell]-[type].txt`