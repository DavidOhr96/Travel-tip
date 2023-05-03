import { storageService } from './async-storage.service.js'

export const locService = {
  getLocs,
  createLocation,
  getLocationById,
  deleteLocation,
  getCoordsFromSearch,
}

const locationToCoordsURL = 'https://maps.googleapis.com/maps/api/geocode/json?address=LOCATION&key=YOUR_API_KEY'
const STORAGE_ID = 'locations'

function getLocs() {
  return storageService.query(STORAGE_ID)
}

function createLocation(name, lat, lng, weather = '', createdAt = Date.now(), updatedAt = Date.now()) {
  const loc = {
    name,
    lat,
    lng,
    weather,
    createdAt,
    updatedAt,
  }
  return storageService.post(STORAGE_ID, loc)
}

function getLocationById(id) {
  return storageService.get(STORAGE_ID, id)
}

function deleteLocation(id) {
  return storageService.remove(STORAGE_ID, id)
}

function getCoordsFromSearch(loc) {
  return fetch(locationToCoordsURL.replace('LOCATION', loc).replace('YOUR_API_KEY', API_KEY))
}
