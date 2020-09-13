var test = "Test";

console.log(test);

// from data
const tableData = 'data/accidents2020.json';

d3.json(tableData).then( function(response) {

    // console log
    console.log(response);

    // tbody variable
    const tbody = d3.select("#accident-table>tbody");
    // Loop through array and select object
    response.forEach((accidentData, i) => {
        const row = tbody.append('tr');
        // Display key and value of each object in console to check if values are correct
        Object.entries(accidentData).forEach( value => {
            // Append data into ufo-table
            var newEntry = row.append('td');
            newEntry.text(value);
        });
    });
     // Create filter button variable
    const button = d3.select("#filter-btn");
    // Create varaible for pressing enter on the form
    const form = d3.select("#form");
    button.on("click", runEnter);
    form.on("submit", runEnter);

    function runEnter() {
        // Prevent page from refreshing!
        d3.event.preventDefault();
        // Select input element
        const inputElem = d3.select('#datetime');
        // Grab value property of the input element
        const inputValue = inputElem.property('value');
        // filter the form by the date given
        
        const dateInput = response.filter(date => {
            const dateArray = date.Time.$date.split('T');
            const newDate = dateArray[0];
            newDate === inputValue;
        });
            
        // Display output in console
        console.log(dateInput);
    }

});