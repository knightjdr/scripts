const args = () => ({
  circles: Number(process.argv[2]) || 3,
  segments: Number(process.argv[3]) || 10,
});

module.exports = args;
