const createGenes = (geneNumber, matches) => {
  const genes = {};
  Array.from(Array(geneNumber)).forEach(() => {
    const geneLength = Math.ceil(Math.random() * 3) + 2;
    const gene = Math.random().toString(36).substring(geneLength + 1);
    genes[gene] = 1;
  });
  matches.forEach((match) => {
    genes[match] = 1;
  });
  return genes;
};

module.exports = createGenes;
