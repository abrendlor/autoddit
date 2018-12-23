import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const Author = ({
    submissionDate,
    submissionUser
}) => {
  return (
    <div className="author">
        Submitted on {submissionDate} by <span>{submissionUser}</span>
    </div>
  );
}

Author.proptypes = {
  submissionDate: PropTypes.string,
  submissionUser: PropTypes.string
};

export default Author;


