import React from 'react'
import Button from '@mui/joy/Button';

const MyButton = ({ text, onClick }) => {

  return (
    <Button variant="outlined" onClick={onClick}>{text}</Button>
  )
}

export default MyButton