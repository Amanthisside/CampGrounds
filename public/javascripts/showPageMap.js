// mapboxgl.accessToken =mapToken;
// const map = new mapboxgl.Map({
// 	container: 'map', // container ID
// 	style: 'mapbox://styles/mapbox/streets-v12', // style URL
// 	center:campground.geometry.coordinates, // starting position [lng, lat]
// 	zoom: 9, // starting zoom
// });
// new mapboxgl.Marker()
// 	.setLngLat(campground.geometry.coordinates)
// 	.setPopup(
// 		new mapboxgl.Popup({offset:25})
// 		.setHTML(
// 			`<h3>${campground.title}</h3><p>${campground.location}</p>`
// 		)
// 	)
// 	.addTo(map);

var map = L.map('map',{
	center:campground.geometry.coordinates,
	zoom:13
}).setView([campground.geometry.coordinates[1],campground.geometry.coordinates[0]], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
let popupContent=`<h3>${campground.title}</h3><p>${campground.location}</p>`
new L.marker()
.setLatLng([campground.geometry.coordinates[1],campground.geometry.coordinates[0]])
.bindPopup(popupContent).openPopup()
.addTo(map);

