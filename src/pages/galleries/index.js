import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { Container, Row, Col } from 'react-bootstrap';
import Layout from '../../components/Layout';
import HexGrid from '../../components/HexGrid';

const GalleryLandingIndexPage = ({ data }) => {
  const getGalleries = data.allFile.edges.map((i) => {
    return {
      name: i.node.name,
      images: i.node.childrenMarkdownRemark.map((j) => {
        return j.frontmatter.gallery.images.slice(0, 5);
      })
    };
  });

  const renderHexGrid = (array) => {
    return array.map((item, i) => {
      return <HexGrid galleries={item} key={i} />;
    });
  };

  return (
    <Layout>
      <Container className='my-5'>
        <Row>
          <h1 className='display-3 fw-bold mb-2 pb-2 border-bottom'>All galleries</h1>
          <Col xs='auto' className='mt-5'>
            <p className='lead'>Describe put a cool description of your galleries if you want. Describe what the user might expect to find here.</p>
          </Col>
        </Row>
        <Row className='justify-content-center'>{renderHexGrid(getGalleries)}</Row>
      </Container>
    </Layout>
  );
};

GalleryLandingIndexPage.propTypes = {
  data: PropTypes.shape({
    allFile: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            childrenMarkdownRemark: PropTypes.array,
            name: PropTypes.string,
            relativePath: PropTypes.string
          })
        })
      )
    })
  })
};

export default GalleryLandingIndexPage;

//Galleries sorted by creation time, you can change to whatever floats your boat
export const GalleryLandingQuery = graphql`
  query galleryLandingQuery {
    allFile(filter: { relativeDirectory: { regex: "/.*?galleries.*?/" }, extension: { glob: "*md" } }, sort: { fields: birthTime }) {
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
