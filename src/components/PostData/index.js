import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const PostData = ({
  text,
  link,
  children
}) => {
  return (
    <div className="post__data">
        {link && <a href={link} rel="noopener noreferrer" target="_blank" className="link">{text}</a>}
        {!link && <div className="text">{text}</div>}
        {children}
    </div>
  );
}

PostData.proptypes = {
  text: PropTypes.string,
  link: PropTypes.string,
  children: PropTypes.node
};

export default PostData;