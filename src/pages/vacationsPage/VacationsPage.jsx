import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  setVacancies,
  setFilteredVacantions,
  sortVacancies,
} from '../../slice/vacantionSlice'
import {
  setFavorite,
  addFavorite,
  removeFavorite,
  // clearFavorite,
  changeQuantity,
} from '../../slice/favoriteSlice'

import axios from 'axios'
import regionList from '../../data/region.json'

import './style.css'
import { Container } from '@mui/material'
import WysiwygIcon from '@mui/icons-material/Wysiwyg'
import Myselect from './../../components/UI/select/Myselect'
import MyModal from './../../components/UI//modal/MyModal'
import Loader from './../../components/UI/loader/Loader'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'

const VacationsPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [fetching, setFetching] = useState(false)
  const [searchJob, setSearchJob] = useState('')
  const [searchRegion, setSearchRegion] = useState('')
  const [selectedSort, setSelectedSort] = useState('')
  const [oneVacancy, setOneVacancy] = useState([])
  const [needOpen, setNeedOpen] = useState([]);
  const [needLoader, setNeedLoader] = useState(false)
  const [actualColor, setActualColor] = useState('white')

  const dispatch = useDispatch()
  const vacantions = useSelector(state => state.vacantion.vacantions)
  const favorites = useSelector(state => state.favorite.favorite)

  // получение всех вакансий при монтировании
  useEffect(() => {
    axios
      .get(
        `http://opendata.trudvsem.ru/api/v1/vacancies?offset=${currentPage}&limit=9`
      )
      .then(res => {
        dispatch(setVacancies(res.data))
        if (res.data.results.vacancies.length > 0) {
          setCurrentPage(prevState => prevState + 1)
        }
        setNeedLoader(true)
      })
      .catch(err => {
        throw new Error(err)
      })
      .finally(() => {
        setFetching(false)
        setNeedLoader(false)
      })
  }, [currentPage, fetching])

  // слушание события скролл для пагинации
  useEffect(() => {
    // Проверяем, что fetching false
    if (!fetching) {
      document.addEventListener('scroll', scrollHandler);
    }
    return () => {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, [fetching]);

  // функция пагинации
  const scrollHandler = (e) => {
    if (
      e.target.documentElement.scrollHeight -
      (e.target.documentElement.scrollTop + window.innerHeight) <
      10 &&
      vacantions && vacantions.length > 0
    ) {
      setFetching(true);
    }
    setFetching(false);
  };

  //  поиск по вакансии
  const handleSearch = e => {
    e.preventDefault()
    axios
      .get(`http://opendata.trudvsem.ru/api/v1/vacancies?text=${searchJob}`)
      .then(res => {
        dispatch(setFilteredVacantions(res.data.results.vacancies))
        setNeedLoader(true)
      })
      .catch(err => {
        throw new Error(err)
      })
      .finally(() => {
        setFetching(false)
        setSearchJob('')
        setNeedLoader(false)
      })
  }

  // сортировка
  const sortVacantions = sortType => {
    setSelectedSort(sortType)
    dispatch(sortVacancies(sortType))
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
      .then(res => {
        setOneVacancy(res.data);
        const openStatus = Array(vacantions.results.vacancies.length).fill(false);
        openStatus[id] = true;
        setNeedOpen(openStatus);
      })
      .catch(err => {
        throw new Error(err);
      });
  };

  const changeFavorite = id => {
    const favoriteIds = favorites.map(favorite => favorite.vacancy.id);
    if (favoriteIds.includes(id)) {
      dispatch(removeFavorite(id));
      setActualColor('white');
    } else {
      dispatch(addFavorite(id));
      setActualColor('red');
    }
    dispatch(changeQuantity());
  };

  return (
    <Container sx={{ marginTop: '100px' }}>
      <form className='form-search'>
        <div>
          <input
            type='text'
            value={searchJob}
            onChange={e => setSearchJob(e.target.value)}
            placeholder='Поиск по названию вакансии'
            className='input input-first'
          />
          <button onClick={handleSearch}>Поиск</button>
        </div>
        <div>
          <input
            type='text'
            value={searchRegion}
            onChange={e => setSearchRegion(e.target.value)}
            placeholder='Поиск по региону'
            className='input input-second'
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
        <button onClick={() => dispatch(setFilteredVacantions([]))}>
          Сбросить
        </button>
      </form>

      <div className='vacantion__wrapper'>
        {needLoader ? (
          <Loader />
        ) : vacantions.results &&
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
                {item.vacancy && item.vacancy.id && (
                  <FavoriteBorderIcon
                    onClick={() => changeFavorite(item.vacancy.id)}
                    style={{ marginLeft: '10px', fill: actualColor }}
                  />
                )}
              </div>
              {item.vacancy && item.vacancy.region && (
                <p style={{ paddingLeft: '10px' }}>
                  <span className='span'>Регион:</span> <br />
                  {item.vacancy.region.name}
                </p>
              )}
              <div className='info-vacantion'>
                <p className='span'>
                  Вакансия: <br />
                </p>
                {item.vacancy && item.vacancy['job-name'] && (
                  <span>{item.vacancy['job-name']}</span>
                )}
                <p className='span'>
                  Зарплата: <br />
                </p>
                {item.vacancy && item.vacancy.salary_min && (
                  <span>{item.vacancy.salary_min}</span>
                )}
              </div>
              <MyModal
                region={item.vacancy.region.name}
                name={item.vacancy['job-name']}
                salary={item.vacancy.salary_min}
                needOpen={needOpen[index]}
                duty={item.vacancy.duty || ''}
              />
            </div>
          ))
        ) : (
          <Loader />
        )}
      </div>
    </Container>
  )
}

export default VacationsPage
