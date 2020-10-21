// console.log because we can
console.log("app_2.js");

// create variable for course data and map
var courseData;
var myMap;


// create function to initialize the map
function initMap() {
    myMap = L.map("map", {
        center: [41.800719, -89.627245], // center of Mpls [46.392410, -94.636230]
        zoom: 4.8,
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


    d3.csv("/results/MissRiver_golf_details.csv").then(function(data) {
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
                radius: 5,
                fillColor: '#7FFF00',
                fillOpacity: 1,
                color: '#000000',
            });
        } 

        else if(private) {
            marker.setStyle({
                radius: 5,
                fillColor: '#DC143C',
                fillOpacity: 1,
                color: '#000000',
            });
        }

        else if(semiPrivate) {
            marker.setStyle({
                radius: 5,
                fillColor: '#5F9EA0',
                fillOpacity: 1,
                color: '#000000',
            });
        }

        else if(resort) {
            marker.setStyle({
                radius: 5,
                fillColor: '#00FFFF',
                fillOpacity: 1,
                color: '#000000',
            });
        }

        else if(military) {
            marker.setStyle({
                radius: 5,
                fillColor: '#000000',
                fillOpacity: 1,
                color: '#000000',
            });
        }
        
        else{
        marker.setStyle({
            radius: 5,
            fillColor: '#F8F8FF',
            color: '#000000',
            fillOpacity: 1
        });
        }

        marker.addTo(myMap);
        
        // add popup to selected marker
        marker.bindPopup("<h6>" + c.course + "</h6> <hr> <p><strong>Address: </strong></br>" + c.street + "<br>" + c.city + ", " + c.state + " " + c.zip_code + "</p><p><strong>Access: </strong>" + c.public_private + "</br><strong>Holes: </strong>" + c.hole + "</br><strong>Rental Cart Available: </strong>" + c.rental_cart_available + "</br><strong>Rental Clubs Available: </strong>" + c.rental_club +"<p>")
        .addTo(myMap);

        //add legend
        var legend = L.control({position: 'topright'});

        legend.onAdd = function(myMap) {
            var div = L.DomUtil.create('div', 'info legend');
            div.innerHTML += "<h4>Access</h4>";
            div.innerHTML += '<span>Public</span></br>';
            div.innerHTML += '<span>Private</span></br>';
            div.innerHTML += '<span>Semi-Private</span></br>';
            div.innerHTML += '<span>Resort</span></br>';
            div.innerHTML += '<span>Military</span></br>';
            return div;
        }

        legend.addTo(myMap);

    })
}



// function showCourseData(courseData) {

//     console.log(`showCourseData(${courseData})`);

//     // call for golf course data
//     d3.csv("/results/course_subset2.csv").then((data)  => {
        
//         // variable to find data
//         var golfCourse = data.golfCourse;

//         // filter to find data for specific course
//         var resultArray = golfCourse.filter(gc => gc.course == courseData);

//         // variable to return first result
//         var result = resultArray[0];

//         // define where to display golf course results and clear existing results when new course is selected
//         var golfInfo = d3.select("#golf-info")
//         golfInfo.html("");

//         // iterate through results to find keys and values
//         Object.entries(result).forEach(([key, value]) => {
//             var textToShow = `${key}: ${value}`;
//             console.log(textToShow);
//             golfInfo.append("h6").text(textToShow);
//         });

// });


// call functions
initMap();
getCourseData();