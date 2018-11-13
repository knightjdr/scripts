#!/usr/local/bin/Rscript

library(cowplot)
library(ggplot2)
library(gridExtra)
library(reshape)

# cell line data
cellDF = read.table('ceresgeneeffects_published.csv', sep=',', header = TRUE, row.names = 1)

# gene of interest
genes = c(
  'AKAP2',
  'ARHGAP35',
  'FRY',
  'FRYL',
  'LATS2',
  'MOB1B',
  'MTOR',
  'NF2',
  'NRP1',
  'PDCD10',
  'PTEN',
  'PTPN12',
  'PTPN14',
  'TAOK1'
)
genesLength = length(genes)

# iterate over each gene and make a plot for each
for (i in 1:genesLength) {
  # filter cellDF for genes of interest
  cellFilteredDF = cellDF[row.names(cellDF) == genes[i], ]
  
  # get available tissue types
  cells = colnames(cellFilteredDF)
  tissues = sort(unique(gsub('.*_', '', cells)))
  noTissues = length(tissues)
  
  # calculate p balues using KS test for each tissue versus all others
  otherVector = list()
  pValues = c()
  tissueVector = list()
  for (j in 1:noTissues) {
    tissueColumns = cells[grep(paste('_', tissues[j], sep = ''), cells)]
    tissueVector[[j]] = as.numeric(cellFilteredDF[ , names(cellFilteredDF) %in% tissueColumns])
    otherVector[[j]] = as.numeric(cellFilteredDF[ , !names(cellFilteredDF) %in% tissueColumns])
    ksResult = ks.test(tissueVector[[j]], otherVector[[j]], alternative = 'two.sided')
    pValues[j] = ksResult$p.value
  }
  
  # correct p-values
  pValuesCorrected = p.adjust(pValues, method = 'BH')
  
  # plot violin plots with p values
  plots = list()
  includePlot = 0;
  for (j in 1:noTissues) {
    if (pValuesCorrected[j] <= 0.05) {
      # generate tissue dataframe
      tissue = rep(tolower(tissues[j]), length(tissueVector[[j]]))
      values = tissueVector[[j]]
      tissueDF = data.frame(tissue, values)
      # generate other tissues dataframe
      tissue = rep('other', length(otherVector[[j]]))
      values = otherVector[[j]]
      otherDF = data.frame(tissue, values)
      # bind dataframes
      mergedDF = rbind(otherDF, tissueDF)
      # plot
      title = paste(
        genes[i],
        ' - ',
        tolower(tissues[j]),
        ': ',
        length(tissueVector[[j]]),
        '/',
        length(cells),
        ' cells, p-value: ',
        round(pValuesCorrected[j], 5),
        sep = ""
      )
      includePlot = includePlot + 1
      plots[[includePlot]] = ggplot(mergedDF, aes(x = tissue, y = values)) +
        geom_violin() +
        geom_boxplot(width = 0.1, outlier.shape = NA) +
        theme_cowplot() +
        ggtitle(title) +
        theme(plot.title = element_text(size = 8, face = "bold")) +
        xlab('Tissue') +
        ylab('CERES') +
        theme(axis.text.x = element_text(angle = 90, vjust = 0.4)) 
    }
  }
  if (includePlot > 0) {
    pdfTitle = paste(genes[i], '.pdf', sep = "")
    pdf(pdfTitle, onefile = TRUE)
    do.call("grid.arrange", c(plots, ncol = 2, nrow = ceiling(includePlot / 2)))
    dev.off()
  }
}
