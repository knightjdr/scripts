#!/usr/local/bin/Rscript

# Libraries.
library(data.table)
library(plotly)
library(reshape2)

source('export_plotly2SVG.R')

# Read SAINT file.
saint = read.table(
  'testfiles/list.txt',
  as.is = T,
  comment.char = "",
  fill = TRUE,
  header = TRUE,
  quote = "",
  sep = "\t"
)

# Specify baits.
reference = 'VAMP7_NT_18ko'
primary = 'VAMP7_NT_Scr'

# Thresholds.
fdr =  0.01
foldchange = 1
pvalue = 0.01

# Columns to keep.
columns = c('AvgSpec', 'Bait', 'BFDR', 'PreyGene', 'Spec')

# Color columns based on significance.
addColorColumns = function(df, fcthres, pthres) {
  added = df
  added$group = 'NotSignificant'
  added[which(added$p <= pthres & abs(added$logfc) < fcthres ), 'group'] = 'Significant'
  added[which(added$p > pthres & abs(added$logfc) >= fcthres ), 'group'] = 'FoldChange'
  added[which(added$p <= pthres & abs(added$logfc) >= fcthres ), 'group'] = 'Significant + Foldchange'
  return(added)
}

# Prints all preys for which there is zero variance.
printConstants = function(d, fdr, fdrCol, prim, ref) {
  checkConstant = function(x) {
    primSpec = unlist(lapply(strsplit(x[prim], "\\|"), as.numeric))
    refSpec = unlist(lapply(strsplit(x[ref], "\\|"), as.numeric))
    if (
      length(unique(primSpec)) == 1 &&
      length(unique(refSpec)) == 1 &&
      x[fdrCol] <= fdr
    ) {
      print(x[[1]])
    }
    return()
  }
  print('The following genes are significant for your primary bait but have zero variance')
  apply(d, 1, checkConstant)
  return()
}

# Trim SAINT file to only keep baits and columns of interest.
reduceFile = function(saint, baits, columns) {
  minimized = saint[saint$Bait %in% baits, names(saint) %in% columns]
  return(minimized)
}

# Remove NaN rows altogether.
removeNaN = function(df) {
  replaced = df
  replaced = replaced[complete.cases(replaced), ]
  return(replaced)
}

# tTest.
tTest = function(x, prim, ref) {
  primSpec = unlist(lapply(strsplit(x[prim], "\\|"), as.numeric))
  refSpec = unlist(lapply(strsplit(x[ref], "\\|"), as.numeric))
  p = try(t.test(primSpec, refSpec))
  if('try-error' %in% class(p)) {
    return(1)
  }
  return(p$p.value)
}

# Main.

# Remove unneeded baits and columns.
df = reduceFile(saint, c(primary, reference), columns)

# Remove duplicated bait prey entries (why are these in the file?).
df = df[!duplicated(df), ]

# Generate dataframe of preys with spec for each bait, keep FDR for primary bait.
specDf = as.data.frame(data.table::dcast(setDT(df), PreyGene ~ Bait, value.var = c('AvgSpec', 'BFDR', 'Spec')))
fdrCast = paste('BFDR_', primary, sep='')
primaryCast = paste('Spec_', primary, sep='')
referenceCast = paste('Spec_', reference, sep='')

# Remove NaN rows.
specDf = removeNaN(specDf)

# Calculate p values and peform for corrections.
specDf$p = apply(specDf, 1, function(x) tTest(x, primaryCast, referenceCast))
specDf$logp = -log10(specDf$p)

# Calculate fold changes
specDf['fc'] = specDf[paste('AvgSpec_', primary, sep='')] / specDf[paste('AvgSpec_', reference, sep='')]
specDf$logfc = log2(specDf$fc)

# Add columns for colouring plot.
specDf = addColorColumns(specDf, foldchange, pvalue)

# For constant rows, see if any have an FDR <= threshold.
printConstants(specDf, fdr, fdrCast, primaryCast, referenceCast)

p = plot_ly(
  color = ~group,
  colors = c('#1976d2', '#424242', '#ffeb3b', '#f44336'),
  data = specDf,
  mode = "markers",
  text = ~PreyGene,
  x = ~logfc,
  y = ~logp
) %>%
  layout(
    xaxis = list(title="log<sub>2</sub>(Fold change)", zeroline = TRUE),
    yaxis = list(title="-log<sub>10</sub>(p-value)", type = "log"),
    shapes = list(
      list(
        type='line',
        x0= -7,
        x1= -1,
        y0 = 2,
        y1 = 2,
        line = list(color = '#757575', dash = 'dot', width = 0.5)
      ),
      list(
        type='line',
        x0= 7,
        x1= 1,
        y0 = 2,
        y1 = 2,
        line = list(color = '#757575', dash = 'dot', width = 0.5)
      ),
      list(
        type='line',
        x0= -1,
        x1= -1,
        y0 = 2,
        y1 = 5,
        line = list(color = '#757575', dash = 'dot', width = 0.5)
      ),
      list(
        type='line',
        x0= 1,
        x1= 1,
        y0 = 2,
        y1 = 5,
        line = list(color = '#757575', dash = 'dot', width = 0.5)
      )
    )
  )
p

# Export as svg. Set height and width to change default of 600w x 800h.
export_plotly2SVG(p, filename = 'volcano.svg', font_family = 'Arial')
