// Create map instance with placeholder location
var map = L.map('map').setView([0, 0], 2);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Track user location
if (navigator.geolocation) {
  navigator.geolocation.watchPosition(
    function (position) {
      var lat = position.coords.latitude;
      var lon = position.coords.longitude;

      map.setView([lat, lon], 13);

      // Remove old marker if it exists
      if (typeof userMarker !== "undefined") {
        map.removeLayer(userMarker);
      }

      // Add new marker
      userMarker = L.marker([lat, lon]).addTo(map)
        .bindPopup("You are here!")
        .openPopup();
    },
    function (error) {
      alert("Geolocation failed: " + error.message);
    },
    {
      enableHighAccuracy: true,
      maximumAge: 1000
    }
  );
} else {
  alert("Geolocation is not supported by your browser.");
}
// // Fetch lat/lng using OpenStreetMap Nominatim

// fetch(https://nominatim.openstreetmap.org/search?format=json&q=${cityLocation})
//   .then(response => response.json())
//   .then(data => {
//     if (data && data.length > 0) {
//       const lat = data[0].lat;
//       const lon = data[0].lon;

//       const map = L.map('map').setView([lat, lon], 12);

//       // Add tile layer
//       L.tileLayer('https://{s}.tile.openstreetmap.org/%7Bz%7D/%7Bx%7D/%7By%7D.png', {
//         attribution: '&copy; OpenStreetMap contributors'
//       }).addTo(map);

//       // Add marker
//       L.marker([lat, lon]).addTo(map)
//         .bindPopup("Exact location after booking")
//         .openPopup();
//     } else {
//       alert("Could not locate the city on the map.");
//     }
//   })
//   .catch(err => {
//     console.error("Map error:", err);
//   });