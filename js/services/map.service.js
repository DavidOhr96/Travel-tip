export { mapService }
const mapService = {
  initMap,
  addMarker,
  panTo,
}
async function initMap() {
  let map

  const { Map } = await google.maps.importLibrary('maps')

  map = new Map(document.getElementById('map'), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  })
}
function addMarker(coords) {}
function panTo(lat, lng) {}
