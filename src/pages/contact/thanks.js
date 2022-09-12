import React from 'react'
import Layout from '../../components/Layout'
import { Container, Row, Col } from 'react-bootstrap';

const Thanks = () => (
  <Layout>
    <Container className="my-5">
      <Row>
        <Col xs='12'>
          <h1>Thank you!</h1>
          <p>Your submission was received. Insert a generic message about what user could expect here.</p>
        </Col>
      </Row>
    </Container>    
  </Layout>
);

export default Thanks;