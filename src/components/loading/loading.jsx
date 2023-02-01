import React from 'react'
import styles from './loading.module.css'

class Loading extends React.Component {
  constructor() {
    super()
  }

  render() {
    return <div className={styles.loading}></div>
  }
}

export default Loading