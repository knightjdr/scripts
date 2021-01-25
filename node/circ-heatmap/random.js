const colors = ['blue', 'greyscale', 'red'];

const generate = (options) => {
  const plot = {
    name: 'random',
    readouts: Array.from(Array(options.segments)).map((v, index) => ({
      known: Math.random() >= 0.5,
      name: `gene ${index + 1}`,
      segments: Array.from(Array(options.circles)).reduce((accum, v, index) => ({
        ...accum,
        [`Attribute ${index + 1}`]: Math.floor(Math.random() * 75),
      }), {}),
    })),
  };
  return ({
    legend: Array.from(Array(options.circles)).map(() => ({
      max: 50,
      color: colors[Math.floor(Math.random() * Math.floor(3))],
      min: 0,
    })),
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
      segmentOrder: [Array.from(Array(options.circles)).map((v, index) => `Attribute ${index + 1}`)],
      showKnown: true,
    },
  });
};

module.exports = generate;
