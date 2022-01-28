import React from 'react'
import { Link } from 'gatsby'
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row className='justify-content-between'>
          <Col xs='12' sm='6' lg='8' className='mb-4'>
            <h3>Company name</h3>
            <p>
              Street name
              <br />
              City, Province/State Postal/Zip code
              <br />
              Country
            </p>
            <p>
              <Link to='/contact'>Contact us</Link>
            </p>
          </Col>
          <Col xs='12' sm='auto' className='mb-4'>
            <h3>Follow</h3>
            <p>
              <a href='#a'>Facebook</a>
              <br />
              <a href='#a'>Instagram</a>
              <br />
              <a href='#a'>Twitter</a>
              <br />
              <a href='#a'>Youtube</a>
            </p>
          </Col>
          <Col xs='12' sm='auto' className='mb-4'>
            <h3>Related</h3>
            <p>
              <a href='#a'>Related 1</a>
              <br />
              <a href='#a'>Related 2</a>
              <br />
              <a href='#a'>Related 3</a>
              <br />
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer