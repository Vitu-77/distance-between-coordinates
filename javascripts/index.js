const map = L.map('map').setView([56.648935, -0.410909], 5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const coordinates = [
    [51.505, -0.09],
    [53.505, -0.09],
    [58.505, -0.09],
    [61.505, -0.09],
]

coordinates.forEach(coordinate => {
    return L.circleMarker(coordinate)
        .addTo(map)
        .on('click', (e) => {
            console.log(e.target.getLatLng());
        })
});

const getDistance = (origin, destination) => {
    // return distance in meters
    const lon1 = toRadian(origin[1]),
        lat1 = toRadian(origin[0]),
        lon2 = toRadian(destination[1]),
        lat2 = toRadian(destination[0]);

    const deltaLat = lat2 - lat1;
    const deltaLon = lon2 - lon1;

    const a = Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLon / 2), 2);
    const c = 2 * Math.asin(Math.sqrt(a));
    const EARTH_RADIUS = 6371;
    return c * EARTH_RADIUS * 1000;
}

const toRadian = (degree) => {
    return degree * Math.PI / 180;
}

for (let i = 0; i < coordinates.length; i++) {
    for (let j = 0; j < coordinates.length; j++) {
        const distance = getDistance(coordinates[i], coordinates[j]);
        console.log(`Distância entre [${i + 1}] - [${j + 1}]: ${distance.toFixed(2)}m`);
    }
}

// fetch('https://jsonplaceholder.typicode.com/todos')
//     .then(response => response.json())
//     .then(json => console.log(json))