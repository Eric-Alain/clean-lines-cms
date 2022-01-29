import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import { GalleryLandingPageTemplate } from './all-template-exports';

const GalleryLandingPage = ({ data }) => {
  const { frontmatter } = data.cms;
  return (
    <Layout>
      <GalleryLandingPageTemplate title={frontmatter.title} description={frontmatter.description} galleries={data.galleries} />
    </Layout>
  );
};

export default GalleryLandingPage;

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
