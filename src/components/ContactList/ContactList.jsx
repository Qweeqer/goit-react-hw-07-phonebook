import { useSelector } from 'react-redux';

import { getFilter } from '../../redux/filterSlice';
import {
  useFetchContactsQuery,
  useDeleteContactMutation,
} from '../../redux/contactsAPI';

import css from './ContactList.module.css';

export const ContactList = () => {
  const { data: contacts } = useFetchContactsQuery();
  const filter = useSelector(getFilter);
  const [deleteContact] = useDeleteContactMutation();

  const filterContacts = contacts?.filter(
    contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()) ||
      contact.phone.includes(filter)
  );
  return (
    <ul>
      {contacts &&
        filterContacts.map(({ id, name, phone }) => (
          <li key={id}>
            <p>
              {name}: {phone}
            </p>
            <button
              className={css.listDeleteButton}
              type="button"
              onClick={() => deleteContact(id)}
            >
              Delete
            </button>
          </li>
        ))}
    </ul>
  );
};
