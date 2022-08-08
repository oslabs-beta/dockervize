const { exec, spawn } = require('child_process');
const axios = require('axios');

const metricsController = {};

metricsController.convertToUnixTime = (req, res, next) => {
  try {
    let currentTime = new Date().valueOf();
    currentTime = currentTime / 1000;
    const start = currentTime - req.body.secondsPassed;
    res.locals.end = currentTime;
    res.locals.start = start;
    return next();
  } catch (error) {
    console.log('metricsController error: convertToUnixTime method');
    return next(err);
  }
};

metricsController.getData = async (req, res, next) => {
  try {
    const stats = await axios.get(
      `http://localhost:9090/api/v1/query_range?query=${req.body.query}&start=${res.locals.start}&end=${res.locals.end}&step=${req.body.interval}`
    );

    let dockerData = [];
    for (let i = 0; i < stats.data.data.result.length; i++) {
      if (
        stats.data.data.result[i]['metric']['id'].slice(0, 8) === '/docker/' &&
        stats.data.data.result[i]['metric']['id'].slice() !== '/docker/buildx'
      ) {
        dockerData.push(stats.data.data.result[i]);
      }
    }
    // console.log('data of each docker container: ', dockerData);

    let totalData = {};
    for (let i = 0; i < dockerData.length; i++) {
      dockerData[i].values.forEach((dataPairArr) => {
        if (!(dataPairArr[0] in totalData)) {
          totalData[dataPairArr[0]] = 0;
        }
        totalData[dataPairArr[0]] += Number(dataPairArr[1]);
      });
    }
    console.log('Total data for only docker containers: ', totalData);

    res.locals.data = stats.data.data.result;
    next();
  } catch (err) {
    console.log('metricsController error: getData method');
    return next(err);
  }
};

module.exports = metricsController;
