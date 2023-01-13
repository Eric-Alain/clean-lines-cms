import React, { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'gatsby';
import { kebabCase } from 'lodash';
import PropTypes from 'prop-types';
import Content from '../components/Content';
import Lightbox from '../components/Lightbox';
import MarkdownContent from '../components/MarkdownContent';
import PreviewCompatibleImage from '../components/PreviewCompatibleImage';
import Sections from '../components/Sections';
import { adjustForCloudinary } from '../utils';

/******/
/*BLOG*/
/******/
export const BlogPostTemplate = ({ content, contentComponent, description, tags, title, helmet }) => {
  const PostContent = contentComponent || Content;
  return (
    <Container className='my-5'>
      {helmet || ''}
      <Row>
        <Col xs='12'>
          <h1>{title}</h1>
          <p>{description}</p>
          <PostContent content={content} />
          {tags && tags.length ? (
            <div class='tag'>
              <h4 class='mt-5 mb-1'>Tags</h4>
              {tags.map((tag, i) => {
                return (
                  <span key={tag + `tag`}>
                    <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                    {i !== tags.length - 1 ? ', ' : null}
                  </span>
                );
              })}
            </div>
          ) : null}
        </Col>
      </Row>
    </Container>
  );
};

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  tag: PropTypes.array,
  title: PropTypes.string,
  helmet: PropTypes.object
};

/**************/
/*GALLERY PAGE*/
/**************/
export const GalleryPageTemplate = ({ title, gallery }) => {
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

/************/
/*INDEX PAGE*/
/************/
export const IndexPageTemplate = ({ landingBox, catchyBanner, pageSections }) => {
  return (
    <Container fluid>
      <Row>
        <Col
          xs='12'
          className='full-width-image'
          style={{
            backgroundImage: `url(${
              !!landingBox.image.childImageSharp
                ? adjustForCloudinary(landingBox.image.childImageSharp.fluid.src.toString(), 2400, 'webp')
                : adjustForCloudinary(landingBox.image.toString(), 2400, 'webp')
            })`
          }}
        >
          <Row className='justify-content-center mx-2 mx-sm-auto'>
            <Col xs='10' className='hero-text text-center p-4'>
              <h1 className='display-2'>{landingBox.title}</h1>
              <p className='h3 text-muted fw-normal'>{landingBox.subheading}</p>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className='justify-content-center catchy-banner'>
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

/***************/
/*TEMPLATE PAGE*/
/***************/
export const TemplatePageTemplate = ({ title, templatePageSections }) => {
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
            {image ? <PreviewCompatibleImage imageInfo={obj} dfltWidth='650' dfltHeight='433' /> : null}
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
            {image ? <PreviewCompatibleImage imageInfo={obj} dfltWidth='650' dfltHeight='433' /> : null}
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
  title: PropTypes.string,
  templatePageSections: PropTypes.shape({
    templateSection: PropTypes.arrayOf(
      PropTypes.shape({
        alt: PropTypes.string,
        extraText: PropTypes.string,
        headingLevel: PropTypes.string,
        id: PropTypes.string,
        image: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
        imageFloat: PropTypes.string,
        imageWidth: PropTypes.string,
        subheading: PropTypes.string,
        text: PropTypes.string
      })
    )
  })
};
