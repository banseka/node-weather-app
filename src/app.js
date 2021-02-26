const express = require("express");
const { dirname } = require("path");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

//defined paths for epress config
// const pubDirPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

//static files setup
app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/js", express.static(__dirname + "public/js"));
app.use("/images", express.static(__dirname + "public/images"));

//setup hbsengine and vies location
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialPath);

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Banseka Jude",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Banseka Jude",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Banseka Jude",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "please provide a location" });
  }
  //darksky api call function
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          error: error,
        });
      }
      //darkSky weather api request
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({
            error: error,
          });
        }
        res.send({
          location: location,
          forecast: forecastData,
          address: req.query.address,
        });
      });
    }
  );
});

//setup statics directories to serve
// app.use(express.static(pubDirPath));

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMsg: "help aritcle not found",
    name: "baneka Jude",
  });
});

app.get("/*", (req, res) => {
  res.render("404", {
    title: 404,
    errorMsg: "page not found",
    name: "Banseka Jude",
  });
});

app.listen(5000, () => {
  console.log("now running on port 5000");
});
