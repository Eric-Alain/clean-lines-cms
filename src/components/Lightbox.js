import React from 'react';
import PropTypes from 'prop-types';
import ReactGridGallery from 'react-grid-gallery';
import { adjustForCloudinary, testArrayForObjects } from '../utils'; 

const Lightbox = ({ gallery }) => {

  const createImageArray = (data) => {
    const arr = testArrayForObjects(data.images);
    return data.images.map((item) => {
      return {
        src: arr ? adjustForCloudinary(item.url, 900, 'webp') : adjustForCloudinary(item, 900, 'webp'),
        thumbnail: arr ? adjustForCloudinary(item.url, 900, 'webp') : adjustForCloudinary(item, 900, 'webp'),
        nano: arr ? adjustForCloudinary(item.url, 900, 'webp') : adjustForCloudinary(item, 900, 'webp'),
        thumbnailWidth: 320,
        thumbnailHeight: 180
      };
    });
  };

  return (
    <>
      <p className='lead'>{gallery.description}</p>
      <ReactGridGallery images={createImageArray(gallery)} enableImageSelection={false} backdropClosesModal={true} />
    </>
  );
};

Lightbox.propTypes = {
  gallery: PropTypes.shape({
    description: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object]))
  })
};

export default Lightbox;
