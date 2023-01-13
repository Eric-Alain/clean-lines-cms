import React from 'react';
import { Helmet } from 'react-helmet';
import { Link, graphql } from 'gatsby';
import { Container, Row, Col } from 'react-bootstrap';
import Layout from '../components/Layout';

const TagRoute = ({ data, pageContext }) => {
  const posts = data.allMarkdownRemark.edges;
  const postLinks = posts.map((post) => (
    <li key={post.node.fields.slug}>
      <Link to={post.node.fields.slug}>{post.node.frontmatter.title}</Link>
    </li>
  ));
  const tag = pageContext.tag;
  const title = data.site.siteMetadata.title;
  const totalCount = data.allMarkdownRemark.totalCount;
  const tagHeader = `${totalCount} post${totalCount === 1 ? '' : 's'} tagged with “${tag}”`;
  return (
    <Layout>
      <Container className='my-5'>
        <section class="tag">
          <Helmet title={`${tag} | ${title}`} />
          <Row>
            <Col xs='12'>
              <h1>{tagHeader}</h1>
              <ul>{postLinks}</ul>
              <Link to='/tags/' className='btn btn-theme'>
                Browse all tags
              </Link>
            </Col>
          </Row>
        </section>
      </Container>
    </Layout>
  );
};
export default TagRoute;

export const tagPageQuery = graphql`
  query TagPage($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 1000, sort: { fields: [frontmatter___date], order: DESC }, filter: { frontmatter: { tags: { in: [$tag] } } }) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`;
