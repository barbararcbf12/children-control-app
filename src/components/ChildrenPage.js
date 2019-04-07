import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CheckInPage from './CheckInPage';

// const ChildrenPage = ({ children, onhandleSelectChild, selectedChild, onhandleCheckIn, onhandleCheckOut }) => { 

class ChildrenPage extends Component {
  constructor() {
    super();
    this.state = { 
      hour: '' ,
      pickupTime: '',
      selected: 'false',
      lgShow: false
    };
  }

  hadlepickupTime(time) {
    this.setState({ pickupTime: time });
  }

  hadleHourSelected(chosenHour) {
    this.setState({ hour: chosenHour });
  }

  render(){

    const { children, onhandleSelectChild, selectedChild, onhandleCheckIn, onhandleCheckOut } = this.props;

    let currentDateTime = new Date();

    let lgClose = () => this.setState({ lgShow: false });
    const ActionScreen = () => { selectedChild.checkins.checkoutTime < currentDateTime ? <CheckInPage /> : null };

    const styleselectedChild = (
      children.length !== 0 ? 'block' : 'none'
    )

    const exactTime = (
      <div className="col-md-5">
        <div className="hour-day" onClick={() => this.hadlepickupTime(this.state.hour + ":00")}>{this.state.hour + ":00"}</div>
        <div className="hour-day" onClick={() => this.hadlepickupTime(this.state.hour + ":15")}>{this.state.hour + ":15"}</div>
        <div className="hour-day" onClick={() => this.hadlepickupTime(this.state.hour + ":30")}>{this.state.hour + ":30"}</div>
        <div className="hour-day" onClick={() => this.hadlepickupTime(this.state.hour + ":45")}>{this.state.hour + ":45"}</div>
      </div>
    );

    return(
      <div className="col-md-12">

        {/* <Button onClick={() => this.setState({ lgShow: true })}>
          Large modal
        </Button> */}
        
        <div className="select-video" style={{ display: styleselectedChild }}> 
          {selectedChild && (<div id={selectedChild.childId}>
            <div className="title">{selectedChild.name.fullName}</div>
            <div className='div-col'>
              <div className="col-md-5">
                <img src={selectedChild.image.large} alt={selectedChild.name.fullName} /> 
              </div>
            </div>
            <div className='div-col'>
              <div className="col-md-7">
                <div className="label">Checked in: { selectedChild.checkedIn ? "Yes" : "No" }</div>
                <div className="label">Birthday: {selectedChild.birthday}</div>
                <div className="col-md-6">
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
                { this.state.hour !== '' ? exactTime : null }
                <button onClick={onhandleCheckIn.bind(this, this.state.pickupTime)}>CHECK IN</button>
                <button onClick={onhandleCheckOut.bind(this)}>CHECK OUT</button>
                {/* { selectedChild.checkinTime ?
                  selectedChild.checkins[selectedChild.checkins.length - 1].checkoutTime ?
                  <button onClick={onhandleCheckIn.bind(this, this.state.pickupTime)}>CHECK IN</button> : <button onClick={onhandleCheckOut.bind(this)}>CHECK OUT</button>
                  : <button onClick={onhandleCheckIn.bind(this, this.state.pickupTime)}>CHECK IN</button>
                } */}
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
