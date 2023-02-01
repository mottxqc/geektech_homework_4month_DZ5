import React from 'react'
import styles from './weatherElement.module.css'

class WeatherElement extends React.Component {
  constructor(props) {
    super(props)
    this.weatherData = props.weatherData
    this.state = {
      optional: false,
    }
    this.time = `${this.weatherData.dt_txt[11]}${this.weatherData.dt_txt[12]}${this.weatherData.dt_txt[13]}${this.weatherData.dt_txt[14]}${this.weatherData.dt_txt[15]}`
    this.clickHandler = this.clickHandler.bind(this)
  }

  clickHandler = () => {
    this.setState({ optional: !this.state.optional })
  }

  render() {
    return (
      <li className={styles.element} onClick={() => this.clickHandler()}>
        <time className={styles.time}>{this.time}</time>
        <img
          className={styles.image}
          src={`http://openweathermap.org/img/wn/${this.weatherData.weather[0].icon}@2x.png`}
        />
        <h3 className={styles.title}>
          {this.weatherData.weather[0].description}
        </h3>
        <div className="temp">
          <h4>Температура: {this.weatherData.main.temp}°C</h4>
          <div
            className={
              this.state.optional ? styles.optional.active : styles.optional
            }
          >
            <p className={styles.feel}>
              Ощущается: {this.weatherData.main.feels_like}°C
            </p>
            <p className={styles.min}>
              Минимальная: {this.weatherData.main.temp_min}°C
            </p>
            <p className={styles.max}>
              Максимальная: {this.weatherData.main.temp_max}°C
            </p>
          </div>
        </div>
        <div className="wind">
          <h4>Ветер: {this.weatherData.wind.speed}м/c</h4>
          <div
            className={
              this.state.optional ? styles.optional.active : styles.optional
            }
          >
            <p className="direction">
              Направление: {this.weatherData.wind.deg}м/c
            </p>
            <p className="gust">Порывы: {this.weatherData.wind.gust}м/c</p>
          </div>
        </div>
      </li>
    )
  }
}

export default WeatherElement