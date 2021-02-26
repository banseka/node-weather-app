const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/b71533c006c45339e4d639b98bebad66/${latitude},${longitude}?units=si`;
  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("unable to connect to weather service", undefined);
    } else if (response.body.error) {
      callback("unable to find weather for location", undefined);
    } else {
      callback(
        undefined,
        `${response.body.daily.data[0].summary} It is currently ${response.body.currently.temperature} degrees out there and a ${response.body.currently.precipProbability} chance of rain `
      );
    }
  });
};

module.exports = forecast;
