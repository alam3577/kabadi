import React from 'react'
import classes from './styles/NotFound.module.css'

function NotFound() {
  return (
    <div className={classes.error}>
      <p style={{ color: '#00d9a6', fontWeight: "600" }} className='fs-1'>404 - Not Found</p>
      <p>The page you are looking for does not exist.</p>
    </div>
  )
}

export default NotFound