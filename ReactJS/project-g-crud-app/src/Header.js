import React, { Component } from 'react';
import './Header.css';

class Header extends Component {
  constructor( props ){
    super( props );
  
    this.state = {
      addName: '',
      addImg: '',
    }

  }
  componentDidMount = () => {
      
  }
  editMode = () => {
    this.props.editModeFunc();
  }
  updateState = (event) => {
    //console.log('updated');

    if(event.target.id === 'username') {
      this.setState({addName: event.target.value});
    } else if(event.target.id === 'img') {
      this.setState({addImg: event.target.value})
    }
  }
  addPeep = (event) => {
    event.preventDefault();
    console.log('local func');
    this.props.handleAddFunc(this.state.addName, this.state.addImg);

    this.setState({addName: '', addImg: '', addNew: false});

  }
  addNewUserModal = () => {
    //console.log('addnewuser');
    if(this.state.addNew === true) {
      this.setState({addNew: false});
    } else {
      this.setState({addNew: true});
    }
  }
  render() {
    return (
      <header>
       
        <h1>{this.props.title}</h1>
        <img className="site-logo" src={this.props.logo} />
        <div style={{position: 'absolute', top: '0', right: '0', width: '300px', height: '130px'}}>
          <span className="add-icon" onClick={this.addNewUserModal}> + </span>
          <img className="settings-icon" onClick={this.editMode} src={this.props.gear} />
        </div>
        {this.state.addNew && //<NewUserModal />
          <div style={{zIndex: '99999', background: 'rgba(255,255,255,.9', position: 'absolute', top: '0', left: '0', right: '0', bottom: '0'}}>
            <div style={{position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: '#000', minWidth: '500px', background: '#ccc', padding: '30px'}}>
              
                <h2>Add New User</h2>
                <form className="addUserForm">
                  <input id="username" onChange={this.updateState} placeholder="User Name" value={this.state.addName} type="text" /> <br />
                  <input id="img" onChange={this.updateState} placeholder="Image URL" value={this.state.addImg} type="text" /><br />

                  <button className="add-new-user-btn" onClick={this.addPeep}>Add User</button>
                </form>
            </div>
            <div onClick={this.addNewUserModal} style={{position: 'absolute', top: '10px', right: '34px', color: '#000', fontSize: '2em', cursor: 'pointer'}}>x</div>
          </div>
        }


      </header>
    );
  }
}

export default Header;
