import React from 'react';
import PropTypes from 'prop-types';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './style.scss';
import { kFormatter } from '../../helpers';

library.add(faCaretUp);
library.add(faCaretDown);

const Votes = ({
  votesCount,
  onIncreaseVotes,
  onDecreaseVotes
}) => {
  return (
    <div className="votes">
        <div className="votes__up"><FontAwesomeIcon icon="caret-up" onClick={onIncreaseVotes}/></div>
        <div className="votes__count">{kFormatter(votesCount)}</div>
        <div className="votes__down"><FontAwesomeIcon icon="caret-down" onClick={onDecreaseVotes}/></div>
    </div>
  );
}

Votes.proptypes = {
  votesCount: PropTypes.number,
  onIncreaseVotes: PropTypes.func,
  onDecreaseVotes: PropTypes.func
};

export default Votes;