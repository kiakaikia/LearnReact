import React, { useState, useEffect } from "react";
// import { uuid } from "uuidv4";
import "./App.css";
import Header from "./components/Header";
import AddContact from "./components/AddContact";
import ContactList from "./components/ContactList";


function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  //fixed losing data after refresh
  //creates a new array if it doesnt exists
  //More info:
  //  https://stackoverflow.com/questions/71961041/localstorage-is-saving-my-data-but-after-refresh-is-reseting-and-empty-it
  //  https://stackblitz.com/edit/react-gkpfsd?file=src%2FApp.js
  const retriveContacts = localStorage.getItem(LOCAL_STORAGE_KEY) 
    ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) : [];
  const [contacts, setContacts] = useState(retriveContacts);

  const addContactHandler = (contact) => {
    console.log(contact);
    setContacts([...contacts,contact]);
  };

  const removeContactHandler = (id) => {
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContacts(newContactList);
  };

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className="ui container">
      <Header />
      <AddContact addContactHandler={addContactHandler} />
      <ContactList contacts={contacts} getContactId={removeContactHandler} />
    </div>
  );
}

export default App;