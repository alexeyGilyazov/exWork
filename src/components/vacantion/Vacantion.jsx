import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  setVacancies,
  setFilteredVacantions,
  sortVacancies,
  searchRegionReducer,
} from './../../slice/vacantionSlice'
import axios from 'axios'
import regionList from './../../data/region.json'

import './style.css'
import { Container } from '@mui/material'
import WysiwygIcon from '@mui/icons-material/Wysiwyg'
import Myselect from '../UI/select/Myselect'
import MyModal from '../UI/modal/MyModal'

const Vacantion = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [fetching, setFetching] = useState(false)
  const [searchJob, setSearchJob] = useState('')
  const [searchRegion, setSearchRegion] = useState('')
  const [selectedSort, setSelectedSort] = useState('')
  const [oneVacancy, setOneVacancy] = useState([])
  const [needOpen, setNeedOpen] = useState(false)

  const dispatch = useDispatch()
  const vacantions = useSelector(state => state.vacantion.vacantions)

  // получение всех вакансий при монтировании
  useEffect(() => {
    axios
      .get(
        `http://opendata.trudvsem.ru/api/v1/vacancies?offset=${currentPage}&limit=20`
      )
      .then(res => {
        dispatch(setVacancies(res.data))
        if (res.data.results.vacancies.length > 0) {
          setCurrentPage(prevState => prevState + 1)
        }
      })
      .catch(err => {
        throw new Error(err)
      })
      .finally(() => {
        setFetching(false)
      })
  }, [fetching])

  // слушание события скролл для пагинации
  useEffect(() => {
    document.addEventListener('scroll', scrollHandler)
    return () => {
      document.removeEventListener('scroll', scrollHandler)
    }
  })

  // функция пагинации
  const scrollHandler = e => {
    if (
      e.target.documentElement.scrollHeight -
      (e.target.documentElement.scrollTop + window.innerHeight) <
      10
    ) {
      setFetching(true)
    }
  }

  //  поиск по вакансии
  const handleSearch = e => {
    e.preventDefault()
    axios
      .get(`http://opendata.trudvsem.ru/api/v1/vacancies?text=${searchJob}`)
      .then(res => dispatch(setFilteredVacantions(res.data.results.vacancies)))
      .catch(err => {
        throw new Error(err)
      })
      .finally(() => {
        setFetching(false)
        setSearchJob('')
      })
  }

  // сортировка
  const sortVacantions = sort => {
    setSelectedSort(sort)
    dispatch(sortVacancies(sort))
    setSelectedSort('')
  }

  // поиск по региону
  const handleSearchRegion = async e => {
    e.preventDefault()
    const region = regionList.regions.find(item => item.name === searchRegion)
    if (!region) {
      return
    }
    const regionCode = region.code
    await axios
      .get(`http://opendata.trudvsem.ru/api/v1/vacancies/region/${regionCode}`)
      .then(res => dispatch(setFilteredVacantions(res.data.results.vacancies)))
      .catch(err => {
        throw new Error(err)
      })
      .finally(() => {
        setFetching(false)
        setSearchRegion('')
      })
  }

  const openVacancy = (id, companycode) => {
    const url = `http://opendata.trudvsem.ru/api/v1/vacancies/vacancy/${companycode}/${id}`;
    axios
      .get(url)
      .then((res) => {
        setOneVacancy(res.data);
        setNeedOpen(true);
      })
      .catch((err) => {
        throw new Error(err);
        setNeedOpen(false);
      });
  };

  return (
    <Container>
      <form
        style={{
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <input
            type='text'
            value={searchJob}
            onChange={e => setSearchJob(e.target.value)}
            placeholder='Поиск по названию вакансии'
            style={{ border: '1px solid #345dc4' }}
          />
          <button onClick={handleSearch}>Поиск</button>
        </div>
        <div>
          <input
            type='text'
            value={searchRegion}
            onChange={e => setSearchRegion(e.target.value)}
            placeholder='Поиск по региону'
            style={{ border: '1px solid #345dc4' }}
          />
          <button onClick={handleSearchRegion}>Поиск</button>
        </div>
        <div>
          <Myselect
            defaultValue='Сортировка по'
            value={selectedSort}
            onChange={sortVacantions}
            option={[
              { value: 'salaryUp', name: 'Зарплата по возрастанию' },
              { value: 'salaryDown', name: 'Зарплата по убыванию' },
            ]}
          />
        </div>
      </form>

      <div className='vacantion__wrapper'>
        {vacantions.results &&
          vacantions.results.vacancies &&
          vacantions.results.vacancies.length !== 0 ? (
          vacantions.results.vacancies.map((item, index) => (
            <div
              onClick={() =>
                openVacancy(item.vacancy.id, item.vacancy.company.companycode)
              }
              key={index}
              className='card-vacantion'
            >
              <div className='header-line'>
                <span style={{ marginRight: '10px' }}>Новая вакансия </span>
                <WysiwygIcon />
              </div>
              <MyModal
                region={item.vacancy.region.name}
                name={item.vacancy['job-name']}
                salary={item.vacancy.salary_min}
                needOpen={needOpen}
              />
              <p style={{ paddingLeft: '10px' }}>
                <span className='span'>Регион:</span> <br />
                {item.vacancy.region.name}
              </p>
              <div className='info-vacantion'>
                {/* <p className='span'>
                  Компания: <br />
                </p>
                <span>{item.vacancy.company.name}</span> */}
                <p className='span'>
                  Вакансия: <br />
                </p>
                <span>{item.vacancy['job-name']}</span>
                <p className='span'>
                  Зарплата: <br />
                </p>
                <span>{item.vacancy.salary_min}</span>
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
