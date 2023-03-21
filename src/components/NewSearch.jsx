import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Header from './Header';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBRipple,
  MDBContainer,
  MDBInput,
  MDBCol,
  MDBRow
} from 'mdb-react-ui-kit';

const NewSearch = () => {
  const [artistN, setArtistN] = useState('');
  const [artistSearch, setArtistSearch] = useState('');
  const [searched, setSearched] = useState(false);
  const [albumArray, setAlbumArray] = useState([]);

  const searchClickBtn = async () => {
    setArtistSearch(artistN);
    setSearched(true);
    const albums = await searchAlbumsAPI(artistN);
    setAlbumArray(albums);
    setArtistN('');
  };

  const handleInputSearch = ({ target }) => {
    setArtistN(target.value);
  };

  return (
    <div>
      <Header />
      <MDBContainer className="my-5">
        <MDBCard>
          <MDBRow>
            <MDBCol>
              <MDBCardBody className='d-flex flex-column align-items-center'>
      
                  <MDBInput
                    wrapperClass='mb-4'
                    label='Pesquise um Artista'
                    id='formControlLg'
                    type='text'
                    size="lg"
                    value={ artistN }
                    onChange={ handleInputSearch }
                  />
                  <MDBBtn
                    className="mb-4 px-5"
                    color='dark'
                    size='lg'
                    onClick={ searchClickBtn }
                    >
                      Pesquisar
                  </MDBBtn>
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </MDBContainer>
      <MDBContainer className="my-5">
      {searched && <p>{`Resultado de álbuns de: ${artistSearch}`}</p>}
        <MDBCard className='d-flex flex-column align-items-center'>
        <ul>
        {albumArray.map(({ artistName, artworkUrl100, collectionName, collectionId }) => (
          <li key={collectionName} style={{ listStyle: 'none' }}>
          <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay d-flex flex-column align-items-center imge' >
            <MDBCardImage src={artworkUrl100} fluid alt={artistName} />
            <a>
              <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
            </a>
          </MDBRipple>
          <MDBCardBody className='d-flex flex-column align-items-center'>
            <MDBCardTitle>{collectionName}</MDBCardTitle>
            <MDBCardText>
            {artistName}
            </MDBCardText>
              <Link to={`/album/${collectionId}`}>
                <MDBBtn>Escute aqui</MDBBtn>
              </Link>
          </MDBCardBody>
          </li>
          ))}
          </ul>
        </MDBCard>
      </MDBContainer>
      
    </div>
  );
};

export default NewSearch;
