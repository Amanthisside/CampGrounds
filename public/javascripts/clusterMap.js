// Initialize the map
        
        const map = L.map('map').setZoom(10);

        // Add a tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Create a MarkerClusterGroup with custom options
        const markers = L.markerClusterGroup({
            iconCreateFunction: function (cluster) {
                const childCount = cluster.getChildCount();
                let size;
                if (childCount < 10) {
                    size = 'small';
                } else if (childCount>10 &&childCount < 30) {
                    size = 'medium';
                } else {
                    size = 'large';
                }
                return L.divIcon({
                    html: `<div class="marker-cluster-${size}">${childCount}</div>`,
                    className: 'marker-cluster',
                    iconSize: L.point(40, 40, true)
                });
            }
        });
        // Example data: real-world locations (e.g., landmarks, points of interest)
        // const locations = [
        //     { lat: 51.5, lng: -0.09, name: 'Location 1' },
        //     { lat: 51.51, lng: -0.1, name: 'Location 2' },
        //     { lat: 51.49, lng: -0.08, name: 'Location 3' },
        //     { lat: 51.52, lng: -0.1, name: 'Location 4' },
        //     { lat: 51.48, lng: -0.07, name: 'Location 5'},
        //     { lat: 51.503, lng: -0.08, name: 'Location 6' },
        //     { lat: 51.507, lng: -0.06, name: 'Location 7' },
        //     { lat: 51.508, lng: -0.1, name: 'Location 8' },
        //     { lat: 51.509, lng: -0.11, name: 'Location 9' },
        //     { lat: 51.51, lng: -0.12, name: 'Location 10' },
        //     { lat: 51.507, lng: -0.09, name: 'Location 11' },
        //     { lat: 51.504, lng: -0.1, name: 'Location 12' },
        //     { lat: 51.506, lng: -0.07, name: 'Location 13' },
        //     { lat: 51.508, lng: -0.09, name: 'Location 14' },
        //     { lat: 51.510, lng: -0.08, name: 'Location 15' }
        //     // Add more locations here if needed
        // ];
       
        // Add markers to the cluster group
       for(let camp of campground){
            let popupContent=`<h3>${camp.title}</h3><p>${camp.location}</p>`
            const marker = L.marker([camp.geometry.coordinates[1],camp.geometry.coordinates[0]])
                .bindPopup(popupContent);
            markers.addLayer(marker);
        };

        // Add the MarkerClusterGroup to the map
        map.addLayer(markers);

        const clusterBounds = markers.getBounds();
  if (clusterBounds.isValid()) {
    map.fitBounds(clusterBounds);
  }
    

