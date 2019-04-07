import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ChildrenPage extends Component {
  constructor() {
    super();
    this.state = { 
      hour: '' ,
      pickupTime: '',
      // clicked_button: true
  }
    // this.changeButtonColor = this.changeButtonColor.bind(this);
  }

  hadlepickupTime(time) {
    this.setState({ pickupTime: time });
  }

  hadleHourSelected(chosenHour) {
    this.setState({ hour: chosenHour });
  }

  // changeButtonColor(){
  //   this.setState({clicked_button: !this.state.clicked_button});
  // }

  render(){

    const { children, onhandleSelectChild, selectedChild, onhandleCheckIn, onhandleCheckOut, checkedIn } = this.props;

    let bgColor = this.state.clicked_button ? "orange" : "white";

    const exactTime = (
      <div className="col-md-5">
        <div className="hour-day" onClick={() => this.hadlepickupTime(this.state.hour + ":00")}>{this.state.hour + ":00"}</div>
        <div className="hour-day" onClick={() => this.hadlepickupTime(this.state.hour + ":15")}>{this.state.hour + ":15"}</div>
        <div className="hour-day" onClick={() => this.hadlepickupTime(this.state.hour + ":30")}>{this.state.hour + ":30"}</div>
        <div className="hour-day" onClick={() => this.hadlepickupTime(this.state.hour + ":45")}>{this.state.hour + ":45"}</div>
      </div>
    );

    const checkinButton = <button className="btn btn-checkin" onClick={onhandleCheckIn.bind(this, this.state.pickupTime)}>CHECK IN</button>; 
    const checkoutButton = <button className="btn btn-checkout" onClick={onhandleCheckOut.bind(this)}>CHECK OUT</button>; 

    return(
      <div className="col-md-12">

        <div className="select-video" > 
          {selectedChild && (
          <div id={selectedChild.childId}>
            <div className="title">{selectedChild.name.fullName}</div>

            <div className='div-col'>
              <div className="col-md-4">
                <img src={selectedChild.image.large} alt={selectedChild.name.fullName} /> 
              </div>
            </div>

            { !checkedIn ?
            <div className='div-col' >
              <div className="col-md-4" style={{ display: 'inline-block'}}>
                <div className="infoText">Choose when {selectedChild.name.firstName} will be picked up: {this.state.pickupTime} </div>
                  <div className="col-md-6" style={{ display: 'inline-block', padding: '5px' }}>
                    <div className="hour-day" onClick={() => this.hadleHourSelected("8")}>8am</div>
                    <div className="hour-day" onClick={() => this.hadleHourSelected("9")}>9am</div>
                    <div className="hour-day" onClick={() => this.hadleHourSelected("10")}>10am</div>
                    <div className="hour-day" onClick={() => this.hadleHourSelected("11")}>11am</div>
                    <div className="hour-day" onClick={() => this.hadleHourSelected("12")}>12am</div>
                    <div className="hour-day" onClick={() => this.hadleHourSelected("13")}>1pm</div>
                    <div className="hour-day" onClick={() => this.hadleHourSelected("14")}>2pm</div>
                    <div className="hour-day" onClick={() => this.hadleHourSelected("15")}>3pm</div>
                    <div className="hour-day" onClick={() => this.hadleHourSelected("16")}>4pm</div>
                  </div>
                  <div className="col-md-6" style={{ display: 'inline-block', padding: '5px' }}>
                    { this.state.hour !== '' ? exactTime : null }
                  </div> 
              </div>
            </div>: null }

            <div className='div-col'>
              <div className="col-md-4">
                { checkedIn ? checkoutButton : this.state.hour !== '' ? checkinButton : null }
              </div>
            </div>
            </div>)}
        </div>
         
       <div>
          { children.length !== 0 ? 
            children.map(child => ( 
              <div key={child.childId} onClick={onhandleSelectChild.bind(this, child)} className="image-thumbnail">
                <div className="wrapper_thumbnail">
                  <img src={child.image.small} alt={child.name.fullName} />
                  <div>{child.name.firstName}</div>
                </div>
              </div>
            )): "There are no items in this category matching your requirements."
          }
      </div>

      <br /><br />

    </div>
  )
  }
}


ChildrenPage.propTypes = {
  children: PropTypes.array,
  selectedChild: PropTypes.object,
  onhandleSelectChild: PropTypes.func.isRequired
};

export default ChildrenPage;
