import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import { IndexPageTemplate } from './all-template-exports';

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

