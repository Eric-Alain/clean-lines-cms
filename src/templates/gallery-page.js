import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { Container, Row, Col } from 'react-bootstrap';
import Layout from '../components/Layout';
import Lightbox from '../components/Lightbox';

const GalleryPageTemplate = ({ title, gallery }) => {
  const [galleryState, setGalleryState] = useState({
    images: gallery.images,
    description: gallery.description
  });

  useEffect(() => {
    setGalleryState({
      images: gallery.images,
      description: gallery.description
    });
  }, [gallery]);

  return (
    <main>
      <Container>
        <Row className='justify-content-center'>
          <h1 className='display-3 fw-bold mb-2 pb-2 border-bottom'>{title}</h1>
          <Col xs='auto' className='mt-5'>
            <Lightbox gallery={galleryState} />
          </Col>
        </Row>
      </Container>
    </main>
  );
};

GalleryPageTemplate.propTypes = {
  gallery: PropTypes.shape({
    title: PropTypes.string,
    images: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.string])
  })
};

const GalleryPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <GalleryPageTemplate title={frontmatter.title} gallery={frontmatter.gallery} />
    </Layout>
  );
};

GalleryPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object
    })
  })
};

export default GalleryPage;

export const GalleryQuery = graphql`
  query GalleryPageTemplate($id: String!) {
    markdownRemark(id: { eq: $id }) {
      fields {
        slug
      }
      frontmatter {
        title
        gallery {
          images
          description
        }
      }
    }
  }
`;
