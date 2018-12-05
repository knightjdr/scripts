### SegCircle plot generator

Can generate a segcirlce interactive file for ProHits-viz either with real or random data.

For real data need:
* RNA expression data: [HPA cell data](https://www.proteinatlas.org/download/rna_celline.tsv.zip)
* interaction data: should have two columns with source and target genes for each interaction

Arguments when inputting data file:

| argument       | definition                | default               |
|----------------|---------------------------|-----------------------|
| --expression   | file with expression data | data/expression.txt   |
| --fdr          | FDR filter                | 0.01                  |
| --interactions | file with interactions    | data/interactions.txt |
| --saint        | SAINT file                | data/saint.txt        |

Arguments for random data:

| argument   | definition                     | default |
|------------|--------------------------------|---------|
| --circles  | number of circles to generate  | 3       |
| --random   | generate file with random data |         |
| --segments | number of segments to generate | 10      |

Generate file from SAINT result
```
node index.js --saint=saint.txt
```

Generate file with random data
```
node index.js --random --circles=3 --segments=10
```
