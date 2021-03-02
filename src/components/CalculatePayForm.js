import React, { Component } from 'react';
import './CalculatePayForm.css';
import TimePicker from 'react-time-picker'; //going with react-time-picker
//import '../../node_modules/jquery-timepicker/jquery.timepicker.js';
//import '../../node_modules/jquery-timepicker/jquery.timepicker.css';
//tried various timepickers, couldnt' get jquery timepicker to work

class CalculatePayForm extends Component {

  constructor(props){
    super(props);
    this.state = {startTime: '', bedTime: '', endTime: '', amountToCharge: '0'};
    this.calculatePay = this.calculatePay.bind(this);
    //this.amountToCharge = React.createRef(); tried to create ref to update amountToCharge value, found better way with querySelector
  }

  changeStartTimeField(event){
    console.log(event);
    if(event < "17:00"){
      alert("Start Time must be after 5:00P.M.");
      this.setState({startTime: ''});
    }
    else
      this.setState({startTime: event});
  }

  changeBedTimeField(event){
    console.log(event);
    this.setState({bedTime: event});
  }

  changeEndTimeField(event){
    console.log(event);
    if(event > "04:00")
      alert("End Time must be before 4:00A.M.");
    else
      this.setState({endTime: event});
  }

  calculatePay(event) {
    event.preventDefault();
    let amountToCharge = 0;
    let startTime = this.state.startTime;
    let bedTime = this.state.bedTime;
    let endTime = this.state.endTime;

    this.validateTimes(startTime, bedTime, endTime);

    document.querySelector('#amountToCharge').innerText = amountToCharge;
  }

  validateTimes(startTime, bedTime, endTime) {



  }

  render() {
    return (
      <div>
        <form onSubmit={this.calculatePay} id="calcPayForm">
          <label>Start Time:</label>
          <TimePicker id="startTimePicker" disableClock={true} value={this.state.startTime} onChange={this.changeStartTimeField.bind(this)}/>
          <br/>
          <br/>
          <label>Bed Time:</label>
          <TimePicker id="bedTimePicker" disableClock={true} value={this.state.bedTime} onChange={this.changeBedTimeField.bind(this)}/>
          <br/>
          <br/>
          <label>End Time:</label>
          <TimePicker id="endTimePicker" disableClock={true} value={this.state.endTime} onChange={this.changeEndTimeField.bind(this)}/>
          <br/>
          <br/>
          <input type="submit" value="Calculate Pay" id="calcPayButton"/>
        </form>
        <br/>
        <div id="amountToCharge"></div>
      </div>
    )
  }
}

export default CalculatePayForm;
