import React from 'react';

import './Image.scss';

class Image extends React.Component {
  render() {
    return (
      <img className='img-responsive' {...this.props} />
    )
  }
}

export default Image;
