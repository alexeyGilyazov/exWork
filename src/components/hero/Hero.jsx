import React from 'react'
import Slider from '../UI/slider/slider'

const Hero = () => {
  return (
    <div className="hero" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Slider style={{ maxwidth: '500px' }} />
      <div className="text-block">
        <h1>Job Search</h1>
        <p>Your Future</p>
      </div>

    </div>
  )
}

export default Hero