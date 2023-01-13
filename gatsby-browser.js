import './src/components/all.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import SSRProvider from 'react-bootstrap/SSRProvider';
import loadableReady from '@loadable/component';

export const wrapRootElement = ({ element }) => {
  return <SSRProvider>{element}</SSRProvider>;
};

export const replaceHydrateFunction = () => {
  return (element, container, callback) => {
    loadableReady(() => {
      ReactDOM.render(element, container, callback);
    });
  };
};