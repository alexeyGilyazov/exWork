import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { quantityFavorite } from '../../slice/favoriteSlice';
import './style.css'

function Nav() {

  const quantityFavorite = useSelector(state => state.favorite.quantityFavorite);

  return (
    <div className='nav__wrapper'>
      <AppBar className='main-color nav' position="fixed" sx={{ minHeight: '60px' }}>
        <Container maxWidth='lg' sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
          <Link to='/'>Home</Link>
          <Link to='/vacationspage'>Vacantion</Link>
          <Link to='/favoritepage' className='nav__link'>Favorite <span className='quantity'>{quantityFavorite > 0 && `${quantityFavorite}`}</span></Link>
        </Container>
      </AppBar>
    </div>
  );
}
export default Nav;