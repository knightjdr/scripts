const round = require('../helpers/round');

const dayIndex = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const mongoTimestamp = id => (
  id.toString().substring(0,8)
);

const addDate = (queries) => (
  queries.map(query => new Date(parseInt(mongoTimestamp(query._id.$oid), 16) * 1000))
);

const byDay = (dates) => {
  const daySummary = new Array(7).fill(0);
  const summary = dates.reduce((accum, date) => {
    const day = date.getDay();
    accum[day]++;
    return accum;
  }, daySummary);
  return summary.map((day, index) => ({
    day: dayIndex[index],
    count: day,
    percentage: round((day / dates.length) * 100, 2),
    persecond: round(day / 86400, 2),
  }));
};

const byHour = (dates) => {
  const hourSummary = new Array(24).fill(0);
  const summary = dates.reduce((accum, date) => {
    const hour = date.getHours();
    accum[hour]++;
    return accum;
  }, hourSummary);
  return summary.map((hour, index) => ({
    hour: index,
    count: hour,
    percentage: round((hour / dates.length) * 100, 2),
    persecond: round(hour / 3600, 2),
  }));
};

const byDate = (queries) => {
  const dates = addDate(queries);
  return {
    day: byDay(dates),
    hour: byHour(dates),
  };
};

module.exports = byDate;
