import React from 'react';
import Layout from '../../components/Layout';
import BlogRoll from '../../components/BlogRoll';
import { Container, Row, Col } from 'react-bootstrap';

const BlogIndexPage = () => {
  return (
    <Layout>
      <Container fluid className='blog-banner mb-3'>
        <Container>
          <Row>
            <Col xs='12'>
              <h1 className='my-0 pt-2 pb-3'>Latest Stories</h1>
            </Col>
          </Row>
        </Container>
      </Container>
      <Container>
        <Row>
          <BlogRoll />
        </Row>
      </Container>
    </Layout>
  );
};

export default BlogIndexPage;
