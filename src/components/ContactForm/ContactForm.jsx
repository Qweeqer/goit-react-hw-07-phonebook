import { useState } from 'react';
import {
  useFetchContactsQuery,
  useAddContactMutation,
} from '../../redux/contactsAPI';
// import * as yup from 'yup';
// import { Formik } from 'formik';
import PropTypes from 'prop-types';
import './ContactForm.module.css';

// let schema = yup.object().shape({
//   name: yup.string().required(),
//   phone: yup.number().required(),
// });

export const ContactForm = () => {
  const [formFields, setFormFields] = useState({
    name: '',
    phone: '',
  });
  const { data } = useFetchContactsQuery();

  const [addContact] = useAddContactMutation();

  const handleChange = event => {
    const { name, value } = event.currentTarget;
    setFormFields(prevState => ({ ...prevState, [name]: value }));
  };

  const reset = () => {
    setFormFields({
      name: '',
      phone: '',
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const oldСontact = data.some(
      contact =>
        (contact.name.toLowerCase() === formFields.name.toLowerCase() &&
          contact.phone === formFields.phone) ||
        contact.phone === formFields.phone
    );
    if (oldСontact) {
      return alert(`This phone ${formFields.phone} is already in contacts`);
    }
    console.log('formFields', formFields);
    addContact(formFields);
    // onSubmit(addContact);
    reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formFields.name}
        onChange={handleChange}
        placeholder="Name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />
      <input
        type="tel"
        name="phone"
        value={formFields.phone}
        onChange={handleChange}
        placeholder="Phone"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone phone must be digits and can contain spaces, dashes, parentheses and can start with +. For example +380670000000"
        required
      />
      <button type="submit">Add contact</button>
    </form>
  );
};
// }

ContactForm.propTypes = {
  onSubmit: PropTypes.func,
};
