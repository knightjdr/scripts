#!/usr/local/bin/Rscript

# User parameters
ratioFile = "testfiles/analysis_output.txt"
intensityFile = "testfiles/log2_data.txt"
fdrCutoff = 0.01
label = 'EBP_E80K/EBP_wt'
mutBait = "EBP_E80K"
wtBait = "EBP_wt"
DEFAULT_COLOR = "#1976d2"
SIG_COLOR = "#ffeb3b"
aggregation = "mean" # One of "mean" or "sum"
labelPoints = c("TOM1")

# Third-party packages
library(plotly)

# Read analysis_output file.
ratioData = read.table(
  ratioFile,
  as.is = T,
  comment.char = "",
  fill = TRUE,
  header = TRUE,
  quote = "",
  sep = "\t"
)

# Read log2 intensity file.
intensityData = read.table(
  intensityFile,
  as.is = T,
  comment.char = "",
  fill = TRUE,
  header = TRUE,
  quote = "",
  sep = "\t"
)

# Retrieve dataframe of preys with color indicating if significant.
setPreyColor = function(df, label, fdr) {
  # Remove rows not matching label and keep prey and FDR columns.
  dfSubset = df[df$Label2 == label, c("Protein", "FDR")]
  
  # Rename FDR column.
  names(dfSubset)[2] = "color"

  setColor = function(value) {
    if (value <= fdr) {
      return(SIG_COLOR)
    }
    return(DEFAULT_COLOR)
  }
  setGroup = function(value) {
    if (value <= fdr) {
      return("Significant")
    }
    return("Not Significant")
  }
  dfSubset$group = sapply(dfSubset$color, setGroup)
  dfSubset$color = lapply(dfSubset$color, setColor)
  rownames(dfSubset) <- dfSubset[, 1]
  return(dfSubset)
}

# Remove unneeded columns from intensity table and rows
# with NA, then average intensities across replicates.
formatIntensity = function(df, wt, mut, agg) {
  # Find columns that match wt and mut and keep them.
  toMatch = c('Protein', wt, mut)
  colnames = names(df)
  keepColumns = colnames[grep(paste(toMatch, collapse="|"), colnames)]
  dfSubset = df[, keepColumns]
  
  # Omit rows with an NA value.
  dfSubset = na.omit(dfSubset)
  
  # Average duplicate rows
  dataColumns = colnames[grep(paste(c(wt, mut), collapse="|"), colnames)]
  dfSubset = aggregate(. ~ Protein, data = dfSubset, agg)
  
  # Rename replicates to wt or mut and make first column row names.
  names(dfSubset)[grep(wt, names(dfSubset))] = "wt"
  names(dfSubset)[grep(mut, names(dfSubset))] = "mut"
  rownames(dfSubset) <- dfSubset[, 1]
  
  # Average replicates.
  dfAverage = as.data.frame(
    sapply(c("wt", "mut"),
      function(col) rowMeans(dfSubset[names(dfSubset) == col])
    )
  )
  return(dfAverage)
}

preyColor = setPreyColor(ratioData, label, fdrCutoff)
intensityAverage = formatIntensity(intensityData, wtBait, mutBait, aggregation)

# Add color column
intensityAverage = merge(intensityAverage, preyColor, by=0)
intensityAverage = intensityAverage[, c('wt', 'mut', 'color', 'group', 'Protein')]

# Exportable as PDF plot.
plot = qplot(wt, mut, data = intensityAverage, color = color)
plot +
  theme(
    panel.grid.major = element_blank(),
    panel.grid.minor = element_blank(),
    panel.background = element_blank(),
    axis.line = element_line(colour = "black")
  ) +
  geom_abline(intercept = 0) +
  geom_text(
    data = subset(intensityAverage, intensityAverage$Protein %in% labelPoints),
    aes(wt, mut, label=Protein),
    colour = "black"
  )

# Exportable as PNG plot.
maxX = max(intensityAverage$wt)
minX = min(intensityAverage$wt)
interactivePlot = plot_ly(
  color = ~group,
  colors = c(DEFAULT_COLOR, SIG_COLOR),
  data = intensityAverage,
  mode = "markers",
  text = ~Protein,
  type = "scatter",
  x = ~wt,
  y = ~mut
) %>%
  layout(
    xaxis = list(title = "Wild type", zeroline = FALSE),
    yaxis = list(title = "Mutant", zeroline = FALSE),
    shapes = list(
      type='line',
      x0 = minX,
      x1 = maxX,
      y0 = minX,
      y1 = maxX,
      line = list(color = '#757575', dash = 'dot', width = 1)
    )
  )
interactivePlot
