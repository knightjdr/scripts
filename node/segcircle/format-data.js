const formatData = (data) => {
  const availablePlots = Object.entries(data).map(([bait, arr]) => {
    const segCircle = arr.reduce((accum, details) => ({
      readouts: [
        ...accum.readouts,
        {
          known: details.known,
          name: details.prey,
        },
      ],
      segments: [
        {
          ...accum.segments[0],
          values: [
            ...accum.segments[0].values,
            Number(details.spec),
          ],
        },
        {
          ...accum.segments[1],
          values: [
            ...accum.segments[1].values,
            Number(details.fc),
          ],
        },
        {
          ...accum.segments[2],
          values: [
            ...accum.segments[2].values,
            Number(details.expression),
          ],
        },
      ],
    }), {
      readouts: [],
      segments: [
        { name: 'AvgSpec', values: [] },
        { name: 'FoldChange', values: [] },
        { name: 'RNA expression', values: [] },
      ],
    });
    return {
      name: bait,
      readouts: segCircle.readouts,
      segments: segCircle.segments,
    };
  });
  return {
    availablePlots,
    panel: true,
    parameters: {
      files: [
        'samplefile.txt',
      ],
      imageType: 'segcircle',
      name: 'test',
    },
    plot: availablePlots[0],
    segcircleSettings: [
      {
        abundanceCap: 50,
        color: 'blueBlack',
        minAbundance: 0,
      },
      {
        abundanceCap: 50,
        color: 'blueBlack',
        minAbundance: 0,
      },
      {
        abundanceCap: 50,
        color: 'blueBlack',
        minAbundance: 0,
      },
    ],
    settings: {
      current: {
        known: true,
        plot: 0,
      },
    },
  };
};

module.exports = formatData;
