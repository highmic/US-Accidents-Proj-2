const data = '/api/allaccidents';

d3.json(data).then ( function(response) {
    // x value
    const cityX = response.map(object => object.City);
    // Create Arrays for city Names and City Counters
    function foo(arr) {
        let cityName = [], cityCount = [], prev;
        
        arr.sort();
        for ( let i = 0; i < arr.length; i++ ) {
            if ( arr[i] !== prev ) {
                cityName.push(arr[i]);
                cityCount.push(1);
            } else {
                cityCount[cityCount.length-1]++;
            }
            prev = arr[i];
        }
        console.log(cityName);
        console.log(cityCount);

        var result = {};
        cityName.forEach((key, i) => result[key] = cityCount[i]);
        console.log(result);
        
        // let a = [cityName];
        // result = { };
        // for(var i = 0; i < a.length; ++i) {
        //     if(!result[a[i]])
        //         result[a[i]] = 0;
        //     ++result[a[i]];
        //     console.log(result);
        // }

        // Sort data for city name
        const keysSorted = Object.keys(result).sort(function(a,b){return result[b]-result[a]})
        console.log(keysSorted); 
        // sort data for counter
        const sortedAccidents = cityCount.sort((leastAccidents, mostAccidents) => mostAccidents - leastAccidents)
        console.log(sortedAccidents);
        // slice data to show top 10 citys
        const top10Accidents = sortedAccidents.slice(0,10).reverse();
        console.log(top10Accidents);
        const top10Cities = keysSorted.slice(0,10).reverse();
        console.log(top10Cities);
        // reverse array to accommodate Plotly
        // Create trace
        const trace = {
            x:top10Cities,
            y:top10Accidents,
            type:'bar'
        };
        div = [trace];

        var layoutBar = {
            title: 'Top 10 Cities in the US',
            xaxis: {title: 'City'},
            yaxis: {title: 'Number of Accidents'},

        };

        Plotly.newPlot('barChart', [trace], layoutBar);

        return [cityName, cityCount];
    }
    
    foo(cityX);

    
    // Create filter button variable
    let button = d3.select("#filter-btn");
    // Create varaible for pressing enter on the form
    let form = d3.select("#form");
    button.on("click", runEnter);
    form.on("submit", runEnter);
    
    // event handler
    function runEnter() {
        // Prevent page from refreshing!
        d3.event.preventDefault();
        // Select input element
        let inputElem = d3.select('#newstate');
        // Grab value property of the input element
        let inputValue = inputElem.property('value');

        newChart = response.map(object => object.State);
            // newChart = accidentData.State;
            if (inputValue === newChart) {
                Plotly.deleteTraces([trace], 0);
                return foo(cityX);
            };
    }
})