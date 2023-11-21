import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setVacantions } from './../../slice/vacantionSlice'
import axios from 'axios'

import './style.css'
import { Container } from '@mui/material'
import WysiwygIcon from '@mui/icons-material/Wysiwyg'

const Vacantion = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [fetching, setFetching] = useState(false)

  const dispatch = useDispatch()
  const vacantions = useSelector(state => state.vacantion.vacantions)

  useEffect(() => {
    axios
      .get(`http://opendata.trudvsem.ru/api/v1/vacancies?offset=${currentPage}&limit=9`)
      .then(res => {
        dispatch(setVacantions(res.data))
        if (res.data.results.vacancies.length > 0) {
          setCurrentPage(prevState => prevState + 1)
          console.log('fetching')
        }
      })
      .catch(err => {
        console.log(err)
        setFetching(false)
      })
      .finally(() => {
        setFetching(false)
      })

  }, [fetching])

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler)
    return () => {
      document.removeEventListener('scroll', scrollHandler)
    }
  })

  const scrollHandler = (e) => {
    if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 50) {
      setFetching(true)
      console.log('fetching')
    }
  }

  return (
    <Container>
      <div className='vacantion__wrapper'>
        {vacantions.results &&
          vacantions.results.vacancies &&
          vacantions.results.vacancies.length !== 0 ? (
          vacantions.results.vacancies.map(item => (
            <div key={item.vacancy.id} className='card-vacantion'>
              <div className='header-line'>
                <span style={{ marginRight: '10px' }}>Новая вакансия </span>
                <WysiwygIcon />
              </div>
              <p style={{ paddingLeft: '10px' }}>
                <span className='span'>Регион:</span> <br />
                {item.vacancy.region.name}
              </p>
              <div className='info-vacantion'>
                <p className='span'>
                  Компания: <br />
                </p>
                <span>{item.vacancy.company.name}</span>
                <p className='span'>
                  Вакансия: <br />
                </p>
                <span>{item.vacancy['job-name']}</span>
                <p className='span'>
                  Зарплата: <br />
                </p>
                <span>{item.vacancy.salary}</span>
              </div>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </Container>
  )
}

export default Vacantion

// https://layboard.com

// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const response = await axios.get(
//         'http://opendata.trudvsem.ru/api/v1/vacancies?offset=1&limit=10'
//       )
//       dispatch(setVacantions(response.data))
//     } catch (error) {
//       throw new Error(error)
//     }
//   }
//   fetchData()
// }, [])
