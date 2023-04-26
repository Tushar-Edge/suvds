var mymap = L.map('mapid').setView([51.505, -0.09], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    maxZoom: 18
}).addTo(mymap);

// Define your GeoJSON data
var geojsonData = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {
                "name": "My Point"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [73.7902, 19.9947]
            }
        }
    ]
};

// Create a new GeoJSON layer and add it to the map
L.geoJSON(geojsonData).addTo(mymap);
