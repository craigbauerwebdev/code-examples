import React, { Component } from 'react';
import './Peep.css';

class Peep extends Component {
  constructor( props ){
    super( props );
    this.state = {}
  }
  sendUpdatePoints = () => {
    let nv = this.props.points + 1;
    const name = this.props.name.toLowerCase();
    this.props.updateUserPoints(nv, name);
  }

  sendUpdatePointsMinus = () => {
    let nvm = this.props.points - 1;
    const name = this.props.name.toLowerCase();
    this.props.updateUserPoints(nvm, name);
  }
  deleteUser = () => {
    this.props.deleteUser(this.props.name);
  }

  render() {
    return (
      <div> 
        {this.props.status > 0 && 
          <div key={this.props.name} className="peep" style={{position: 'relative'}}>
            <span className="left profile-img" style={{background: 'url('+ this.props.img+')', backgroundSize: 'cover', backgroundPosition: 'top'}}></span>
            <span className="left profile-name">{this.props.name}</span>
            <span className="right profile-points">{this.props.points}</span>
            <div className="clear"></div>
            {this.props.editMode == 1 &&
              <div className="btn-wrap">
                <button style={{marginRight: '5px'}} className="button add" onClick={this.sendUpdatePoints}>+1 Point</button>
                <button className="button sub" onClick={this.sendUpdatePointsMinus}>-1 Point</button>
                <img style={{opacity: '.2', margin: '0px 0px -8px 20px'}} width="35" onClick={this.editUser} src="http://craigbauer.nyc/sites/projectg/assets/edit-icon.png" />
                <img style={{cursor: 'pointer', margin: '0px 0px -8px 20px'}} width="35" onClick={this.deleteUser} src="http://craigbauer.nyc/sites/projectg/assets/trash-icon.png" />
              </div>
            }
          </div> 
        }
      </div>
    );
  }
}

export default Peep;