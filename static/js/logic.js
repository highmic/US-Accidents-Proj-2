// Adding tile layer to the map
const streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/light-v10",
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


const data = '/api/allaccidents'

// console.log('data_dict ',data_dict);
// Grab the data with d3
d3.json(data).then( function(response) {

  // console.log(response);

  const cityLat = response.map(feature => {
    if (feature.Time) {
        // console.log(feature.Time.$date)
    }
  });
  // Create a new marker cluster group
  const markers = L.markerClusterGroup();

  // Loop through data
  response.forEach(feature => {

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
                    <h4>${feature.Time}</h4>
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

