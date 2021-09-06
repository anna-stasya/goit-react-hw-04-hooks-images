import React from 'react';
import PropTypes from 'prop-types';
import s from './LoadMoreButton.module.css';

function LoadMoreButton({ LoadMoreBtn }) {
  return (
    <button type="button" className={s.Button} onClick={LoadMoreBtn}>
      Load more
    </button>
  );
}

LoadMoreButton.propTypes = {
  LoadMoreBtn: PropTypes.func.isRequired,
};

export { LoadMoreButton };
