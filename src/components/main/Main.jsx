import React from 'react'
import './main.css'
import { Container } from '@mui/material'

const Main = () => {
  return (
    <div className='main'>
      <Container className='main__container'>
        <div className='title-block'>
          <div className='block__wrapper'>
            <h1 className='main__title'>Сервис</h1>
          </div>
          <div className='block__wrapper'>
            <p className='main__subtitle'>Для поиска</p>
          </div>
          <div className='block__wrapper'>
            <p className='main__subtitle'>Актуальных вакансии </p>
          </div>
          <div className='block__wrapper'>
            <p style={{ textAlign: 'left' }} className='main__description'>По всей России с реальными зарплатами</p>
          </div>
        </div>
        <div className="bg-img"></div>
      </Container>
    </div>
  )
}

export default Main
