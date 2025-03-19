export default function getFligts(API_KEY: string, AIRPORT_CODE: string) {
  return fetch (`https://api.aviationstack.com/v1/flights?access_key=${API_KEY}&arr_iata=${AIRPORT_CODE}`)
    .then((r) => {
      if (r.ok) {
        return r.json()
      } else {
        throw new Error('REQUEST FAILED!!!')
      }
    })
    .then((json) => json)
    .catch((error) => console.error(error))
}