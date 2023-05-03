import { storageService } from './async-storage.service.js'

export const locService = {
  getLocs,
  createLocation,
  getLocationById,
}

const STORAGE_ID = 'locations'

function getLocs() {
  return storageService.query(STORAGE_ID)
}

function createLocation(name, lat, lng, weather = '', createdAt = Date.now(), updatedAt) {
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
