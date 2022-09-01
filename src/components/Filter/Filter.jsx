import PropTypes from 'prop-types';

import './Filter.module.css';

export const Filter = ({ onFilter }) => (
  <label>
    <input
      type="text"
      name="filter"
      onChange={onFilter}
      placeholder="Find contacts by name or number"
    />
  </label>
);

Filter.propTypes = {
  onFilter: PropTypes.func,
};
