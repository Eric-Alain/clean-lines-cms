import React from 'react';
import PropTypes from 'prop-types';
import { GalleryPageTemplate } from '../../templates/all-template-exports';

const GalleryPagePreview = ({ entry, getAsset }) => {
  if (entry) {
    let data = entry.getIn(['data']).toJS();

    const mapGallery = (obj) => {
      if (obj.gallery.images) {
        return obj.gallery.images.map((item) => getAsset(item));
      } else {
        return [''];
      }
    };

    return (
      <GalleryPageTemplate
        title={data.title}
        gallery={{
          images: mapGallery(data),
          description: data.gallery.description ? data.gallery.description : 'Add description here'
        }}
      />
    );
  } else {
    return <div>Loading...</div>;
  }
};

GalleryPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func
  }),
  getAsset: PropTypes.func
};

export default GalleryPagePreview;
