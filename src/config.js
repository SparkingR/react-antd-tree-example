const HOST = global.window
  ? `${window.location.protocol}//${window.location.hostname}`
  : 'http://localhost'
const PORT = global.window ? window.location.port : '3000'
export const API_ROOT = `${HOST}:${PORT}`

const PATH = global.window ? window.location.pathname : ''
export const FAKE_API_ROOT = `${API_ROOT}${PATH}fakedata`

export const rootFolder = '/root'
