import React from 'react'
import Slider from '../UI/slider/slider'
import { Container } from '@mui/material'

const Hero = () => {
  return (
    <Container>
      <div className="hero" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Slider style={{ maxwidth: '500px' }} />
        <div>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. <br />Quis libero officiis assumenda non accusamus beatae.</p>
        </div>
      </div>
    </Container>
  )
}

export default Hero