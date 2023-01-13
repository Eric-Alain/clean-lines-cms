import React from 'react';
import { kebabCase } from 'lodash';
import { Helmet } from 'react-helmet';
import { Link, graphql } from 'gatsby';
import { Container, Row, Col } from 'react-bootstrap';
import Layout from '../../components/Layout';

const TagsPage = ({
  data: {
    allMarkdownRemark: { group },
    site: {
      siteMetadata: { title }
    }
  }
}) => (
  <Layout>
    <Container className='my-5'>
      <section class='tag'>
        <Helmet title={`Tags | ${title}`} />
        <Row>
          <Col xs='12'>
            <h1>Tags</h1>
            <ul className='taglist'>
              {group.map((tag) => (
                <li key={tag.fieldValue}>
                  <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
                    {tag.fieldValue} ({tag.totalCount})
                  </Link>
                </li>
              ))}
            </ul>
          </Col>
        </Row>
      </section>
    </Container>
  </Layout>
);

export default TagsPage;

export const tagPageQuery = graphql`
  query TagsQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 1000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;
