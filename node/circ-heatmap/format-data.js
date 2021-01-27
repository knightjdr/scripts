const formatData = (data) => {
  const plots = Object.entries(data).map(([bait, arr]) => ({
    name: bait,
    readouts: arr.reduce((accum, details) => ([
      ...accum,
      {
        known: details.known,
        name: details.prey,
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
        { color: 'blue', max: 50, min: 0, name: 'AvgSpec' },
        { color: 'red', max: 50, min: 0, name: 'FoldChange' },
        { color: 'green', max: 50, min: 0, name: 'RNA expression' },
      ],
    },
    parameters: {
      analysisType: 'scv',
      files: [
        'samplefile.txt',
      ],
      imageType: 'circheatmap',
      name: `test`,
    },
    plots: plots,
    settings: {
      sortByKnown: true,
    },
  };
};

module.exports = formatData;
