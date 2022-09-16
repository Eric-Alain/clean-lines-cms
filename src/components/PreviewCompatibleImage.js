import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { adjustForCloudinary } from '../utils';

const PreviewCompatibleImage = ({ imageInfo, dfltHeight = 'auto', dfltWidth = 'auto' }) => {
  const getFloatClass = (float) => {
    switch (float) {
      case 'Left':
        return 'float-start me-3 mb-3';
      case 'Right':
        return 'float-end ms-3 mb-3';
      default:
        return null;
    }
  };

  const getWidthClass = (width) => {
    switch (width) {
      case '25%':
        return 'w-100 w-md-25';
      case '50%':
        return 'w-100 w-md-50';
      case '75%':
        return 'w-100 w-md-75';
      default:
        return null;
    }
  };

  const image = adjustForCloudinary(imageInfo.image.toString(), 500, 'webp');

  /*Destructed object  variable assignment*/
  const { alt = '', imageFloat = null, imageWidth = null, className = null } = imageInfo;

  /*States, for changes in CMS*/
  const [float, setFloat] = useState(getFloatClass(imageFloat));
  const [width, setWidth] = useState(getWidthClass(imageWidth));

  useEffect(() => {
    setFloat(getFloatClass(imageFloat));
    setWidth(getWidthClass(imageWidth));
  }, [imageInfo, imageFloat, imageWidth]);

  if (!!image && !!image.childImageSharp) {
    return (
      <GatsbyImage height={dfltHeight} width={dfltWidth} image={getImage(image)} alt={alt} className={`${float ? `${float} ` : ''}${width ? `${width} ` : ''}${className ? `${className} ` : ''}`} />
    );
  }

  //For cloudinary images
  else if (!!image && !!/https.*?cloudinary/.test(image)) {
    return (
      <img src={image} height={dfltHeight} width={dfltWidth} alt={alt} className={`${float ? `${float} ` : ''}${width ? `${width} ` : ''}${className ? `${className} ` : ''}gatsby-image-wrapper`} />
    );
  }
  return null;
};

PreviewCompatibleImage.propTypes = {
  dfltHeight: PropTypes.string,
  dfltWidth: PropTypes.string,
  imageInfo: PropTypes.shape({
    alt: PropTypes.string,
    childImageSharp: PropTypes.object,
    image: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]).isRequired,
    style: PropTypes.object
  }).isRequired
};

export default PreviewCompatibleImage;
