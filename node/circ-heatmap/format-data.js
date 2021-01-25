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
          "FC": Number(details.fc),
          "RNA expression": Number(details.expression),
        }
      },
    ]), []),
  }));
  return {
    legend: [
      { color: 'blue', max: 50, min: 0, name: 'AvgSpec' },
      { color: 'red', max: 50, min: 0, name: 'FC' },
      { color: 'green', max: 50, min: 0, name: 'RNA expression' },
    ],
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
      segmentOrder: ['AvgSpec', 'FC', 'RNA expression'],
      showKnown: true,
    },
  };
};

module.exports = formatData;
