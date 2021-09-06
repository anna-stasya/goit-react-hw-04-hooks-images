import React from 'react';
import PropTypes from 'prop-types';

function CardErrorView({ massage }) {
  return (
    <div>
      <p>{massage}</p>
    </div>
  );
}

CardErrorView.propTypes = {
  massage: PropTypes.string.isRequired,
};

export { CardErrorView };
