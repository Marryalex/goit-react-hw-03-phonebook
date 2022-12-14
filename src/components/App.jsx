import React, { Component } from 'react'
import ContactForm from './ContactForm/ContactForm'
import { nanoid } from 'nanoid'
import ContactList from './ContactList/ContactList'
import Filter from './Filter/Filter'

export default class App extends Component {
  state = {
    contacts: [
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
    filter: '',
  }

  componentDidMount() {
    const contacts = localStorage.getItem("contacts");
    const contactsParsed = JSON.parse(contacts);
    if (contactsParsed) {
      this.setState({ contacts: contactsParsed });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  addContact = (name, number) => {
    const { contacts } = this.state;
    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    contacts.find((contact) => contact.name === newContact.name)?
    alert(`${newContact.name} is already in contacts.`) :
    this.setState(({ contacts }) => ({
    contacts: [newContact, ...contacts],
    }));
  };

  changeFilter = (e) => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;

    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

    deleteContact = (contactId) => {
      this.setState((prevState) => ({
        contacts: prevState.contacts.filter(
          (contact) => contact.id !== contactId
        ),
      }));
    };

  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts();
    return (
      <div className='wrapper'>
        <h1 className='title'>Phonebook</h1>
        <ContactForm onSubmit={this.addContact}/>
        <h2 className='title'>Contacts</h2>
        <Filter value={filter} onChange={this.changeFilter} />
        <ContactList
          contacts={visibleContacts}
          onDeleteContact={this.deleteContact}
       />
      </div>
    )
  }
}