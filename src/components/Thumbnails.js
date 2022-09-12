import React from 'react';
//import PropTypes from 'prop-types';
import PreviewCompatibleImage from './PreviewCompatibleImage';
import { /*Row*/ Col, Card } from 'react-bootstrap';
import { Link } from 'gatsby';

const Thumbnails = ({ galleries }) => {
  //Helper function - convert slugs to sentence cased strings
  const slugToString = (str) =>
    str
      .toLowerCase()
      .split('-')
      .map((i) => i[0].toUpperCase() + i.substr(1))
      .join(' ')
      .replace(/(^\w{1}|\.\s*\w{1})/gi, (replaced) => {
        return replaced.toUpperCase();
      });
  console.log(galleries.name);
  return (
    <>
      <Col xs='12' sm='6' xl='4' className='mb-3 hex-thumbnail'>
        <Link to={`/galleries/${galleries.name}`}>
          <Card className='rounded-0 p-0 px-md-4 py-md-2'>
            <Card.Body>
              <Card.Title>
                <h3 className='mb-1 pb-1 border-bottom'>{slugToString(galleries.name) || ''}</h3>
              </Card.Title>
              {galleries.galleries.map((item, i) => {
                return item.map((inner, j) => {
                  return (
                    <div className={`stack-${j} gallery-landing-img-container`} key={j}>
                      <PreviewCompatibleImage
                        imageInfo={{
                          image: inner,
                          className: 'gallery-landing-img'
                        }}
                      />
                    </div>
                  );
                });
              })}
              <div className='zoom-overlay'></div>
            </Card.Body>
          </Card>
        </Link>
      </Col>
    </>
  );
};
/*
Thumbnails.propTypes = {
  section: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.object,
      subheading: PropTypes.string,
      text: PropTypes.string
    })
  )
};*/

export default Thumbnails;
