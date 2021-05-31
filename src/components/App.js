import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  updateFilters = (newFilters) => {
    this.setState({filters: {...this.state.filters, type: newFilters}})
  }

  onFindPetsClick = () => {
    switch (this.state.filters.type) {
      case "all":
        fetch('/api/pets')
        .then(resp => resp.json())
        .then(jsob => this.setState({pets: jsob}))
        break;
      case "cat":
        fetch('/api/pets?type=cat')
        .then(resp => resp.json())
        .then(jsob => this.setState({pets: jsob}))
        break;
      case "dog":
        fetch('/api/pets?type=dog')
        .then(resp => resp.json())
        .then(jsob => this.setState({pets: jsob}))
        break;
      case "micropig":
        fetch('/api/pets?type=micropig')
        .then(resp => resp.json())
        .then(jsob => this.setState({pets: jsob}))
    }
  }

  onAdoptPet = petId => {
    const pets = this.state.pets.map(p => {
      return p.id === petId ? { ...p, isAdopted: true } : p;
    });
    this.setState({ pets: pets });
  };

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.updateFilters} onFindPetsClick={this.onFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
