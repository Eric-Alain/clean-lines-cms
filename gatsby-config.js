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
    `gatsby-plugin-preact`,
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
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        debug: false,
        precachePages: [`/`]
      }
    },
    `gatsby-plugin-loadable-components-ssr`,
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        implementation: require('sass')
      }
    },
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
      resolve: 'gatsby-plugin-brotli',
      options: {
        extensions: ['css', 'html', 'js', 'svg']
      }
    },
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        printRejected: true,
        purgeCSSOptions: {
          safelist: {
            deep: [
              /___gatsby/,
              /a/,
              /align-items/,
              /align-self/,
              /bg/,
              /blog-banner/,
              /blogroll-img-container/,
              /blogroll-img/,
              /body/,
              /brand/,
              /btn/,
              /card-body/,
              /card/,
              /catchy-banner/,
              /close/,
              /col/,
              /collapsed/,
              /contact/,
              /container/,
              /counter/,
              /d-/,
              /dropdown-menu/,
              /dropdown/,
              /fa-lg/,
              /fa-2x/,
              /fa-3x/,
              /fa-facebook/,
              /fa-instagram/,
              /fa-twitter/,
              /fa-youtube/,
              /fa-bars/,
              /fa-xmark/,
              /flex/,
              /float/,
              /font/,
              /footer/,
              /full-width-image/,
              /gallery-landing-img-container/,
              /gallery-landing-img/,
              /gatsby-image-wrapper/,
              /gatsby/,
              /h-/,
              /h1/,
              /h2/,
              /h3/,
              /h4/,
              /h5/,
              /h6/,
              /hero-text/,
              /hex-thumbnail/,
              /html/,
              /img/,
              /justify-items/,
              /justify-self/,
              /landing-sections/,
              /list-unstyled/,
              /main/,
              /m-/,
              /mt/,
              /mb/,
              /ms/,
              /me/,
              /mx/,
              /my/,
              /nav/,
              /p-/,
              /pt/,
              /pb/,
              /ps/,
              /pe/,
              /px/,
              /py/,
              /ReactGridGallery/,
              /responsive/,
              /row/,
              /section/,
              /shadow/,
              /show/,
              /site-menu/,
              /small/,
              /social-nav/,
              /sr-only/,
              /svg/,
              /tab/,
              /tags/,
              /text/,
              /visually-hidden/,
              /w-/,
              /zoom-overlay/
            ]
          }
        }
      }
    }, // must be after other CSS plugins
    `gatsby-plugin-netlify` // make sure to keep it last in the array
  ]
};
