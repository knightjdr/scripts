const generate = options => ({
  panel: false,
  parameters: {
    files: [
      'samplefile.txt',
    ],
    imageType: 'segcircle',
    name: `segCirlce ${options.circles}x${options.segments}`,
  },
  segcircles: {
    readouts: Array.from(Array(options.segments)).map((v, index) => ({
      known: Math.random() >= 0.5,
      name: `gene ${index + 1}`,
    })),
    segments: Array.from(Array(options.circles)).map((v, index) => ({
      abundanceCap: 50,
      color: 'blueBlack',
      name: `Attribute ${index + 1}`,
      values: Array.from(Array(options.segments)).map(() => Math.floor(Math.random() * 100)),
    })),
  },
  settings: {
    current: {},
  },
});

module.exports = generate;
