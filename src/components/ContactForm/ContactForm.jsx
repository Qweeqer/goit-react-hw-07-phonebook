// import { useState } from 'react';
import {
  useFetchContactsQuery,
  useAddContactMutation,
} from '../../redux/contactsAPI';
import * as yup from 'yup';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import './ContactForm.module.css';

let schema = yup.object().shape({
  name: yup.string().required(),
  phone: yup.number().required(),
});

export const ContactForm = () => {
  const initialValues = {
    name: '',
    phone: '',
  };
  const [addContact] = useAddContactMutation();
  const { data: contacts } = useFetchContactsQuery();

  const handleSubmit = (values, { resetForm }) => {
    // event.preventDefault();
    const { name, phone } = values;
    const oldСontact = contacts.find(
      contact =>
        (contact.name.toLowerCase() === name.toLowerCase() &&
          contact.phone === phone) ||
        contact.phone === phone
    );
    if (oldСontact) {
      return alert(`This phone ${phone} is already in contacts`);
    }
    console.log('contacts', contacts);
    addContact({ name, phone });
    // onSubmit(addContact);
    resetForm();
  };

  return (
    <Formik
      initialvalues={initialValues}
      validationschema={schema}
      onSubmit={handleSubmit}
    >
      <form>
        <input
          type="text"
          name="name"
          // value={contact.name}
          // onChange={handleChange}
          placeholder="Name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        <input
          type="tel"
          name="phone"
          // value={contacts.phone}
          // onChange={handleChange}
          placeholder="Phone"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone phone must be digits and can contain spaces, dashes, parentheses and can start with +. For example +380670000000"
          required
        />
        <button type="submit">Add contact</button>
      </form>
    </Formik>
  );
};
// }

ContactForm.propTypes = {
  onSubmit: PropTypes.func,
};
