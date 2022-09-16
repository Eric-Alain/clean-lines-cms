import React from 'react';
import PropTypes from 'prop-types';
import PreviewCompatibleImage from './PreviewCompatibleImage';
import { Col, Card } from 'react-bootstrap';
import { Link } from 'gatsby';
import { slugToString } from '../utils';

const HexGrid = ({ galleries }) => {
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
                        dfltWidth='366'
                        dfltHeight='244'
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

HexGrid.propTypes = {
  name: PropTypes.string,
  galleries: PropTypes.arrayOf(PropTypes.string)
};

export default HexGrid;
