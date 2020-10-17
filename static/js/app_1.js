//******************************************************************************************************************************** */
// Code below generates a doughnut plot to visualize golf season
// Setting up initial variables for demonstration.  these will need to be replaced with data from Flask
var months = ["Jan", "Feb", "Mar", "Apr","May", "Jun", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
var openClose = [true, false, false, true, true, true, true, true, true, true, false, false]; //true is open, false is close
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
var trace = {
    type: 'parcoords',
    line: {
      color: 'red'
    },
    
    dimensions: [{
      range: [60, 80],
      //constraintrange: [1, 2],
      label: 'Par',
      values: [72,68],
      tickvals: [60,65,70,75,80]
      
    }, {    
      range: [100,150],
      label: 'Slope',
      values: [110,120],
      tickvals: [100,110,120,130,140,150]
    }, {
      range: [5000, 7000],
      label: 'Yards',
      values: [5500,6548],
      tickvals: [5000,5500,6000,6500,7000],
      
    }, {
      range: [60, 80],
      label: 'Middle USGA',
      values: [70,69],
      tickvals: [60,65,70,75,80]
    }]
  };

  layout = {
    paper_bgcolor: "rgba(0,0,0,0)", //to create transparent background
  };
  
  var data = [trace]
  
  Plotly.newPlot('radar', data, layout);