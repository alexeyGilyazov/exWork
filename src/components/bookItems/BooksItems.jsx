import React from 'react'

function BooksItems({ key, title, authors }) {
  return (
    <li key={key}>
      <span style={{ fontWeight: 'bold', fontSize: '20px', marginRight: '10px' }}>{title}</span>
      <span style={{ fontSize: '25px', marginRight: '10px', color: 'rgba(13, 207, 142, 0.682)' }}>{authors[0]['name']}</span>
    </li>
  )
}

export default BooksItems