import React, { Component } from 'react';
import './CalculatePayForm.css';
import TimePicker from 'react-time-picker'; //going with react-time-picker
//import '../../node_modules/jquery-timepicker/jquery.timepicker.js';
//import '../../node_modules/jquery-timepicker/jquery.timepicker.css';
//tried various timepickers, couldnt' get jquery timepicker to work

class CalculatePayForm extends Component {

  constructor(props){
    super(props);
    this.state = {startTime: null, bedTime: null, endTime: null, amountToCharge: '0'};
    this.calculatePay = this.calculatePay.bind(this);
    this.startTimeRef = React.createRef();
    //this.amountToCharge = React.createRef(); tried to create ref to update amountToCharge value, found better way with querySelector
  }

  changeStartTimeField(event){
    console.log(event);
    this.setState({startTime: event});
    //if(event < "17:00"){
      //alert("Start Time must be after 5:00P.M.");
      // console.log(document.getElementById("startTimePicker").value); logging
      // console.log(document.querySelector("#startTimePicker").value);
      //this.refs.startTimePicker.value = ""; setting up the ref didn't quite work either
      //this.setState({startTime: null});
      //console.log(this.startTimeRef.value);
      //this.startTimeRef.current.value = null;
      //document.querySelector('startTimePicker').value = ""; tried to set value to empty, couldn't grab it this way
    //}
  }

  changeBedTimeField(event){
    console.log(event);
    this.setState({bedTime: event});
  }

  changeEndTimeField(event){
    console.log(event);
    // if(event > "04:00") //Removed validation here, no way to reset timepicker easily
    //   alert("End Time must be before 4:00A.M.");
    // else
      this.setState({endTime: event});
  }

  calculatePay(event) {
    event.preventDefault();
    let amountToCharge = 0;
    let startTime = this.state.startTime;
    let bedTime = this.state.bedTime;
    let endTime = this.state.endTime;

    if(this.validateTimes(startTime, bedTime, endTime))
      document.querySelector('#amountToCharge').innerText = amountToCharge;
  }

  validateTimes(startTime, bedTime, endTime) {
    let alertMessage = "";

    if(startTime === null || bedTime === null || endTime === null){
      alertMessage += "Please fill in all fields before submitting\n\n";
    }

    if(startTime < "17:00" && startTime > bedTime){
      alertMessage += "Start Time must be between 5:00P.M and Bed Time\n\n";
    }

    if(bedTime < startTime || bedTime > endTime){
      alertMessage += "Bed Time must be between Start Time and End Time\n\n";
    }

    if(bedTime >= "12:00"){
      alertMessage += "Bed Time must be before Midnight\n\n";
    }

    if(endTime < "12:00" && endTime > "04:00"){
      alertMessage += "End Time must be between Midnight and 4:00A.M\n\n";
    }

    if(alertMessage !== ""){
      alert(alertMessage);
      return false;
    }

    return true;
  }

  render() {
    return (
      <div>
        <form onSubmit={this.calculatePay} id="calcPayForm">
          <label>Start Time</label>
          <TimePicker ref={this.startTimeRef} disableClock={true} value={this.state.startTime} onChange={this.changeStartTimeField.bind(this)}/>
          <br/>
          <br/>
          <label>Bed Time</label>
          <TimePicker id="bedTimePicker" disableClock={true} value={this.state.bedTime} onChange={this.changeBedTimeField.bind(this)}/>
          <br/>
          <br/>
          <label>End Time</label>
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
