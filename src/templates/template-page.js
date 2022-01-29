import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import { TemplatePageTemplate } from './all-template-exports';

const TemplatePage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;
  return (
    <Layout>
      <TemplatePageTemplate title={frontmatter.title} templatePageSections={frontmatter.templatePageSections} />
    </Layout>
  );
};

TemplatePage.propTypes = {
  data: PropTypes.object.isRequired
};

export default TemplatePage;

export const TemplatePageQuery = graphql`
  query TemplatePageQuery($id: String!) {
    markdownRemark(id: { eq: $id }, frontmatter: { templateKey: { eq: "template-page" } }) {
      frontmatter {
        title
        templatePageSections {
          templateSection {
            subheading
            headingLevel
            id
            alt
            image
            imageFloat
            imageWidth
            text
            extraText
          }
        }
      }
    }
  }
`;
