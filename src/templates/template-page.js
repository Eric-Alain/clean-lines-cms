import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { Container, Row, Col } from 'react-bootstrap';
import PreviewCompatibleImage from '../components/PreviewCompatibleImage';
import MarkdownContent from '../components/MarkdownContent';
import Layout from '../components/Layout';

const TemplatePageTemplate = ({ title, templatePageSections }) => {
  const [templatePageSectionsState, setTemplatePageSectionsState] = useState(templatePageSections);

  const renderElements = (obj, image, t1, t2) => {
    //If an image is returned at all
    if (image !== null) {
      /**************************/
      /*CONDITIONS FOR PREVIEWER*/
      /**************************/
      // If user filled both body fields, but also added an image
      if (t2.length > 0 && image.path !== 'empty.svg') {
        return (
          // Concatenate the fields in a single column and insert the image
          <Col>
            {image ? <PreviewCompatibleImage imageInfo={obj} /> : null}
            <MarkdownContent content={`${t1}\n\n${t2}`} className='markdown-content' />
          </Col>
        );
      } else if (t2.length > 0 && image.path === 'empty.svg') {
        return (
          // Make content into a two column format without an image
          <>
            <Col xs='12' md='6'>
              <MarkdownContent content={t1} className='markdown-content' />
            </Col>
            <Col xs='12' md='6'>
              <MarkdownContent content={t2} className='markdown-content' />
            </Col>
          </>
        );
      } else {
        return (
          // Otherwise, single column with a floated image if one exists (the default)
          <Col>
            {image ? <PreviewCompatibleImage imageInfo={obj} /> : null}
            <MarkdownContent content={t1} className='markdown-content' />
          </Col>
        );
      }
    } else {
      /********************************/
      /*CONDITIONS FOR PLAIN COMPONENT*/
      /********************************/
      if (t2.length > 0) {
        return (
          // Make content into a two column format without an image
          <>
            <Col xs='12' md='6'>
              <MarkdownContent content={t1} className='markdown-content' />
            </Col>
            <Col xs='12' md='6'>
              <MarkdownContent content={t2} className='markdown-content' />
            </Col>
          </>
        );
      } else {
        return (
          <Col>
            <MarkdownContent content={t1} className='markdown-content' />
          </Col>
        );
      }
    }
  };

  const renderSections = useCallback(() => {
    return templatePageSectionsState.templateSection.map((item, i) => {
      const HTag = `${item.headingLevel}`;
      return (
        <Col xs='12' key={i}>
          <section>
            <HTag id={item.id}>{item.subheading}</HTag>
            <Row>{renderElements(item, item.image, item.text, item.extraText)}</Row>
          </section>
        </Col>
      );
    });
  }, [templatePageSectionsState]);

  useEffect(() => {
    setTemplatePageSectionsState(templatePageSections);
    renderSections();
  }, [templatePageSections, renderSections]);

  return (
    <main>
      <Container>
        <h1 className='display-3 fw-bold mb-2 pb-2 border-bottom'>{title}</h1>
        <Row>{renderSections()}</Row>
      </Container>
    </main>
  );
};

TemplatePageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  templatePageSections: PropTypes.shape({
    templateSection: PropTypes.arrayOf(
      PropTypes.shape({
        subheading: PropTypes.string,
        headingLevel: PropTypes.string,
        id: PropTypes.string,
        image: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
        alt: PropTypes.string,
        imageFloat: PropTypes.string,
        imageWidth: PropTypes.string,
        text: PropTypes.string,
        extraText: PropTypes.string
      })
    )
  })
};

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

export const templatePageQuery = graphql`
  query templatePageQuery($id: String!) {
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
