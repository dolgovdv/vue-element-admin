import axios from 'axios'

const service = axios.create({
  // baseURL: process.env.BASE_API, // api 的 base_url
  // baseURL: 'http://localhost:3000'
  baseURL: 'http://194.58.100.161:3000'
  // timeout: 5000 // request timeout
})

function getObjectData(query) {
  return new Promise((resolve, reject) => {
    // console.log('query', query)
    service({
      method: 'post',
      url: '/select',
      data: {
        typeObject: 'object',
        nameObject: query
        // nameObject: 'public.test'
      }
    })
      .then(res => {
        console.log('res', res.data[0])
        // console.log('this.DataObject = ', this.DataObject)
        return resolve(res.data[0])
      })
      .catch(err => {
        return reject(console.log('err = ', err))
      })
  })
}

export default getObjectData
