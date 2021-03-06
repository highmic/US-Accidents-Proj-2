var test = "Test";
console.log(test);
// from data
const tableData = "/api/allaccidents";
d3.json(tableData).then( function(response) {
    // console log
    console.log(response);
    // tbody variable
    let tbody = d3.select("#accident-table>tbody");
    // Loop through array and select object
    response.forEach((accidentData, i) => {
        let row = tbody.append('tr');
        console.log(accidentData);
        // Display key and value
        let dateArray = accidentData.Time.split(' ');
        function formatDate(d) {
            const date = new Date(d)
            var dd = date.getDate(); 
            var mm = date.getMonth()+1;
            var yyyy = date.getFullYear(); 
            if(dd<10){
                dd='0'+dd
            } 
            if(mm<10){
                mm='0'+mm
            };
            return d = dd+'/'+mm+'/'+yyyy
        };
        const newDate = formatDate(accidentData.Time);
        console.log(newDate);
        if (newDate === '15/05/2020') {
            Object.entries(accidentData).forEach( ([key,value]) => {
                // console.log(`ID ${i}, Key: ${key}, Value: ${value}`);
                // Append data into accident-table
                let newEntry = row.append('td');
                newEntry.text(value);
            });
        }
    });
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
        let inputElem = d3.select('#datetime');
        // Grab value property of the input element
        let inputValue = inputElem.property('value');
        // Clear table
        tbody.html('');
        // filter the form by the date given
        response.forEach((accidentData, i) => {
            let dateArray = accidentData.Time.split(' ');
            let day = dateArray[1];
            let month = dateArray[2];
            let year = dateArray[3];
            let newDate = `${day}  ${month}  ${year}`;
            if (inputValue === newDate) {
                // let dateInput = accidentData.filter(date => date.newDate === inputValue);
                let row = tbody.append('tr');
                 // Display key and value of each object
                Object.entries(accidentData).forEach( ([key,value]) => {
                    console.log(`ID ${i}, Key: ${key}, Value: ${value}`);
                    // Append data into accident-table
                    let newEntry = row.append('td');
                    newEntry.text(value);
                });
            }
        });
        // // Display output in console
        // console.log(dateInput);
        // // replace table with input values from form entry
        // dateInput.forEach((accidentData, i) => {
        //     let dateArray = accidentData.Time.split('T');
        //     let newDate = dateArray[0];
        //     let row = tbody.apprend('tr');
        //     // Display key and value of each object
        //     Object.entries(accidentData).forEach( ([key,value]) => {
        //         // Append data into accident-table
        //         let newEntry = row.append('td');
        //         newEntry.text(value);
        //     });
        // });
    };
});