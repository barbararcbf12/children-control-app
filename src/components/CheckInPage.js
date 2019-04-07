import React, { Component } from 'react';

class CheckInPage extends Component {
    constructor(props, context) {
      super(props, context);
  
      this.state = {
        lgShow: false,
      };
    }
  
    render() {
      let lgClose = () => this.setState({ lgShow: false });
  
      return (
          <Modal
            size="lg"
            show={this.state.lgShow}
            onHide={lgClose}
            aria-labelledby="example-modal-sizes-title-lg"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-lg">
                Large Modal
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>...</Modal.Body>
          </Modal>
      );
    }
  }

  export default CheckInPage;