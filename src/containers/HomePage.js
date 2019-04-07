import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { searchChildAction, selectChildAction, checkChildInAction, checkChildOutAction } from '../actions/childrenActions';
import ChildrenPage from '../components/ChildrenPage';
import '../styles/style.css';

export class HomePage extends Component {
  constructor() {
    super();
    this.handleSelectChild = this.handleSelectChild.bind(this);
    this.handleCheckIn = this.handleCheckIn.bind(this);
    this.handleCheckOut = this.handleCheckOut.bind(this);
    this.state = { 
      checkedIn: ''
    };
  }

  componentDidMount() {
    this.props.dispatch(searchChildAction(''));
  }

  handleSelectChild(selectedChild) { 
    if(this.props.children !== 0){
      this.props.dispatch(selectChildAction(selectedChild));
    }
  }

  handleCheckIn(pickupTime) { 
    // console.log("Home pickupTime", pickupTime);
    // console.log("Home this.props.selectedChild", this.props.selectedChild);
    if(this.props.selectedChild !== 0){
      this.props.dispatch(checkChildInAction(this.props.selectedChild, pickupTime));
    }
    this.setState({ checkedIn: true });
    console.log("handleCheckIn", this.state.checkedIn);
  }

  handleCheckOut() {
    if(this.props.selectedChild !== 0){
      this.props.dispatch(checkChildOutAction(this.props.selectedChild));
    }
    this.setState({ checkedIn: false });
    console.log("handleCheckOut", this.state.checkedIn);
  }

  handleCheck(){
    if( this.props.selectedChild.checkins.length !== 0 && this.props.selectedChild.checkins[0].checkoutTime === null ){ //this.props.selectedChild.checkinTime !== null || 
        this.setState({ checkedIn: false });
    }else{
      this.setState({ checkedIn: true });
    }
  }

  render() {

    const { children, selectedChild } = this.props;
    
    console.log('children', children);

    return (
      <div className="container-fluid">
        { children ? <div className="row">
            <ChildrenPage
              children={children}
              selectedChild={selectedChild}
              onhandleSelectChild={this.handleSelectChild}
              onhandleCheckIn={this.handleCheckIn}
              onhandleCheckOut={this.handleCheckOut}
              checkedIn={this.state.checkedIn}
            />
          </div> : 'loading ....' }
      </div>
    );
  }
}

HomePage.propTypes = {
  children: PropTypes.array,
  selectedChild: PropTypes.object,
  dispatch: PropTypes.func.isRequired
};

/* Subscribe component to redux store and merge the state into component\s props */
const mapStateToProps = ({ children }) => ({
  children: children[0],
  selectedChild: children.selectedChild
});

/* connect method from react-router connects the component with redux store */
export default connect(mapStateToProps)(HomePage);
