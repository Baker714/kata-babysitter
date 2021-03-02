import React, { Component } from 'react';
import './CalculatePayForm.css';
import TimePicker from 'react-time-picker'; //going with react-time-picker
//import '../../node_modules/jquery-timepicker/jquery.timepicker.js';
//import '../../node_modules/jquery-timepicker/jquery.timepicker.css';
//tried various timepickers, couldnt' get jquery timepicker to work

class CalculatePayForm extends Component {

  constructor(props){
    super(props);
    this.state = {startTime: '12:00', bedTime: '12:00', endTime: '12:00', amountToCharge: '45'};
    this.calculatePay = this.calculatePay.bind(this);
    //this.amountToCharge = React.createRef(); tried to create ref to update amountToCharge value, found better way with querySelector
  }

  changeStartTimeField(event){
    this.setState({startTime: event});
  }

  changeBedTimeField(event){
    console.log(event);
    this.setState({bedTime: event});
  }

  changeEndTimeField(event){
    this.setState({endTime: event});
  }

  calculatePay(event) {
    let amountToCharge = 0;

    document.querySelector('#amountToCharge').innerText = this.state.amountToCharge;
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.calculatePay} id="calcPayForm">
          <label>Start Time:</label>
          <TimePicker value={this.state.startTime} onChange={this.changeStartTimeField.bind(this)}/>
          <br/>
          <br/>
          <label>Bed Time:</label>
          <TimePicker value={this.state.bedTime} onChange={this.changeBedTimeField.bind(this)}/>
          <br/>
          <br/>
          <label>End Time:</label>
          <TimePicker value={this.state.endTime} onChange={this.changeEndTimeField.bind(this)}/>
          <br/>
          <br/>
          <input type="submit" value="Calculate Pay" id="calcPayButton"/>
        </form>
        <h3 id="amountToCharge"></h3>
      </div>
    )
  }
}

export default CalculatePayForm;
