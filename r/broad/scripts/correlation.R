#!/usr/local/bin/Rscript

# cell line data
cellDF = read.table('ceresgeneeffects_published.csv', sep=',', header = TRUE, row.names = 1)

# constants
CUTOFF = 0.4

# correlation
corr = cor(t(cellDF), method='pearson')

# reshape to dataframe
corrdf = as.data.frame(as.table(corr))
colnames(corrdf) = c('source', 'target', 'value')

# filter by correlation cutoff
corrdfFiltered = corrdf[corrdf$value >= CUTOFF, ]

# remove self targets
corrdfFiltered = corrdfFiltered[corrdfFiltered$source != corrdfFiltered$target, ]

# write table
file = paste('corr-', CUTOFF, '.txt', sep = '')
write.table(corrdfFiltered, file = file, sep = '\t', col.names = TRUE, row.names = FALSE, quote = FALSE)