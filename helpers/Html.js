import React from 'react';
import ReactDOM from 'react-dom/server';
import DocumentMeta from 'react-document-meta';
import App from '../containers/App';

const Html = ({assets, component}) => {
  const content = ReactDOM.renderToString(component);

  return <html lang="en-US">
    <head>
      <meta charSet="utf-8" />
      {DocumentMeta.renderAsReact()}

      {Object.keys(assets.styles).map((style, i) =>
        <link href={assets.styles[style]} key={i} media="screen, projection"
          rel="stylesheet" type="text/css"/>
      )}
    </head>

    <body>
      <div id="root" dangerouslySetInnerHTML={{__html: content}} />
      <script src={assets.javascript.main} />
    </body>
  </html>;
};

export default Html;
