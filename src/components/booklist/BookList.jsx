import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBooks } from '../../store/bookSlice'

const BookList = () => {
  const booksData = useSelector(state => state.books)
  const dispatch = useDispatch()

  useEffect(() => {
    axios.get(`https://openlibrary.org/subjects/horror.json`)
      .then(response => dispatch(fetchBooks(response.data.works)))
      .catch(error => console.log(error))
  }, [dispatch])


  return (
    <div>
      <ul>
        {booksData.data.map(book => (
          <li key={book.key}>
            <span>{book.title}</span>
            <span>{book.authors[0]['name']}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default BookList
