import React from 'react'

class WeatherForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      city: '',
    }
    this.submitHandler = this.submitHandler.bind(this)
  }

  submitHandler = (e) => {
    e.preventDefault()
    this.props.handler(this.state.city)
  }

  render() {
    return (
      <form action="#" onSubmit={this.submitHandler}>
        <input
          type="text"
          value={this.city}
          onChange={(e) => this.setState({ city: e.target.value })}
          name="city"
        />
        <button>Узнать погоду</button>
      </form>
    )
  }
}

export default WeatherForm