import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBooksStart, fetchBooksSuccess, fetchBooksFailure, } from '../../store/bookSlice'
import { BounceLoader } from 'react-spinners'
import BooksItems from '../bookItems/BooksItems'
import Error from '../error/Error'


const BookList = () => {
  const booksData = useSelector(state => state.books)
  const dispatch = useDispatch()

  const [error, setError] = useState(false)

  useEffect(() => {
    dispatch(fetchBooksStart())
    axios.get(`https://openlibrary.org/subjects/horror.json`)
      .then(response => {
        dispatch(fetchBooksSuccess(response.data.works))
        dispatch(fetchBooksFailure(true))
      })
      .catch(error => {
        fetchBooksFailure(false)
        setError(true)
        dispatch(fetchBooksFailure(false))
      })
  }, [dispatch])


  return (
    <div>
      {
        booksData.loading && <><BounceLoader /><h2>Loading...</h2></>
      }
      <ul>
        {booksData.data.map(book => (
          <BooksItems key={book.key} title={book.title} authors={book.authors} />
        ))}
        {error && <Error />}
      </ul>
    </div>
  )
}

export default BookList
