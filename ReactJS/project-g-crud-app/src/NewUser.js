import React, { Component } from 'react';
//import './Header.css';


class NewUser extends Component {
  constructor( props ){
    super( props );
  
    this.state = {
      newUser: {
        name: 'New Person Test',
        imgURL: 'http://placeholder.it',
        points: 0,

      }
    }

  }
  componentDidMount = () => {
      
  }
  setName = (event) => {
    this.setState({ newUser: Object.assign(this.state.newUser, {name: event.target.value}) })
  }
  setImg = (event) => {
    
  }
  setPoints = (event) => {
    
  }
  addUser = () => {
    let name = this.state.newUser.name;
    let img = this.state.newUser.imgURL;
    let points = this.state.newUser.points;
    this.props.addUseFunc(name, img, points);
  }
  render() {
    return (
      <header>
       
        <h3>Add New User</h3>
          <form onSubmit={this.addUser}>
            <input value={this.state.newUser.name} onChange={this.setName} type="text" placeholder="First Name" /><br />
            <input value={this.state.newUser.imgURL} onChange={this.setImg} type="text" placeholder="Image URL" /><br />
            <input value={this.state.newUser.points} onChange={this.addPoints} type="text" placeholder="Starting Points" /><br />
            <button onClick={this.addUser}>Add User</button>
          </form>

      </header>
    );
  }
}

export default NewUser;
