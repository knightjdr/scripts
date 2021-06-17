#!/usr/local/bin/Rscript

baitFile = "testfiles/er-baits.txt"
saintFile = "testfiles/main_3535_3582_filtered.txt"
outfile = "output/saint-er.txt"

baitData = read.table(
  baitFile,
  as.is = T,
  header = TRUE,
  sep = "\t"
)
saintData = read.table(
  saintFile,
  as.is = T,
  header = TRUE,
  fill = TRUE,
  sep = "\t"
)

saintFiltered = saintData[saintData$Bait %in% baitData$Bait, ]

write.table(saintFiltered, file=outfile, sep="\t", row.names=FALSE, quote=FALSE)