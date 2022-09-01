import { useState } from 'react';
import PropTypes from 'prop-types';
import './ContactForm.module.css';

const INITIAL_FORM_STATE = {
  name: '',
  number: '',
};

export function ContactForm({ onSubmit }) {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);

  const handleChange = ({ target: { name, value } }) => {
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = event => {
    event.preventDefault();

    const newContact = {
      name: formData.name,
      number: formData.number,
    };
    onSubmit(newContact);
    setFormData({ number: '', name: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />
      <input
        type="tel"
        name="number"
        value={formData.number}
        placeholder="Number"
        onChange={handleChange}
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +. For example +380670000000"
        required
      />
      <button type="submit">Add contact</button>
    </form>
  );
}
// }

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
