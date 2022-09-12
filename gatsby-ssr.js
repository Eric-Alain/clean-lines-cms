import React from 'react';
import SSRProvider from 'react-bootstrap/SSRProvider';

export const wrapRootElement = ({ element }) => {
  return <SSRProvider>{element}</SSRProvider>;
};