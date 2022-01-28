import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

const PreviewCompatibleImage = ({ imageInfo }) => {
  const getFloatClass = (float) => {
    switch (float) {
      case 'Left':
        return 'float-start me-3 mb-3';
      case 'Right':
        return 'float-end ms-3 mb-3';
      default:
        return '';
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
        return '';
    }
  };
  /*Modify Cloudinary urls if provided in order to optimize them (size, performance, format, cropping etc)*/
  const adjustForCloudinary = (str) => {
    if (/https.*?cloudinary/.test(str)) {
      return str.replace(/^(.*?upload\/)(.*?)(\.jpg)$/, '$1c_mfit,c_scale,f_auto,q_auto:eco,w_900/$2.webp');
    } else {
      return str;
    }
  };
  const image = adjustForCloudinary(imageInfo.image.toString());

  /*Destructed object  variable assignment*/
  const { alt = '', imageFloat, imageWidth, className } = imageInfo;

  /*States,  for changes in CMS*/
  const [float, setFloat] = useState(getFloatClass(imageFloat));
  const [width, setWidth] = useState(getWidthClass(imageWidth));

  useEffect(() => {
    setFloat(getFloatClass(imageFloat));
    setWidth(getWidthClass(imageWidth));
  }, [imageInfo, imageFloat, imageWidth]);

  if (!!image && !!image.childImageSharp) {
    return <GatsbyImage image={getImage(image)} className={`${float} ${width} ${className} rounded`} alt={alt} />;
  }

  //For cloudinary images
  else if (!!image && !!/https.*?cloudinary/.test(image)) {
    return <img src={image} alt={alt} className={`${float} ${width} ${className} rounded gatsby-image-wrapper`} />;
  }

  return null;
};

PreviewCompatibleImage.propTypes = {
  imageInfo: PropTypes.shape({
    alt: PropTypes.string,
    childImageSharp: PropTypes.object,
    image: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]).isRequired,
    style: PropTypes.object
  }).isRequired
};

export default PreviewCompatibleImage;
