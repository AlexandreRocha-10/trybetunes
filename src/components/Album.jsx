import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import MusicCard from './MusicCard';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import { MDBCard, MDBCardBody, MDBCardHeader, MDBCardImage, MDBCol, MDBContainer, MDBRipple, MDBRow } from 'mdb-react-ui-kit';

export default function Album(props) {
  const [artistN, setArtistN] = useState('');
  const [cover, setCover] = useState('');
  const [musics, setMusics] = useState([]);
  const [album, setAlbum] = useState('');
  const [favoriteList, setFavoriteList] = useState([]);

  useEffect(() => {
    musicFetch();
  }, []);

  const musicFetch = async () => {
    const { match } = props;
    const { id } = match.params;
    const musicList = await getMusics(id);
    const musicArray = [...musicList];
    const favoriteList = await getFavoriteSongs();
    setMusics(musicArray);
    setFavoriteList(favoriteList);
    setArtistN(musicArray.shift().artistName);
    setCover(musicList[0].artworkUrl100);
    setAlbum(musicList[0].collectionName);
  };

  return (
    <div>
    <Header />
    <MDBContainer className="my-5">
      <MDBCard>
        <MDBRow>
          <MDBCol>
            <MDBCardBody className='d-flex flex-column align-items-center'>
                <MDBCardHeader>
                  { artistN } - { album }
                </MDBCardHeader>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
    <MDBContainer className="my-5">
      <MDBCard className='d-flex flex-column align-items-center'>
        <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
          <MDBCardImage src={ cover } fluid alt={ artistN } />
          <a>
            <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
          </a>
        </MDBRipple>

        { musics.map((music) => (
        <MusicCard
          key={ music.artistId }
          trackName={ music.trackName }
          previewUrl={ music.previewUrl }
          trackId={ music.trackId }
          favoriteList={ favoriteList.some((fav) => fav.trackId === music.trackId) }
        />
      )) }

      </MDBCard>
    </MDBContainer>
    
  </div>
    );
  }

Album.propTypes = {
  match: PropTypes.object,
  params: PropTypes.object,
}.isRequired;
