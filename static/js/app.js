// console.log because we can
console.log("Project 2 - Jeanine, Jeff, & Emily");
console.log("app.js");

// Creating map object
var myMap = L.map("map", {
  center: [39.8333333, -98.585522],
  zoom: 5
});
console.log("Created map object.");

// Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

console.log("Added tile layer");

var coordinates = []

// read in course_subset.csv file
d3.csv("/results/course_subset.csv").then(function(addressData) {
  for (var i=0; i < addressData.length; i++) {
    var location = addressData[i];
    // console.log(location.lat);
    // console.log(location.lng);
    coordinates.push([location.lat, location.lng]);
    console.log(coordinates);
    L.marker(coordinates[i])
    .bindPopup("<h6>" + location.course + "</h6> <hr> <p><strong>Address: </strong></br>" + location.street + "<br>" + location.city + ", " + location.state + " " + location.zip_code + "</p>")
    .addTo(myMap);
  }

});


