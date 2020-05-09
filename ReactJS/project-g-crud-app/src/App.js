import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import Peeps from './Peeps';
import NewUser from './NewUser';
import firebase from 'firebase';

class App extends Component {
  constructor( props ){
    super( props );
    this.state = {
      editMode: 0
    };
  }

  componentDidMount = () => {
    const config = {
      apiKey: "AIzaSyCr6UqJA-zx_PXWmAXjssW73fNC1bSDY0M", //move to express
      authDomain: "projectg-c9aa2.firebaseapp.com",
      databaseURL: "https://projectg-c9aa2.firebaseio.com",
      projectId: "projectg-c9aa2",
      storageBucket: "projectg-c9aa2.appspot.com",
      messagingSenderId: "181309580467"
    };
    firebase.initializeApp(config);
    this.ref = firebase.database();
    const siteLogo = firebase.database().ref('logo/');
    siteLogo.on('value', (snapshot) => {
      const sitelogo = snapshot.val();
      console.log(sitelogo);
      this.setState({siteLogo: sitelogo});

    });
    const gearIcon = firebase.database().ref('gearIcon/');
    gearIcon.on('value', (snapshot) => {
      const gearicon = snapshot.val();
      console.log(gearicon);
      this.setState({gearicon: gearicon});

    });
    const usersRef = firebase.database().ref('users/');
    usersRef.on('value', (snapshot) => {
    const user = snapshot.val();
    let usersArray = []; 
    Object.keys(user).forEach(key => {
      usersArray.push(user[key]);
    });
    this.setState({users: usersArray});
    });
  }

  updatePoints = (points, name, img) => {
    const 
      updateUser = firebase.database().ref('users/' + name);   
    updateUser.update({
      points: points
    });
  }

  deleteUser = () => {
    const deleteUser = firebase.database().ref('users/craig');
    deleteUser.delete().then(function() {
      alert('User has been Deleted');
    }).catch(function(error) {
      alert('User has not been Deleted. error!');
    });
  }
  editMode = () => {
    this.setState({editMode: !this.state.editMode});
  }

  addPeep = (name, img) => {
    const lCName = name.toLowerCase();
    let userObj;
    const users = firebase.database().ref('users/');
    users.on('value', (snapshot) => {
      userObj = snapshot.val();
    }),
    userCheck = lCName in userObj;
    if(!userCheck && name !== '') {
      if(img === '') { // check for valid image
        alert('Image Field is Blank, Default Will Be Used');
        img = 'http://www.sessionlogs.com/media/icons/defaultIcon.png'
      }
      firebase.database().ref('users/'+ lCName).set({
        name: name,
        points: 0,
        img : img,
        status: 1
      });
    } else {
      if(name === '') {
        alert('User Name is Blank. Try Again.')
      } else {
        alert('User already exist dummy! Try Again...');
      } 
    } 
  }

  deleteUser = (name) => {
    alert(name + ' has been deleted.')
    const deleteName = name.toLowerCase();
    const deleteUser = firebase.database().ref('users/' + deleteName);
    deleteUser.remove();
  }

  render() {
    if(this.state.users) {
      return (
        <div>
          <Header onClickFunction={this.sampleFunction} handleAddFunc={this.addPeep} logo={this.state.siteLogo} peeps={this.state.peeps} gear={this.state.gearicon} editModeFunc={this.editMode} />
          <Peeps deleteUser={this.deleteUser} peeps={this.state.peeps} users={this.state.users} updatePoints={this.updatePoints} editMode={this.state.editMode} />
        </div>
      );
    } else {
      return(<div></div>);
    }
  }
}
export default App;