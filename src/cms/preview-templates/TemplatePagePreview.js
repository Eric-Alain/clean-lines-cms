import React from 'react';
import PropTypes from 'prop-types';
import TemplatePageTemplate from '../../templates/template-page';

const TemplatePagePreview = ({ entry, getAsset }) => {
  if (entry) {
    const data = entry.getIn(['data']) ? entry.getIn(['data']).toJS() : {};
    //console.log(getAsset(data.templatePageSections.templateSection[0].image.toString()));
    let templateSection = [];

    if (data.hasOwnProperty('templatePageSections')) {
      templateSection = data.templatePageSections.templateSection.map((sec) => ({
        subheading: sec.subheading || '',
        headingLevel: sec.headingLevel || '',
        id: sec.id || '',
        image: getAsset(sec.image.toString()) || null,
        alt: sec.alt || '',
        imageFloat: sec.imageFloat || '',
        imageWidth: sec.imageWidth || '',
        text: sec.text || '',
        extraText: sec.extraText || ''
      }));
    }

    return (
      <TemplatePageTemplate
        title={entry.getIn(['data', 'title'])}
        templatePageSections={{
          templateSection: templateSection
        }}
      />
    );
  } else {
    return <div>Loading...</div>;
  }
};

TemplatePagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func
  }),
  widgetFor: PropTypes.func
};

export default TemplatePagePreview;
