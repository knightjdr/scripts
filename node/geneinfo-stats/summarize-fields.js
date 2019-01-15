const round = require('../helpers/round');

const fields = {
  'ensembl-gene': 0,
  'ensembl-protein': 0,
  gene: 0,
  geneid: 0,
  nextprot: 0,
  refseq: 0,
  uniprot: 0,
};

const summarizeFields = (queries) => {
  const summarized = queries.reduce((accum, query) => {
    accum[query.field] += 1;
    return accum;
  }, fields);
  return Object.entries(summarized).reduce((accum, [key, value]) => ([
    ...accum,
    {
      field: key,
      count: value,
      percentage: round((value / queries.length) * 100, 2),
    },
  ]), []);
};

module.exports = summarizeFields;
