import { Component } from 'react'
import './App.css'
import { v4 as uuidv4 } from 'uuid'
import { PhoneBook } from './componets/PhoneBook.js'
import { Contacts } from './componets/Contacts'

export default class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    name: '',
    number: '',
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.setState((state) => {
      if (
        state.contacts.some((contact) => {
          return contact.name === state.name
        })
      ) {
        alert(`${state.name} is already in contacts`)
        return state
      } else {
        return {
          contacts: [
            ...state.contacts,
            { name: state.name, id: uuidv4(), number: state.number },
          ],
          name: '',
          number: '',
        }
      }
    })
  }

  handleDeleteItem = (id) => {
    this.setState((state) => {
      return {
        contacts: state.contacts.filter((contact) => {
          return contact.id !== id
        }),
      }
    })
  }
  handleChange = (name, event) => {
    this.setState({ [name]: event.currentTarget.value })
    filterContacts = () => {
      if (this.state.filter === '') {
        return this.state.contacts
      } else {
        return this.state.contacts.filter((contact) => {
          return contact.name
            .toLowerCase()
            .includes(this.state.filter.toLowerCase())
        })
      }
    }
    render()
    return (
      <div>
        <PhoneBook
          filter={this.state.filter}
          name={this.state.name}
          number={this.state.number}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
        />
        <Contacts
          contacts={this.filterContacts()}
          handleDeleteItem={this.handleDeleteItem}
        />
      </div>
    )
  }
}
