### Generate summary statistics for the Gene Info extension

First, export the tracking colleciton, changing password for the actual password
```
mongoexport --db geneinfo --collection tracking -u "geneinfo" -p "password" --authenticationDatabase "geneinfo" --out tracking.json --jsonArray
```

Place json file in `data` folder.

#### Run script

```
node index.js --file=data/tracking.json
```

#### Arguments

| argument | definition                  | default              |
|----------|-----------------------------|----------------------|
| --file   | json file with user queries | 'data/tracking.json' |

#### Output

Will output summary statistics to a tab-delimited file call `output/year-month-day-stats.txt`