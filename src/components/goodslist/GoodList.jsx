import axios from 'axios'
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchGoods, setFetching, setCurrentLimit } from '../../store/goodSlice'
import './goods.scss'

const GoodList = () => {
  const dispatch = useDispatch()
  const goodsData = useSelector(state => state.goods.data)
  const isFetching = useSelector(state => state.goods.fetching)
  const currentLimit = useSelector(state => state.goods.currentLimit)
  const listRef = useRef()


  useEffect(() => {
    if (isFetching) {
      axios
        .get(`https://api.escuelajs.co/api/v1/products?offset=${currentLimit}&limit=20`)
        .then(response => {
          dispatch(fetchGoods(response.data))
          setCurrentLimit(currentLimit + 10)
          // dispatch(checkTotalLength(response.headers['Content-Length']))
        })
        .catch(error => {
          console.log(error)
          dispatch(setFetching(false))
        })
        .finally(() => {
          dispatch(setFetching(false))
          listRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
        })
    }
  }, [isFetching, currentLimit, dispatch])


  useEffect(() => {
    document.addEventListener('scroll', scrollHandler)
    return () => document.removeEventListener('scroll', scrollHandler)
  }, [])

  const scrollHandler = () => {
    const scrollHeight = document.documentElement.scrollHeight
    const scrollTop = document.documentElement.scrollTop
    const innerHeight = window.innerHeight
    if (scrollHeight - (scrollTop + innerHeight) < 100) {
      if (isFetching) {
        dispatch(setCurrentLimit(currentLimit + 10))
        dispatch(setFetching(true))
        listRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
      }
    }
  }


  return (
    <div className='goods__wrapper'>
      <h1 ref={listRef} >GoodList</h1>
      <div className='goods'>
        {goodsData.map(good => (
          <div key={good.id} className='good'>
            <span>iD: {good.id}</span>
            <span>{good.title}</span>
            <span>{good.description}</span>
            <span>{good.price} $</span>
            <img src={good.images} alt='img' style={{ width: '100px' }} />
          </div>
        ))}
        {isFetching && (
          <div className='loading-indicator'>Loading...</div>
        )}
      </div>
    </div>
  )
}

export default GoodList