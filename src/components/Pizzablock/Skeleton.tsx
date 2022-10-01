import React from 'react';
import ContentLoader from 'react-content-loader';

const PizzaSkeleton: React.FC = props => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="581" cy="262" r="75" />
    <circle cx="125" cy="125" r="125" />
    <rect x="0" y="279" rx="10" ry="10" width="260" height="27" />
    <rect x="1" y="324" rx="10" ry="10" width="260" height="88" />
    <rect x="1" y="437" rx="8" ry="8" width="90" height="27" />
    <rect x="108" y="429" rx="25" ry="25" width="152" height="45" />
  </ContentLoader>
);

export default PizzaSkeleton;
