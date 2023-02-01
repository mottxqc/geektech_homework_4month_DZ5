import axios from 'axios'

export default async function sendCity(
  city,
  sendingHandler,
  loadingHandler,
  errorHandler,
) {
  errorHandler(false)
  sendingHandler(true)
  loadingHandler(true)
  const weatherArrays = {
    'сегодня': [],
    'завтра': [],
    keys: ['сегодня', 'завтра'],
  }
  const today = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate()
  )
  const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000)
  const api = "485ca576ea084a119cc13c37eed4f76e"
  await axios
    .get(
      `http://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=ru&units=metric&appid=${api}`
    )
    .then((response) => {
      loadingHandler(false)
      response.data.list.map((weatherElement) => {
        const elemDate = new Date(
          weatherElement.dt_txt[0] +
            weatherElement.dt_txt[1] +
            weatherElement.dt_txt[2] +
            weatherElement.dt_txt[3],
          weatherElement.dt_txt[5] + weatherElement.dt_txt[6] - 1,
          weatherElement.dt_txt[8] + weatherElement.dt_txt[9]
        )
        if (elemDate.getTime() < tomorrow.getTime()) {
          weatherArrays.сегодня.push(weatherElement)
        } else if (elemDate.getTime() === tomorrow.getTime()) {
          weatherArrays.завтра.push(weatherElement)
        } else {
          const otherDate = `${weatherElement.dt_txt[8]}${weatherElement.dt_txt[9]}.${weatherElement.dt_txt[5]}${weatherElement.dt_txt[6]}`;
          if (weatherArrays[otherDate]) {
            weatherArrays[otherDate].push(weatherElement)
          } else {
            weatherArrays[otherDate] = [weatherElement]
            weatherArrays.keys.push(otherDate)
          }
        }
      })
      loadingHandler(false)
    }).catch(() => {
      loadingHandler(false)
      errorHandler(true)
      weatherArrays = []
    })
    return weatherArrays
}