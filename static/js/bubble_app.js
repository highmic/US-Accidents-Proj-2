var test = "Test";

console.log(test);




  
// var data = [
//     {
//       x: ['giraffes', 'orangutans', 'monkeys'],
//       y: [20, 14, 23],
//       type: 'bar'
//     }
//   ];
  
//   Plotly.newPlot('bubbleChart', data);


function buildTrace1() {
    d3.json("static/data/accidents2020.json").then ( function(data) {

        console.log(data);

        // get x values
        const severityX = data.map(object => object.Severity);

        // get y values
        const visibilityY = data.map(object => object.Visibility);

        // get state values
        const stateText = data.map(object => object.State);

        // get city value 
        const cityText = data.map(object => object.City);

        const x = severityX.reverse();

        const y = visibilityY.reverse();

        const city = cityText.reverse();

        const state = stateText.reverse();

        console.log(x);

        console.log(y);

        var bubbleTrace = {
            x: x,
            y: y,
            text: city,
            mode: 'markers',
            marker: {
                 size: y
            }
        };

        var bubble = [bubbleTrace];

        var layoutBubble = {
            title: 'Visibility Chart'

        };


        // Plotly
        Plotly.newPlot('bubbleChart', bubble, layoutBubble);




    
    });
    
};

buildTrace1();