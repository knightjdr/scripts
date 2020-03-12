const getCellExpression = (datum, cell) => (
  datum['protein-expression']
  && datum['protein-expression'].cells
  && datum['protein-expression'].cells[cell]
    ? datum['protein-expression'].cells[cell].intensity
    : 0
);

const parseData = (data) => {
  const parsed = {};
  data.forEach((datum) => {
    parsed[datum.gene] = {
      hek293: getCellExpression(datum, 'HEK-293'),
      hela: getCellExpression(datum, 'HeLa'),
    };
  });

  return parsed;
};

module.exports = parseData;
