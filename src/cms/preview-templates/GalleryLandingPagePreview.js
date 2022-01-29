import React from 'react';
import PropTypes from 'prop-types';
import { GalleryLandingPageTemplate } from '../../templates/all-template-exports';

const GalleryLandingPagePreview = ({ entry, getAsset }) => {
  if (entry) {
    return <GalleryLandingPageTemplate title={entry.getIn(['data', 'title'])} description={entry.getIn(['data', 'description'])} />;
  } else {
    return <div>Loading...</div>;
  }
};

GalleryLandingPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func
  }),
  widgetFor: PropTypes.func
};

export default GalleryLandingPagePreview;
