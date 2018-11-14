import axios from 'axios'
import { FAKE_API_ROOT as host } from './config'

export const request = ({
  method = 'get',
  endpoint,
  query = {},
  fullUrl = '',
}) => {
  const url = fullUrl || host + endpoint

  return axios({
    method,
    url,
    params: query,
  })
}

export const getNodeChild = nodePath =>
  request({ endpoint: nodePath + '.json' })
    .then(res => {
      const path = res.data.path
      return res.data.fileList.map(file => ({
        ...file,
        path: path + '/' + file.name,
      }))
    })
    .catch(err => console.error(err))
