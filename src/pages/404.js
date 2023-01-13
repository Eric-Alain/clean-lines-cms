import React from 'react';
import { Link } from 'gatsby';
import Layout from '../components/Layout';
import { Container, Row, Col } from 'react-bootstrap';

const NotFoundPage = () => (
  <Layout>
    <Container className='my-5'>
      <Row>
        <Col xs='12'>
          <h1>Whoops...</h1>
          <p>You just tried to access a page that doesn't exist.</p>
          <Link to='/'>Go to home page</Link>
        </Col>
      </Row>
    </Container>
  </Layout>
);

export default NotFoundPage;
