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
      pickupTime: ''
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

  handleCheckIn(pickupTime) { //, pickupTime) {//pickupTime , this.state.pickupTime
    console.log("Home pickupTime", pickupTime);
    console.log("Home this.props.selectedChild", this.props.selectedChild);
    if(this.props.selectedChild !== 0){
      this.props.dispatch(checkChildInAction(this.props.selectedChild, pickupTime));
    }
  }

  handleCheckOut() {
    if(this.props.selectedChild !== 0){
      this.props.dispatch(checkChildOutAction(this.props.selectedChild));
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
