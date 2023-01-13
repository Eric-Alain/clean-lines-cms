import React, { useState } from 'react';
import { navigate } from 'gatsby-link';
import { Container, Row, Col, Form } from 'react-bootstrap';
import Layout from '../../components/Layout';
import { serialize } from '../../utils';

const ContactIndexPage = () => {
  const [target, setTarget] = useState({});

  const handleChange = (e) => {
    setTarget({ ...target, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: serialize({
        ...target,
        'form-name': form.getAttribute('name')
      })
    })
      .then(() => navigate(form.getAttribute('action')))
      .catch((error) => alert(error));
  };

  return (
    <Layout>
      <Container className='my-5'>
        <Row>
          <Col xs='12'>
            <h1>Contact</h1>
            <Form name='contact' method='post' action='/contact/thanks/' data-netlify='true' data-netlify-honeypot='bot-field' onSubmit={handleSubmit}>
              {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
              <input type='hidden' name='form-name' value='contact' />
              <div hidden>
                <label>
                  Don’t fill this out: <input name='bot-field' onChange={handleChange} />
                </label>
              </div>

              <Form.Group className='mb-3'>
                <Form.Label htmlFor={'name'}>Name</Form.Label>
                <Form.Control type={'text'} name={'name'} onChange={handleChange} id={'name'} placeholder='Enter name' required={true} />
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Label htmlFor={'email'}>Email address</Form.Label>
                <Form.Control type={'email'} name={'email'} onChange={handleChange} id={'email'} placeholder='Enter email' required={true} />
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Label htmlFor={'message'}>Message</Form.Label>
                <textarea className='form-control' row='5' name={'message'} onChange={handleChange} id={'message'} required={true} />
              </Form.Group>

              <button className='btn btn-theme' type='submit'>
                Send
              </button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default ContactIndexPage;
