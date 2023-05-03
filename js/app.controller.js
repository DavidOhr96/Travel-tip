import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'

window.onload = onInit
window.onAddMarker = onAddMarker
window.onPanTo = onPanTo
window.onGetLocs = onGetLocs
window.onUserGo = onUserGo
window.onDeleteLocation = onDeleteLocation
window.onMyLocation = onMyLocation
window.onSearchLocation = onSearchLocation


function onInit() {
  mapService
    .initMap()
    .then(() => {
      console.log('Map is ready')
    })
    .catch((err) => console.log(err))
    getParams()
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

function onPanTo() {
  console.log('Panning the Map')
  mapService.panTo(35.6895, 139.6917)
  setQueryStringParams(35.6895, 139.6917)
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
  locService.getLocationById(id).then((res) => {
    mapService.panTo(res.lat, res.lng)
    setQueryStringParams(res.lat,res.lng)
    })


}
function onDeleteLocation(id) {
  locService.deleteLocation(id).then(() => {
    renderLocationsTable()
  })
}
function onMyLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition)
  } else {
    alert('Geolocation is not supported by this browser.')
  }
}
function showPosition(locationObj) {
  const myLocCoords = {
    lat: locationObj.coords.latitude,
    lng: locationObj.coords.longitude,
  }
  mapService.panTo(myLocCoords.lat, myLocCoords.lng)
  setQueryStringParams(myLocCoords.lat,myLocCoords.lng)
}

function onSearchLocation() {
  const name = document.querySelector('.search-loc').value
  let loc = name.replace(' ', '+')
  locService
    .getCoordsFromSearch(loc)
    .then((res) => res.json())
    .then((res) => {
      console.log('res', res)
      const { lat, lng } = res.results[0].geometry.location
      mapService.panTo(lat, lng)
      setQueryStringParams(lat,lng)
      locService.createLocation(name, lat, lng).then(() => {
        renderLocationsTable()
      })
    })
}
function getParams(){
  const queryStringParams = new URLSearchParams(window.location.search)
  let lat=queryStringParams.get('lat')
  let lng=queryStringParams.get('lng')
  console.log(lat,lng)
    mapService.panTo(lat, lng)
    setQueryStringParams(lat,lng)
}
function setQueryStringParams(lat,lng) {
  const queryStringParams = `?lat=${lat}&lng=${lng}`
  const newUrl = window.location.protocol + '//' + window.location.host + window.location.pathname + queryStringParams
  window.history.pushState({ path: newUrl }, '', newUrl)
}