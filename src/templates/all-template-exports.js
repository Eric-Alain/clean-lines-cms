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
import Thumbnails from '../components/Thumbnails';

/******/
/*BLOG*/
/******/
export const BlogPostTemplate = ({ content, contentComponent, description, tags, title, helmet }) => {
  const PostContent = contentComponent || Content;
  return (
    <section className='section'>
      {helmet || ''}
      <div className='container content'>
        <div className='columns'>
          <div className='column is-10 is-offset-1'>
            <h1 className='title is-size-2 has-text-weight-bold is-bold-light'>{title}</h1>
            <p>{description}</p>
            <PostContent content={content} />
            {tags && tags.length ? (
              <div style={{ marginTop: `4rem` }}>
                <h4>Tags</h4>
                <ul className='taglist'>
                  {tags.map((tag) => (
                    <li key={tag + `tag`}>
                      <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object
};

/**********************/
/*GALLERY LANDING PAGE*/
/**********************/
export const GalleryLandingPageTemplate = ({ title, description, galleries }) => {
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
