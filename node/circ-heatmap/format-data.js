const formatData = (data) => {
  const plots = Object.entries(data).map(([bait, arr]) => ({
    name: bait,
    readouts: arr.reduce((accum, details) => ([
      ...accum,
      {
        known: details.known,
        label: details.prey,
        segments: {
          "AvgSpec": Number(details.spec),
          "FoldChange": Number(details.fc),
          "RNA expression": Number(details.expression),
        }
      },
    ]), []),
  }));
  return {
    circles: {
      order: [
        { attribute: 'AvgSpec', color: 'blue', max: 50, min: 0 },
        { attribute: 'FoldChange', color: 'red', max: 50, min: 0 },
        { attribute: 'RNA expression', color: 'green', max: 50, min: 0 },
      ],
    },
    parameters: {
      analysisType: 'scv',
      files: [
        'samplefile.txt',
      ],
      imageType: 'circheatmap',
      name: `test`,
      readoutColumn: 'PreyGene',
    },
    plots: plots,
    settings: {
      sortByKnown: true,
    },
  };
};

module.exports = formatData;
