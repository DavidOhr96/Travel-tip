import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'

window.onload = onInit
window.onAddMarker = onAddMarker
window.onPanTo = onPanTo
window.onGetLocs = onGetLocs
window.onGetUserPos = onGetUserPos
window.onUserGo = onUserGo
window.onDeleteLocation = onDeleteLocation

function onInit() {
  mapService
    .initMap()
    .then(() => {
      console.log('Map is ready')
    })
    .catch((err) => console.log(err))

  renderLocationsTable()
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
  console.log('Getting Pos')
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject)
  })
}

function onAddMarker() {
  console.log('Adding a marker')
  mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 })
}

function onGetLocs() {
  locService.getLocs().then((locs) => {
    console.log('Locations:', locs)
    document.querySelector('.locs').innerText = JSON.stringify(locs, null, 2)
  })
}

function onGetUserPos() {
  getPosition()
    .then((pos) => {
      console.log('User position is:', pos.coords)
      document.querySelector('.user-pos').innerText = `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
    })
    .catch((err) => {
      console.log('err!!!', err)
    })
}
function onPanTo() {
  console.log('Panning the Map')
  mapService.panTo(35.6895, 139.6917)
}

function renderLocationsTable() {
  locService.getLocs().then((locs) => {
    let stringHTML = ''
    stringHTML = locs
      .map((loc) => {
        return `
      <li class="location-item">
        <h3>${loc.name}</h3>
        <div class="location-item-buttons">
          <button onclick="onUserGo('${loc.id}')" class="btn">Go</button>
          <button onclick="onDeleteLocation('${loc.id}')" class="btn">Delete</button>
        </div>
      </li>
      `
      })
      .join('')

    document.querySelector('.locations-panel').innerHTML = stringHTML
  })
}
function onUserGo(id) {
  locService.getLocationById(id).then((res) => mapService.panTo(res.lat, res.lng))
}
function onDeleteLocation(id) {
  locService.deleteLocation(id)
}
