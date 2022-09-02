import { useSelector, useDispatch } from 'react-redux';

import { filteredContacts, getFilter } from '../../redux/filterSlice';

import './Filter.module.css';

export const Filter = () => {
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();
  return (
    <label>
      <input
        type="text"
        name="filter"
        value={filter}
        onChange={e => dispatch(filteredContacts(e.target.value))}
        placeholder="Find contacts by name or phone"
      />
    </label>
  );
};
