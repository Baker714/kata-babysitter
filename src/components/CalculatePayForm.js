import React, { Component } from 'react';

class CalculatePayForm extends Component {

  render() {
    return (
      <form onSubmit={this.calculatePay} id="calcPayForm">
        <label for="startTimeTextBox">Start Time</label>
        <input type="text" id="startTimeTextBox"></input>
        <h1>Bed Time</h1>
        <input></input>
        <h1>End Time</h1>
        <input></input>
        <input type="submit"></input>
      </form>
    )
  }

  calculatePay() {
    return 0;
  }
}

export default CalculatePayForm;
