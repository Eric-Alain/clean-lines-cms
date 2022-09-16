import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql, StaticQuery } from 'gatsby';
import { Row, Col } from 'react-bootstrap';
import PreviewCompatibleImage from './PreviewCompatibleImage';

export const BlogRoll = ({ data }) => {
  const { edges: posts } = data.allMarkdownRemark;

  return (
    posts &&
    posts.map(({ node: { id, frontmatter, fields, excerpt } }) => {
      return (
        <Col xs='12' key={id} className='mb-3'>
          <article className={`${frontmatter.featuredPost ? 'is-featured' : ''}`}>
            <Row>
              {frontmatter.featuredimage ? (
                <Col xs='12' sm='6' md='3'>
                  <div className='blogroll-img-container mb-2'>
                    <PreviewCompatibleImage
                      imageInfo={{
                        image: frontmatter.featuredimage,
                        alt: `featured image thumbnail for post ${frontmatter.title}`,
                        className: 'blogroll-img'
                      }}
                      dfltWidth='306'
                      dfltHeight='204'
                    />
                  </div>
                </Col>
              ) : null}
              <Col xs='12' sm='6' md='9'>
                <header>
                  <h2 className='mb-0'>{frontmatter.title}</h2>
                  <p>
                    <small>{frontmatter.date}</small>
                  </p>
                </header>
                <p>
                  {excerpt}
                  <br />
                  <Link className='btn btn-theme mt-2' to={fields.slug}>
                    Keep Reading →
                  </Link>
                </p>
              </Col>
            </Row>
          </article>
        </Col>
      );
    })
  );
};

BlogRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array
    })
  })
};

const BlogRollQuery = () => (
  <StaticQuery
    query={graphql`
      query BlogRollQuery {
        allMarkdownRemark(sort: { order: ASC, fields: [frontmatter___date] }, filter: { frontmatter: { templateKey: { eq: "blog-post" } } }) {
          edges {
            node {
              excerpt(pruneLength: 400)
              id
              fields {
                slug
              }
              frontmatter {
                title
                templateKey
                date(formatString: "MMMM DD, YYYY")
                featuredpost
                featuredimage
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <BlogRoll data={data} count={count} />}
  />
);

export default BlogRollQuery;
