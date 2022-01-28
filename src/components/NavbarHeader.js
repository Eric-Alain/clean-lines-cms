import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'gatsby';
import { graphql, useStaticQuery } from 'gatsby';
import logo from '../img/logo.png';
import { Container, Navbar, Nav, NavDropdown, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { gsap, Sine } from 'gsap';

const NavbarHeader = () => {
  //Query for existing files that we'd like to generate link lists from, the idea being to make less manual work for whenever we add new pages
  const linksQuery = useStaticQuery(
    graphql`
      query linksQuery {
        templatePages: allFile(filter: { childMarkdownRemark: { frontmatter: { templateKey: { eq: "template-page" } } } }) {
          edges {
            node {
              name
              relativePath
            }
          }
        }
        galleryLanding: file(childMarkdownRemark: { frontmatter: { templateKey: { eq: "gallery-landing" } } }) {
          name
          relativePath
        }
        galleryPages: allFile(filter: { childMarkdownRemark: { frontmatter: { templateKey: { eq: "gallery-page" } } } }, sort: { fields: birthTime }) {
          edges {
            node {
              name
              relativePath
            }
          }
        }
      }
    `
  );

  //Helper function - convert slugs to sentence cased strings
  const slugToString = (str) =>
    str
      .toLowerCase()
      .split('-')
      .map((i) => i[0].toUpperCase() + i.substr(1))
      .join(' ')
      .replace(/(^\w{1}|\.\s*\w{1})/gi, (replaced) => {
        return replaced.toUpperCase();
      });

  //Variable for data from graphql query
  const templates = linksQuery.templatePages.edges;
  //console.log(templates)

  //Render link list for all desired template pages, optional parameter for exluding certain links based on file name, returns a filtered array of Gatsby <Link> components
  const renderTemplateLinks = (query, exclusions = '') => {
    const filtered = query.filter((el) => {
      return exclusions.indexOf(el.node.name) === -1;
    });

    return filtered.map((item, i) => {
      return (
        <Link to={`/${item.node.relativePath.replace(/(.*?)\..*/, '$1')}`} className='dropdown-item' key={i}>
          {slugToString(item.node.name)}
        </Link>
      );
    });
  };

  //Variable for data from graphql query
  //const galleryLanding = linksQuery.galleryLanding

  //Variable for data from graphql query
  const galleries = linksQuery.galleryPages.edges;

  //Render link list for all desired gallery pages, optional parameter for exluding certain links based on file name, returns a filtered array of Gatsby <Link> components
  const renderGalleryLinks = (query, exclusions = '') => {
    const filtered = query.filter((el) => {
      return exclusions.indexOf(el.node.name) === -1;
    });

    return filtered.map((item, i) => {
      return (
        <Link to={`/${item.node.relativePath.replace(/(.*?)\..*/, '$1')}`} className='dropdown-item' key={i}>
          {slugToString(item.node.name)}
        </Link>
      );
    });
  };

  //For mobile menu toggle animations
  const toggleRef = useRef();
  const [expand, setExpand] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      toggleRef.current,
      {
        autoAlpha: 0,
        fontSize: 0
      },
      {
        autoAlpha: 1,
        fontSize: '1em',
        ease: Sine.easeIn,
        duration: 0.4
      }
    );
  }, [expand]);

  return (
    <Navbar collapseOnSelect expand='lg' bg='dark' variant='white'>
      <Container className='g-1 mx-3 mx-md-auto'>
        <Navbar.Brand>
          <Link to='/'>
            <img width='120px' height='auto' className='img-responsive' src={logo} alt='Clean lines logo' />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' ref={toggleRef} onClick={() => setExpand(!expand)}>
          <div className='navbar-toggler-inner'>
            <FontAwesomeIcon icon={expand ? faTimes : faBars} size='2x' className='text-white' />
          </div>
        </Navbar.Toggle>
        <Navbar.Collapse id='responsive-navbar-nav' className='justify-content-end'>
          <Row>
            <Col xs='12'>
              <Nav className='justify-content-end site-menu'>
                <Link to='content/about' className='nav-link'>
                  About
                </Link>
                <NavDropdown title='Services' id='services-dropdown' renderMenuOnMount={true}>
                  {renderTemplateLinks(templates, ['about'])}
                </NavDropdown>
                <Link to='/blog' className='nav-link'>
                  Blog
                </Link>
                <NavDropdown title='Galleries' id='galleries-dropdown' renderMenuOnMount={true}>
                  <Link to='/all-galleries' className='dropdown-item'>
                    All galleries
                  </Link>
                  {renderGalleryLinks(galleries)}
                </NavDropdown>
                <Link to='/contact' className='nav-link'>
                  Contact
                </Link>
              </Nav>
            </Col>
            <Col xs='12'>
              <Nav className='justify-content-start justify-content-lg-end social-nav'>
                <Nav.Link href='#'>
                  <FontAwesomeIcon icon={faFacebook} size='lg' />
                </Nav.Link>
                <Nav.Link href='#'>
                  <FontAwesomeIcon icon={faInstagram} size='lg' />
                </Nav.Link>
                <Nav.Link href='#'>
                  <FontAwesomeIcon icon={faTwitter} size='lg' />
                </Nav.Link>
                <Nav.Link href='#'>
                  <FontAwesomeIcon icon={faYoutube} size='lg' />
                </Nav.Link>
              </Nav>
            </Col>
          </Row>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarHeader;
