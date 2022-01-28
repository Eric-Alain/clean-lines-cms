import React from 'react';
import PropTypes from 'prop-types';
import ReactGridGallery from 'react-grid-gallery';

const Lightbox = ({ gallery }) => {

  const createImageArray = (data) => {
    const testArrayForObjects = data.images.some((i) => {
      return typeof i === 'object';
    });
    return data.images.map((item) => {
      return {
        src: testArrayForObjects
          ? item.url.replace(/^(.*?upload\/)(.*?)(\.jpg)$/, '$1c_mfit,c_scale,f_auto,q_auto:eco,w_900/$2.webp')
          : item.replace(/^(.*?upload\/)(.*?)(\.jpg)$/, '$1c_mfit,c_scale,f_auto,q_auto:eco,w_900/$2.webp'),
        thumbnail: testArrayForObjects
          ? item.url.replace(/^(.*?upload\/)(.*?)(\.jpg)$/, '$1c_mfit,c_scale,f_auto,q_30,w_500/$2.webp')
          : item.replace(/^(.*?upload\/)(.*?)(\.jpg)$/, '$1c_mfit,c_scale,f_auto,q_30,w_500/$2.webp'),
        nano: testArrayForObjects
          ? item.url.replace(/^(.*?upload\/)(.*?)(\.jpg)$/, '$1c_mfit,c_scale,f_auto,q_25,w_300/$2.webp')
          : item.replace(/^(.*?upload\/)(.*?)(\.jpg)$/, '$1c_mfit,c_scale,f_auto,q_25,w_300/$2.webp'),
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
