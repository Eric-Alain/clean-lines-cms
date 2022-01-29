import React from 'react'
import PropTypes from 'prop-types'
import { IndexPageTemplate } from '../../templates/all-template-exports';

const IndexPagePreview = ({ entry, getAsset }) => {
  if (entry) {
    return (
      <IndexPageTemplate
        landingBox={{
          image: entry.getIn(['data', 'landingBox', 'image']).toJS(),
          title: entry.getIn(['data', 'landingBox', 'title']),
          subheading: entry.getIn(['data', 'landingBox', 'subheading'])
        }}
        catchyBanner={{
          body: entry.getIn(['data', 'catchyBanner', 'body'])
        }}
        pageSections={{
          section: entry.getIn(['data', 'pageSections', 'section']).toJS()
        }}
      />
    );
  } else {
    return <div>Loading...</div>;
  }
};

IndexPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
}

export default IndexPagePreview
