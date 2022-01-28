import React from 'react';
//import PropTypes from 'prop-types';
import PreviewCompatibleImage from './PreviewCompatibleImage';
import { /*Row*/ Col, Card } from 'react-bootstrap';
//import { Link } from 'gatsby';

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

  return (
    <>
      <Col xs='12' lg='4' className='mb-3'>
        <Card className='rounded-0 p-0 p-md-4'>
          <Card.Body>
            <Card.Title>
              <h3 className='mb-1 pb-1 border-bottom'>{slugToString(galleries.name) || ''}</h3>
            </Card.Title>
            {galleries.galleries.map((item, i) => {
              return item.map((inner, j) => {
                return (
                  <div className={`stack-${i}`} key={j}>
                    <PreviewCompatibleImage
                      imageInfo={{
                        image: inner,
                        className: 'w-100'
                      }}
                    />
                  </div>
                );
              });              
            })}
            <div className='zoom-overlay'></div>
          </Card.Body>
        </Card>
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
