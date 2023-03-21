import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBInput
}
from 'mdb-react-ui-kit';

function NewLogin({ userName, handleInputChange, loginBtnClick, loading }) {
  if (loading) {
    return <Loading />;
  }

  return (
    <MDBContainer className="my-5">

      <MDBCard>
        <MDBRow>

          <MDBCol>
            <MDBCardBody className='d-flex flex-column align-items-center'>

              <div className='d-flex flex-row mt-2'>
                <span className="h1 fw-bold mb-0">
                  <img src="Captura de tela de 2023-03-20 19-25-59.png" alt="logo" />
                </span>
              </div>

              <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>Acesse a sua conta</h5>

                <MDBInput 
                  wrapperClass='mb-4' 
                  label='Digite seu nome' 
                  id='formControlLg' 
                  type='text' 
                  size="lg"
                  value={ userName }
                  onChange={ handleInputChange }
                />

              <MDBBtn 
                className="mb-4 px-5" 
                color='dark' 
                size='lg'
                onClick={ loginBtnClick }
                >
                  Login
              </MDBBtn>

              <div className='d-flex flex-row justify-content-start'>
                <a href="#!" className="small text-muted me-1">Terms of use.</a>
                <a href="#!" className="small text-muted">Privacy policy</a>
              </div>

            </MDBCardBody>
          </MDBCol>

        </MDBRow>
      </MDBCard>

    </MDBContainer>
  );
}

NewLogin.propTypes = {
  userName: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  loginBtnClick: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};


export default NewLogin;
