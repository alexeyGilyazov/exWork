import React, { useState, useEffect } from 'react'
import './style.css'
import CircularProgress from '@mui/material/CircularProgress'

const Loader = () => {
  const [isVisible, setIsVisible] = useState(true)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  return isVisible ? (
    <div className='loader'>
      <CircularProgress />
    </div>
  ) : null
}

export default Loader
