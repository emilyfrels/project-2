//loading data into system
d3.csv("../results/course_subset2.csv").then(function(courseData) {
  for (var i=0; i < courseData.length; i++) {
    var course = courseData[i];
    console.log(course);
    courseSelect = "6390";
    if (course.course_id == courseSelect) {
      courseHole = parseInt(course.hole);
      forwardYards = parseInt(course.forward_yards);
      forwardSlope = parseInt(course.forward_slope);
      middleYards = parseInt(course.middle_yards);
      middleSlope = parseInt(course.middle_slope);
      championshipYards = parseInt(course.championship_yards);
      championshipSlope = parseInt(course.championship_slope);
      courseName = course.course
    }
 
    
  }

console.log(championshipYards);


//******************************************************************************************************************************** */
// Code below generates a doughnut plot to visualize golf season
// Setting up initial variables for demonstration.  these will need to be replaced with data from Flask
var months = ["Jan", "Feb", "Mar", "Apr","May", "Jun", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

//setting open and close month and performing logic to create array of months
openMonth = 4;
closeMonth = 9;
var openClose = [false, false, false, false, false, false, false, false, false, false, false, false];
for (i=0;i<12;i++) {
  if ((closeMonth-openMonth)<0) {
    if ((i+1 >= openMonth) || (i+1 <= closeMonth)) { // || is same as or, && same as and
      openClose[i] = true;
    } 
  };
  if ((closeMonth-openMonth)>=0) {
    if ((i+1 >= openMonth) && (i+1<=closeMonth)) {
      openClose[i] = true;
    } 
  };

  }
console.log(openClose);



var fraction = [1,1,1,1,1,1,1,1,1,1,1,1];//all months have equal size in plot
var colorBar = openClose.map(setColor);

//function below is used to set color based on open (green) or closed (red)
function setColor(month) {
    if (month){
        return "rgba(0,255,0,1)"
    }
    else {
        return "rgba(255,0,0,1)"
    };
};

//console.log(colorBar);

//setting up data set
data = {
    datasets:[{
        data: fraction,
        backgroundColor: colorBar
    }],
    labels: months

}

//plug in below is required to have data labels (i.e. months) display in plot
Chart.defaults.global.plugins.datalabels.display = true;
// Creating doughnut chart

var ctx = document.getElementById('doughnut');//locate ID doughnut where chart to be placed in DOM
//creating new chart
var myDoughnutChart = new Chart(ctx, {
    type: 'doughnut',
    data: data,
    options: {
        title:{display: true,
                position:"center",
                padding: 0,
                //text: ["Course", "Season"],
        },
        legend:{display: false},
        //plug in used to place data labels (month) in charts
        plugins: {
            datalabels: {
                formatter: function(value,context) {
                    return context.chart.data.labels[context.dataIndex];
                }
            }
        },
        // maintainAspectRatio: false,
        rotation:Math.PI,//used to start graph at 180 degrees
        circumference: Math.PI,//chart is half of arc - extends from 180 to 0 degrees
        animation: {animateScale: true}, //animates drawing of graph
        
        layout: {
        padding: {
            left: 20,
            right: 20,
            top: 20,
            bottom: 20
            }
        }
    }
});

//******************************************************************************************************************************** */
//Generic code below for radar plot 

switch (true) {
  case courseHole < 15:
    yardageTick = [1000,2000,3000,4000,5000];
    yardageRange = [1000,5000];
    break;
  case courseHole < 20:
    yardageTick = [5000,6000,7000,8000,9000];
    yardageRange = [5000,9000];
    break;
  default:
    yardageTick = [7000,8000,9000,10000,11000];
    yardageRange = [7000,11000];
}

var trace = {
    type: 'parcoords',
    line: {
      color: 'red'
    },
    
    dimensions: [{
      range: yardageRange,
      //constraintrange: [1, 2],
      label: 'Forward<br>Yards',
      values: [forwardYards],
      tickvals: yardageTick
      
    }, {    
      range: [100,170],
      label: 'Forward<br>Slope',
      values: [forwardSlope],
      tickvals: [100,110,120,130,140,150,160,170]
    }, {
      range: yardageRange,
      label: 'Middle<br>Yards',
      values: [middleYards],
      tickvals: yardageTick,
      
    }, {
      range: [100,170],
      label: 'Middle<br>Slope',
      values: [middleSlope],
      tickvals: [100,110,120,130,140,150,160,170]
    },
    {
      range: yardageRange,
      label: 'Champion<br>Yards',
      values: [championshipYards],
      tickvals: yardageTick,
    },
    {
      range: [100,170],
      label: 'Champion<br>Slope',
      values: [championshipSlope],
      tickvals: [100,110,120,130,140,150,160,170]
    },
  ]
  };

  layout = {
    title: {text:courseName},
    paper_bgcolor: "rgba(0,0,0,0)" //to create transparent background
  };
  
  var data = [trace]
  
  Plotly.newPlot('radar', data, layout);

});