import React, { Component } from 'react';
import './CalculatePayForm.css';

class CalculatePayForm extends Component {

  render() {
    return (
      <form onSubmit={this.calculatePay} id="calcPayForm">
        <label>Start Time:
          <input type="datetime-local" id="startTimeTextBox" />
        </label>
        <br/>
        <br/>
        <label>Bed Time:
          <input type="datetime-local" id="bedTimeTextBox" />
        </label>
        <br/>
        <br/>
        <label>End Time:
          <input type="datetime-local" id="endTimeTextBox" />
        </label>
        <br/>
        <br/>
        <input type="submit" value="Calculate Pay" id="calcPayButton"/>
      </form>
    )
  }

  calculatePay() {
    return 0;
  }
}

export default CalculatePayForm;
