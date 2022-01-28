import CMS from 'netlify-cms-app'
import cloudinary from 'netlify-cms-media-library-cloudinary'

import BlogPostPreview from './preview-templates/BlogPostPreview';
import IndexPagePreview from './preview-templates/IndexPagePreview';
import GalleryLandingPagePreview from './preview-templates/GalleryLandingPagePreview';
import GalleryPagePreview from './preview-templates/GalleryPagePreview';
import TemplatePagePreview from './preview-templates/TemplatePagePreview';

CMS.registerMediaLibrary(cloudinary);

// Note about .registerPreviewTemplate('name', component)
// Make sure that the 'name' argument matches the collections 'name' field in the cms config.yml file
// Otherwise, the preview template won't register

CMS.registerPreviewTemplate('landing-page', IndexPagePreview);
CMS.registerPreviewTemplate('gallery-landing', GalleryLandingPagePreview);
CMS.registerPreviewTemplate('gallery-pages', GalleryPagePreview);
CMS.registerPreviewTemplate('template-pages', TemplatePagePreview);
CMS.registerPreviewTemplate('blog', BlogPostPreview);

