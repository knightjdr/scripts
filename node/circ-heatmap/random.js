const colors = ['blueBlack', 'greyscale', 'redBlack'];

const generate = (options) => {
  const plot = {
    name: 'random',
    readouts: Array.from(Array(options.segments)).map((v, index) => ({
      known: Math.random() >= 0.5,
      name: `gene ${index + 1}`,
    })),
    segments: Array.from(Array(options.circles)).map((v, index) => ({
      name: `Attribute ${index + 1}`,
      values: Array.from(Array(options.segments)).map(() => Math.floor(Math.random() * 75)),
    })),
  };
  return ({
    availablePlots: [plot],
    panel: true,
    parameters: {
      files: [
        'samplefile.txt',
      ],
      imageType: 'segcircle',
      name: `segCirlce ${options.circles}x${options.segments}`,
    },
    plot,
    segcircleSettings: Array.from(Array(options.circles)).map(() => ({
      abundanceCap: 50,
      color: colors[Math.floor(Math.random() * Math.floor(3))],
      minAbundance: 0,
    })),
    settings: {
      current: {
        known: true,
        plot: 0,
      },
    },
  });
};

module.exports = generate;
