import React from 'react'
import './App.css'
import WeatherForm from './components/WeatherForm/WeatherForm'
import WeatherElement from './components/WeatherElement/WeatherElement'
import getWeather from './data/weather'
import Loading from './components/Loading/Loading'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      isSend: false,
      isLoading: false,
      isError: false,
      data: [],
    }
    this.getData = this.getData.bind(this)
    this.setIsSend = this.setIsSend.bind(this)
    this.setIsLoading = this.setIsLoading.bind(this)
    this.setIsError = this.setIsError.bind(this)
  }

  setIsSend = (value) => {
    this.setState({ isSend: value })
    console.log('change')
  }

  setIsLoading = (value) => {
    this.setState({ isLoading: value })
  }

  setIsError = (value) => {
    this.setState({ isError: value })
  }

  getData = async (city) => {
    const response = await getWeather(
      city,
      this.setIsSend,
      this.setIsLoading,
      this.setIsError
    )
    this.setState({
      data: response,
    })
    console.log(this.state.data)
  }

  render() {
    return (
      <div className="App">
        <WeatherForm handler={this.getData} />
        <div className="weatherBody">
          {this.state.isSend && this.state.isLoading && <Loading />}
          {this.state.isError && !this.state.isLoading && (
            <h1 style={{ color: "red" }}>Ошибка</h1>
          )}
          {this.state.data &&
            this.state.isSend &&
            !this.state.isError &&
            !this.state.isLoading &&
            this.state.data.keys.map((key) => (
              <ul className="weather__list" key={key}>
                <h2>{key}</h2>
                {this.state.data[key].map((element) => (
                  <WeatherElement weatherData={element} key={element.dt} />
                ))}
              </ul>
            ))}
        </div>
      </div>
    )
  }
}

export default App