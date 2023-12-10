import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFavorite, removeFavorite, addFavorite } from '../../slice/favoriteSlice';
import { Container } from '@mui/material';
import MyModal from '../../components/UI/modal/MyModal';
import WysiwygIcon from '@mui/icons-material/Wysiwyg';
import './style.css';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { quantityFavorite } from '../../slice/favoriteSlice';
import { changeQuantity } from '../../slice/favoriteSlice';

const FavoritePage = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorite.favorite);
  const quantityFavorite = useSelector(state => state.favorite.quantityFavorite);
  useEffect(() => {
    dispatch(setFavorite(favorites));
  }, [favorites]);

  const changeFavorite = (item) => {
    if (favorites.some((favorite) => favorite.vacancy === item.vacancy)) {
      dispatch(removeFavorite(item));
    } else {
      dispatch(addFavorite(item));
    }
    dispatch(changeQuantity());
  };

  return (
    <Container sx={{ marginTop: '100px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', gap: '20px', flexWrap: 'wrap' }}>
        {favorites.length > 0 ? (
          favorites.map((item, index) => (
            <div key={index} className='vacantion'>
              <div className='header-line'>
                <span style={{ marginRight: '10px' }}>Избранная вакансия № {index + 1} </span>
                <WysiwygIcon />
                <FavoriteBorderIcon onClick={() => changeFavorite(item)} />
              </div>
              <p style={{ paddingLeft: '10px' }}>
                <span className='span'>Регион:</span> <br />
                {item.region?.name}
              </p>
              <div className='info-vacantion'>
                <p className='span'>Вакансия: </p>
                <span>{item['job-name']}</span>
                <p className='span'>Зарплата: </p>
                <span>{item.salary_min}</span>
              </div>
              <MyModal
                region={item.region.name}
                name={item['job-name']}
                salary={item.salary_min}
                needOpen={item.index}
                duty={item.duty || ''}
              />
            </div>
          ))
        ) : (
          <div>No favorites</div>
        )}
      </div>
    </Container>
  );
};

export default FavoritePage;