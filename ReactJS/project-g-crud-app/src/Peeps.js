import React, { Component } from 'react';
//import './Header.css';
import Peep from './Peep';

class Peeps extends Component {
  constructor( props ){
    super( props );
  
    this.state = { 

    }
  }
  componentDidMount = () => {
      
  }
 /* sendUpdatePoints = () => { // move this function to the peep module and update each
    //const newVal = this.props.users[0].points * 1 + 1;

    let nv = this.props.users[0].points + 1;

    this.props.updatePoints(nv);
  }*/

  render() {
    const obj = this.props.users;

    //console.log(this.props.users);

    function compare(a, b) {
      const pointsA = a.points;
      const pointsB = b.points;
      
      let comparison = 0;
      if (pointsA > pointsB) {
        comparison = 1;
      } else if (pointsA < pointsB) {
        comparison = -1;
      }
      return comparison * -1;
    }

    const userMap = obj.sort(compare);

    return (
      <div>
           
        {userMap.map(peep =><Peep deleteUser={this.props.deleteUser} updateUserPoints={this.props.updatePoints} editMode={this.props.editMode} {...peep} />)}

        

      </div>
    );
  }
}

export default Peeps;

//
