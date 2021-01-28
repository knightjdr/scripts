const colors = ['blue', 'greyscale', 'red'];

const generate = (options) => {
  const plot = {
    name: 'random',
    readouts: Array.from(Array(options.segments)).map((v, index) => ({
      known: Math.random() >= 0.5,
      label: `gene ${index + 1}`,
      segments: Array.from(Array(options.circles)).reduce((accum, v, index) => ({
        ...accum,
        [`Attribute ${index + 1}`]: Math.floor(Math.random() * 75),
      }), {}),
    })),
  };
  return ({
    circles: {
      order: Array.from(Array(options.circles)).map((x, index) => ({
        attribute: `Attribute ${index + 1}`,
        color: colors[Math.floor(Math.random() * Math.floor(3))],
        max: 50,
        min: 0,
      })),
    },
    parameters: {
      analysisType: 'scv',
      files: [
        'samplefile.txt',
      ],
      imageType: 'circheatmap',
      name: `circheatmap ${options.circles}x${options.segments}`,
    },
    plots: [
      plot,
    ],
    settings: {
      sortByKnown: true,
    },
  });
};

module.exports = generate;
