// console.log because we can
console.log("app_2.js");

// create variable for course data and map
var courseData;
var myMap;


// create function to initialize the map
function initMap() {
    myMap = L.map("map", {
        center: [46.392410, -94.636230],
        zoom: 6.5,
      });
    console.log("Created map object.");

    // create tile layer
    L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/streets-v11",
        accessToken: API_KEY
    }).addTo(myMap);
    
    console.log("Added tile layer");
}

// create function to read in course data
function getCourseData() {
    d3.csv("/results/course_subset.csv").then(function(data) {
        courseData = data;
        addMarkers();
    });
}

// create function to add markers
function addMarkers() {
    courseData.forEach(function(c) {
        var marker = L.circleMarker([+c.lat, +c.lng]);
        var public = c.public_private === 'Public';
        var private = c.public_private === 'Private';
        var semiPrivate = c.public_private === 'Semi-Private';
        var resort = c.public_private === 'Resort';
        var military = c.public_private === 'Military';

        if(public) {
            marker.setStyle({
                radius: 8,
                fillColor: '#7FFF00',
                fillOpacity: 1,
                color: '#000000',
            });
        } 

        else if(private) {
            marker.setStyle({
                radius: 8,
                fillColor: '#DC143C',
                fillOpacity: 1,
                color: '#000000',
            });
        }

        else if(semiPrivate) {
            marker.setStyle({
                radius: 8,
                fillColor: '#5F9EA0',
                fillOpacity: 1,
                color: '#000000',
            });
        }

        else if(resort) {
            marker.setStyle({
                radius: 8,
                fillColor: '#00FFFF',
                fillOpacity: 1,
                color: '#000000',
            });
        }

        else if(military) {
            marker.setStyle({
                radius: 8,
                fillColor: '#000000',
                fillOpacity: 1,
                color: '#000000',
            });
        }
        
        else{
        marker.setStyle({
            radius: 8,
            fillColor: '#F8F8FF',
            color: '#000000',
            fillOpacity: 1
        });
        }

        marker.addTo(myMap);

        

        marker.bindPopup("<h6>" + courseData.course + "</h6> <hr> <p><strong>Address: </strong></br>" + courseData.street + "<br>" + courseData.city + ", " + courseData.state + " " + courseData.zip_code + "</p><br><p><strong>Access: </strong>" + courseData.public_private + "<p>")
        .addTo(myMap);

        getCourseData();
    })
}



// call functions
initMap();
getCourseData();