import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { Container, Row, Col } from 'react-bootstrap';
import Layout from '../components/Layout';
import Sections from '../components/Sections';
import MarkdownContent from '../components/MarkdownContent';

const IndexPageTemplate = ({ landingBox, catchyBanner, pageSections }) => {
  return (
    <Container fluid>
      <Row>
        <Col
          xs='12'
          className='full-width-image'
          style={{
            backgroundImage: `url(${!!landingBox.image.childImageSharp ? landingBox.image.childImageSharp.fluid.src : landingBox.image})`
          }}
        >
          <Row className='justify-content-center mx-2 mx-sm-auto'>
            <Col xs='10' className='hero-text text-center p-4'>
              <h1 className='display-2'>{landingBox.title}</h1>
              <h3 className='text-muted fw-normal'>{landingBox.subheading}</h3>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className='dbo-red justify-content-center catchy-banner'>
        <Col xs='10' md='6'>
          <MarkdownContent content={catchyBanner.body} className='markdown-content' />
        </Col>
      </Row>
      <Row>
        <Sections pageSections={pageSections} />
      </Row>
    </Container>
  );
};

IndexPageTemplate.propTypes = {
  landingBox: PropTypes.shape({
    image: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
    title: PropTypes.string,
    subheading: PropTypes.string
  }),
  catchyBanner: PropTypes.shape({
    body: PropTypes.string
  }),
  pageSections: PropTypes.shape({
    section: PropTypes.arrayOf(
      PropTypes.shape({
        buttonLocation: PropTypes.string,
        buttonText: PropTypes.string,
        image: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
        subheading: PropTypes.string,
        text: PropTypes.string
      })
    )
  })
};

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <IndexPageTemplate landingBox={frontmatter.landingBox} catchyBanner={frontmatter.catchyBanner} pageSections={frontmatter.pageSections} />
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object
    })
  })
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        landingBox {
          image
          title
          subheading
        }
        catchyBanner {
          body
        }
        pageSections {
          section {
            image
            subheading
            text
            buttonText
            buttonLocation
          }
        }
      }
    }
  }
`;
