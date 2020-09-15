// Adding tile layer to the map
const streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
});

// Creating our layers
const layers = {
  SEVERITY_FOUR: new L.LayerGroup(),
  SEVERITY_THREE: new L.LayerGroup(),
  SEVERITY_TWO: new L.LayerGroup(),
  SEVERITY_ONE: new L.LayerGroup(),
};

// Creating map object with our layers
const myMap = L.map("map", {
  center: [31.96, -99.90],
  zoom: 6,
  layers: [
    layers.SEVERITY_FOUR,
    layers.SEVERITY_THREE,
    layers.SEVERITY_TWO,
    layers.SEVERITY_ONE
  ]
});

streetmap.addTo(myMap);

// Create overlays object to add to layer control
const overlays = {
  "Level 1 Severity": layers.SEVERITY_ONE,
  "Level 2 Severity": layers.SEVERITY_TWO,
  "Level 3 Severity": layers.SEVERITY_THREE,
  "Level 4 Severity": layers.SEVERITY_FOUR
};

// Control of layers
L.control.layers(null, overlays).addTo(myMap);

const legend = L.control({position: 'bottomright'});
// // Create Legend
// const legend = L.control({
//   position: "bottomright"
// });

// // After layer control is added, insert div element with class "legend"
// info.onAdd = function() {
//   const div = L.DomUtil.create("div", "legend");
//   return div;
// };

// info.addTo(myMap);

// let accidentIcon = { 
//   SEVERITY_FOUR: L.ExtraMarkers.icon({
//     icon: 'fa-car',
//     iconColor: 'white',
//     markerColor: 'red',
//     shape: 'circle',
//     prefix: 'fa'
//   }),
//   SEVERITY_THREE: L.ExtraMarkers.icon({
//     icon: 'fa-car',
//     iconColor: 'white',
//     markerColor: 'orange',
//     shape: 'circle',
//     prefix: 'fa'
//   }),
//   SEVERITY_TWO: L.ExtraMarkers.icon({
//     icon: 'fa-car',
//     iconColor: 'white',
//     markerColor: 'yellow',
//     shape: 'circle',
//     prefix: 'fa'
//   }),
//   SEVERITY_ONE: L.ExtraMarkers.icon({
//     icon: 'fa-car',
//     iconColor: 'white',
//     markerColor: 'green',
//     shape: 'circle',
//     prefix: 'fa'
//   })
// }

const data = '/api/allaccidents'

// console.log('data_dict ',data_dict);
// Grab the data with d3
d3.json(data).then( function(response) {

  console.log(response);

  const cityLat = response.map(feature => {
    if (feature.Time) {
        // console.log(feature.Time.$date)
    }
  });
  // Create a new marker cluster group
  const markers = L.markerClusterGroup();

  // Loop through data
  response.forEach(feature => {

    const dateArray1 = feature.Time.$date.split('T');
    let newDate1 = new Date(dateArray1);
    let timeArray = dateArray1[1];
    const removeZ = timeArray.split('Z');
    // let dateValue = dateArray1[0];
    let time = removeZ[0];
    const date = newDate1.toDateString();
    const utcHour = newDate1.getUTCHours();
    const utcMin = newDate1.getUTCMinutes();
    const utcSec = newDate1.getUTCSeconds();
    const utcTime = `${utcHour}:${utcMin}:${utcSec} Coordinated Universal Time (UTC)`;
    const getTime = newDate1.getTime();
    // console.log(typeof newDate1);

    function getColor(sev){
      // minor
      if (sev ===1){
        return 'green';
      }
      else if (sev ===2){
        return 'yellow';
      }
      else if (sev ===3){
        return 'orange';
      }
      // severe
      else if (sev ===4){
        return 'red';
      }
      // in case not data is found
      else {
        return 'grey';
      };
    }
    // Create Icons
    

    const accidentIcon = L.ExtraMarkers.icon({
      icon: 'fa-car',
      iconColor: 'white',
      markerColor: getColor(feature.Severity),
      shape: 'circle',
      prefix: 'fa'
    });

    
    // Check for location property
    if (feature.Latitude) {
      // console.log(response)

      // Add a new marker to the cluster group and bind a pop-up
      markers.addLayer(L.marker([feature.Latitude, feature.Longitude], {icon: accidentIcon})
        .bindPopup(`<h1>${feature.City}, ${feature.State}</h1> <hr>
                    <h2>${date}</h2> <h4>Time: ${utcTime}</h4> <hr>
                    <h3>Weather Condition: ${feature.Weather_Condition}</h3> <hr>
                    <h3>Temperature(F): ${feature.Temperature}°</h3> <hr>
                    
                    <h4>Description: ${feature.Description}</h4>`));
    }
    // create legend
    // const legend = L.control({position: 'bottomright'});
    legend.onAdd = function() {
      const div = L.DomUtil.create("div", "info legend");
      labels = ['<strong>Accident Severity</strong><br><br>'],
      categories = [1, 2, 3, 4];
      for (var i=0; i < categories.length; i++) {
        div.innerHTML +=
        labels.push(
          '<p><i class="" style="background:' + getColor(categories[i]) + '"></i> ' +
          'Level ' + (categories[i] ? categories[i] : '+</p>'));
        }
        div.innerHTML = labels.join('');
      return div;
    };
    // legend.addTo(myMap);
  });

  // Add our marker cluster layer to the map
  myMap.addLayer(markers);
  legend.addTo(myMap);
  
});

function userDate (date) {
  const dateArray1 = feature.Time.$date.split('T');
  let dateValue = dateArray1[0];
  if (dateValue === '2020-05-24') {
    
  }

};

// const myStyle = {
//   "color": "blue",
//   "weight": 2, //stroke thickness of lines
//   "opacity": 0.65
// };

// // read nyc.geojson
// d3.json('static/data/nyc.geojson').then(
//   jsonData => {
//       // console.log(jsonData);
//       L.geoJSON(jsonData.features, 
//           {
//               style: myStyle
//           }
//       ).addTo(myMap);
//   }
// );