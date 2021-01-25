const getCellExpression = (datum, cell, expressionType) => {
  const key = `${expressionType}-expression`;

  if (expressionType === 'protein') {
    return datum?.[key]?.cells?.[cell]?.intensity || 0;
  }
  return datum?.[key].cells?.[cell] || 0;
};

const parseData = (data, options) => {
  const { cell, expressionType } = options;
  const parsed = {};
  data.forEach((datum) => {
    parsed[datum.gene] = {
      geneid: datum.geneid || '',
      [cell]: getCellExpression(datum, cell, expressionType),
    };
  });

  return parsed;
};

module.exports = parseData;
