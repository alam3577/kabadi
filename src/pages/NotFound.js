import React from 'react'
import classes from './styles/NotFound.module.css'

function NotFound() {
  return (
    <div className={classes.error}>
      <h1>404 - Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  )
}

export default NotFound