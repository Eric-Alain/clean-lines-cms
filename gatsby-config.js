module.exports = {
  siteMetadata: {
    title: 'Clean lines CMS',
    description:
      'This repo contains an example business website that is built with Gatsby, and Netlify CMS. It follows the JAMstack architecture by using Git as a single source of truth, and Netlify for continuous deployment, and CDN distribution.'
  },
  flags: {
    //PRESERVE_FILE_DOWNLOAD_CACHE: true,
    PARALLEL_SOURCING: true,
    FAST_DEV: true
  },
  plugins: [
    {
      resolve: `gatsby-plugin-csp`,
      options: {
        mergeScriptHashes: false,
        mergeStyleHashes: false,
        directives: {
          'script-src': `'self' 'unsafe-inline' https://*.netlify.com`,
          'style-src': `'self' 'unsafe-inline'`,
          'img-src': `'self' https://*.cloudinary.com`,
          'media-src': `'self' https://*.cloudinary.com`,
          'font-src': `'self' data: https://*.fontawesome.com`
        }
      }
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Clean lines CMS`,
        short_name: `CL-CMS`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#4904a4`,
        display: `minimal-ui`,
        icon: `./src/img/logo.png`,
        icon_options: {
          purpose: `any maskable`
        },
        crossOrigin: `use-credentials`
      }
    },
    `gatsby-plugin-remove-serviceworker`,
    `gatsby-plugin-sass`,
    {
      // keep as first gatsby-source-filesystem plugin for gatsby image support
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/img`,
        name: 'uploads'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/img`,
        name: 'images'
      }
    },
    `gatsby-plugin-image`,
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-relative-images',
            options: {
              name: 'uploads'
            }
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 2048
            }
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              destinationDir: 'static'
            }
          }
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`
      }
    },
    {
      resolve: 'gatsby-plugin-purgecss', // purges all unused/unreferenced css rules
      options: {
        develop: true, // Activates purging in npm run develop
        printReject: true,
        purgeOnly: ['./src/components/all.scss', 'node_modules/font-awesome/'] // applies purging only on the scss file
      }
    }, // must be after other CSS plugins
    `gatsby-plugin-netlify` // make sure to keep it last in the array
  ]
};
