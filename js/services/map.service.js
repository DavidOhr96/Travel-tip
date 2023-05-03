export { mapService }
const mapService = {
  initMap,
  addMarker,
  panTo,
}
let map
// Initialize and add the map
async function initMap() {
  // The location of Uluru
  const position = { lat: -25.344, lng: 131.031 };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerView } = await google.maps.importLibrary("marker");

  // The map, centered at Uluru
  map = new Map(document.getElementById("map"), {
    zoom: 4,
    center: position,
    mapId: "DEMO_MAP_ID",
  });

  // The marker, positioned at Uluru
  const marker = new AdvancedMarkerView({
    map: map,
    position: position,
    title: "Uluru",
  });
}

// initMap();
// async function initMap() {
//   const { Map } = await google.maps.importLibrary('maps')

//    gMap = new Map(document.getElementById('map'), {
//     center: { lat: -34.397, lng: 150.644 },
//     zoom: 8,
//   })
// }
function addMarker(coords) {}

function panTo(lat, lng) {
  // const place = getLocationById(placeId)
  map.setCenter({lat, lng})
  map.setZoom(13)
  

}
