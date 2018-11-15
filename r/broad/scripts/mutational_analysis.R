#!/usr/local/bin/Rscript

library(cowplot)
library(ggplot2)
library(reshape)

# cell line data
cellDF = read.table('ceresgeneeffects_published.csv', sep=",", header = TRUE, row.names = 1)
# mutational data
mutDF = read.table('CCLE_DepMap_18Q1_maf_20180207.txt', sep="\t", header = TRUE)

# gene of interest
genes = c('KRAS', 'RAC1', 'VPS33B', 'LAMTOR3', 'VPS18', 'VPS33A', 'VPS39', 'VPS41', 'PIK3CA', 'PAK1')
mutations = c('KRAS') # PTEN, KRAS, PIK3CA, TP53

# filter cellDF for genes of interest
cellFilteredDF = cellDF[row.names(cellDF) %in% genes, ]

# filter mutational data for cell lines that are in cell data and match
# desired (mutated) gene
cells = colnames(cellDF)
mutFilteredDF = mutDF[
  mutDF$Tumor_Sample_Barcode %in% cells &
  mutDF$Hugo_Symbol %in% mutations 
  , ]
mutatedLines = sort(unique(as.vector(mutFilteredDF$Tumor_Sample_Barcode)))

# split cell data to two data frames, one for mutated, one for non mutated
cellsNormalDF = cellFilteredDF[, !(colnames(cellFilteredDF) %in% mutatedLines)]
cellsMutatedDF = cellFilteredDF[, colnames(cellFilteredDF) %in% mutatedLines]

# add _M to gene names of mutant DF
row.names(cellsMutatedDF) = paste0(row.names(cellsMutatedDF), '_M')

# reshape and merge data frames
reshapedNormal = melt(as.matrix(cellsNormalDF))
reshapedMutant = melt(as.matrix(cellsMutatedDF))
reshaped = rbind(reshapedNormal, reshapedMutant)
colnames(reshaped) = c('gene', 'cell', 'value')

# Make item order match gene array order
axisOrder = vector(mode="character", length = 2 * length(genes))
i = 0
for(gene in genes) {
  i = i + 1
  axisOrder[i] = gene
  i = i + 1
  axisOrder[i] = paste0(gene, '_M')
}
reshaped$gene = factor(reshaped$gene, levels = axisOrder)

# calculate median and variance for each gene in cellDF
# geneMedian = apply(cellDF, 1, median) # get genes values with geneMedian['geneName']

# plot
title = paste(mutations, collapse = ', ')
pdfTitle = paste(title, '.pdf', sep = "")
title = paste(title, ': ', length(mutatedLines), '/', length(cells), sep = "")
pdf(pdfTitle)
ggplot(reshaped, aes(x = gene, y = value)) +
  geom_violin() +
  geom_boxplot(width = 0.1, outlier.shape = NA) +
  theme_cowplot() +
  labs(title = title) +
  xlab('Gene') +
  ylab('CERES') +
  theme(axis.text.x = element_text(angle = 90, hjust = 1))
dev.off()