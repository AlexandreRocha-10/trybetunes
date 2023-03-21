import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import { MDBCard, MDBCardBody, MDBCardText, MDBCol, MDBRow } from 'mdb-react-ui-kit';

export default function MusicCard(props) {
  const [checked, setChecked] = useState(false);

  async function isFavorite({ target }) {
    const { checked } = target;
    setChecked(checked);

    if (checked) {
      await addSong(props);
    } else {
      await removeSong(props);
    }

  }

  const { trackName, previewUrl, favoriteList } = props;

  return (
    <div>
      <MDBCard>
        <MDBRow>
          <MDBCol>
            <audio src={previewUrl} controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento. <code>audio</code>
            </audio>
          </MDBCol>
          <MDBCol>
            <MDBCardBody>
              <MDBCardText>
                <span>{ trackName }</span>
              </MDBCardText>
            </MDBCardBody>
          </MDBCol>
          <MDBCol>
            <MDBCardBody>
              <MDBCardText>
                <label htmlFor="favoriteSong">
                  Favorita
                  <input
                    type="checkbox"
                    id="favoriteSong"
                    checked={checked || favoriteList}
                    name="favoriteSong"
                    onChange={isFavorite}
                  />
                </label>
              </MDBCardText>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </div>
  );
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.string.isRequired,
  favoriteList: PropTypes.bool.isRequired,
};
