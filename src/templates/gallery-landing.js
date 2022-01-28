import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { Container, Row, Col } from 'react-bootstrap';
import Thumbnails from '../components/Thumbnails';
import Layout from '../components/Layout';

const GalleryLandingPageTemplate = ({ title, description, galleries }) => {
  const getGalleries = galleries.edges.map((item) => {
    return {
      name: item.node.name,
      galleries: item.node.childrenMarkdownRemark.map((item2) => {
        return item2.frontmatter.gallery.images.slice(0, 3);
      })
    };
  });

  const renderThumbnails = (array) => {
    return array.map((item, i) => {
      return <Thumbnails galleries={item} key={i} />;
    });
  };

  return (
    <main>
      <Container>
        <Row className=''>
          <h1 className='display-3 fw-bold mb-2 pb-2 border-bottom'>{title}</h1>
          <Col xs='auto' className='mt-5'>
            <p className='lead'>{description}</p>
          </Col>
        </Row>
        <Row className='justify-content-center'>{renderThumbnails(getGalleries)}</Row>
      </Container>
    </main>
  );
};

GalleryLandingPageTemplate.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string
};

const GalleryLandingPage = ({ data }) => {
  const { frontmatter } = data.cms;
  return (
    <Layout>
      <GalleryLandingPageTemplate title={frontmatter.title} description={frontmatter.description} galleries={data.galleries} />
    </Layout>
  );
};

//Galleries sorted by creation time, you can change to whatever floats your boat
export const GalleryLandingQuery = graphql`
  query galleryLandingQuery($id: String!) {
    cms: markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        description
      }
    }
    galleries: allFile(filter: { relativeDirectory: { regex: "/.*?galleries.*?/" }, extension: { glob: "*md" } }, sort: { fields: birthTime }) {
      edges {
        node {
          name
          relativePath
          childrenMarkdownRemark {
            frontmatter {
              gallery {
                images
              }
            }
          }
        }
      }
    }
  }
`;

export default GalleryLandingPage;
