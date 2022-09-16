import React from 'react';
import PropTypes from 'prop-types';
import PreviewCompatibleImage from './PreviewCompatibleImage';
import { Row, Col, Card } from 'react-bootstrap';
import { Link } from 'gatsby';

const Sections = ({ pageSections }) => {   
  return (
    <>
      {pageSections.section.map((section, i) => (
        <Col xs='12' className='landing-sections' key={i}>
          <section className={`section-${i % 2 === 0 ? 'left' : 'right'}`}>
            <Row className='justify-content-center'>
              <Col xs='8' className='py-5 mb-5 mb-md-auto'>
                <PreviewCompatibleImage imageInfo={section} dfltWidth="650" dfltHeight="433"/>
                <Card className='section-card rounded-0 p-0 p-md-4'>
                  <Card.Body>
                    <Card.Title>
                      <h3 className='mb-1 pb-1 border-bottom'>{section.subheading}</h3>
                    </Card.Title>
                    <Card.Text>{section.text}</Card.Text>
                    <Link className='btn' to={section.buttonLocation}>
                      {section.buttonText}
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </section>
        </Col>
      ))}
    </>
  );
};

Sections.propTypes = {
  section: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.object,
      subheading: PropTypes.string,
      text: PropTypes.string
    })
  )
};

export default Sections;
