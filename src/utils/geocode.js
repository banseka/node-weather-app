const request = require("request");

//Geocode funcion to get the latitude and longitude
//mapbox api request for geolocalisation
const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiYmFuc2VrYSIsImEiOiJja2gxMHFnMDMwMHJ1MnFvN3oyenVnc2RiIn0.m_eypq1-laoF1Qo0ojvhMg&limit=1`;
  request({ url, json: true }, (error, response) => {
    if (error) {
      callback(" " + "cant find location server", undefined);
    } else if (response.body.features.length === 0) {
      callback(
        "cant find location, please try with another location",
        undefined
      );
    } else {
      callback(undefined, {
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        location: response.body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
