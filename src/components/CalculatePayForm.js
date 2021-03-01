import React, { Component } from 'react';

class CalculatePayForm extends Component {

  render() {
    return (
      <form onSubmit={this.calculatePay} id="calcPayForm">
        <label>Start Time
          <input type="text" id="startTimeTextBox"></input>
        </label>
        <label>Bed Time
          <input type="text" id="bedTimeTextBox"></input>
        </label>
        <label>End Time
          <input type="text" id="endTimeTextBox"></input>
        </label>
        <input type="submit"></input>
      </form>
    )
  }

  calculatePay() {
    return 0;
  }
}

export default CalculatePayForm;
