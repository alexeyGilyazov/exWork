import React, { useState } from 'react'
import { Container } from '@mui/material'
import './style.css'
import { Input } from '@mui/base/Input'
import SearchIcon from '@mui/icons-material/Search'

const placeholderData = {
  job: 'Кладовщик, инженер... ',
  city: 'Москва, Киров...',
  salary: 'от 20 000р'
}

const FormSearch = () => {


  const [userData, setUserData] = useState({ 'jobs': '', 'city': '', 'salary': '' })

  const handelSearch = e => {
    e.preventDefault()
    console.log(userData)
    setUserData({ 'jobs': '', 'city': '', 'salary': '' })
  }

  return (
    <Container>
      <form className='form-search'>
        <Input
          type='text'
          placeholder={placeholderData.job}
          value={userData.jobs}
          onChange={e => setUserData({ ...userData, jobs: e.target.value })}
          className='input input-first'
        />
        <Input
          className='input input-second'
          type='text'
          placeholder={placeholderData.city}
          value={userData.city}
          onChange={e => setUserData({ ...userData, city: e.target.value })}
        />
        <Input
          className='input input-third'
          type='text'
          placeholder={placeholderData.salary}
          value={userData.salary}
          onChange={e => setUserData({ ...userData, salary: e.target.value })}
        />
        <button className='btn' onClick={handelSearch}>
          <SearchIcon sx={{ width: '40px', height: '40px' }} className='icon' />
        </button>
      </form>
    </Container>
  )
}

export default FormSearch
