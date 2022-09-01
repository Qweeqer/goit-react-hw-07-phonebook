import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import { addNewContact } from '../redux/contactsSlice';
import { filteredContacts } from '../redux/filterSlice';

import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import './App.module.css';

export const App = () => {
  const contacts = useSelector(state => state.contacts.items);
  const filter = useSelector(state => state.filter);

  const dispatch = useDispatch();

  const addContact = ({ name, number }) => {
    const oldСontact = contacts.find(
      contact =>
        (contact.name.toLowerCase() === name.toLowerCase() &&
          contact.number === number) ||
        contact.number === number
    );
    if (oldСontact) {
      return alert(`This number ${number} is already in contacts`);
    }

    dispatch(addNewContact({ id: nanoid(), name, number }));
  };

  const onFilter = e => {
    dispatch(filteredContacts(e.currentTarget.value.trim()));
  };
  const filterContacts = () => {
    // console.log(contacts);
    return contacts.filter(
      contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase()) ||
        contact.number.includes(filter)
    );
  };

  return (
    <section>
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={addContact} />
        <h2>Contacts</h2>
        <Filter onFilter={onFilter} />
        <ContactList contacts={filterContacts()} />
      </div>
    </section>
  );
};
