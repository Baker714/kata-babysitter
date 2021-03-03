import React, { Component } from 'react';
import './CalculatePayForm.css';
import TimePicker from 'react-time-picker'; //going with react-time-picker
//import '../../node_modules/jquery-timepicker/jquery.timepicker.js';
//import '../../node_modules/jquery-timepicker/jquery.timepicker.css';
//tried various timepickers, couldnt' get jquery timepicker to work

const timeArray = ["17","18","19","20","21","22","23","00","01","02","03","04"]; //creating timeArray list to properly calculate hours babysitting. Changed to two length strings to account for half/quarter hours.
                                                                                                                    //Changing back because Full Hours (5:30 t Midnight wouldn't make sense otherwise)

class CalculatePayForm extends Component {

  constructor(props){
    super(props);
    this.state = {startTime: "", bedTime: "", endTime: ""};
    this.submitForm = this.submitForm.bind(this);
    //this.amountToCharge = React.createRef(); tried to create ref to update amountToCharge value, found better way with querySelector. Update, did not find a better way
  }

  changeStartTimeField(event) {
    console.log(event);
    this.setState({startTime: event});//tartTimeString.substring(0,2)});
  }
    //let startTimeString = event.toString(); Was going to grab only substring to account for half hours, going to do that in the calculatePay method now
    // console.log(startTimeHour);
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

  changeBedTimeField(event) {
    this.setState({bedTime: event});//bedTimeHour});
    //let bedTimeString = event.toString(); Was going to convert to grab substring, unneeded now
    // console.log(event.toString());
  }

  changeEndTimeField(event) {
    this.setState({endTime: event});
  }
    // let endTimeString = event.toString();
    // console.log(event);
    // if(event > "04:00") //Removed validation here, no way to reset timepicker easily
    //   alert("End Time must be before 4:00A.M.");
    // else

  submitForm(event) {
    event.preventDefault();
    // let startTime = this.state.startTime;
    // let bedTime = this.state.bedTime;
    // let endTime = this.state.endTime;
    let startTimeString = this.state.startTime.toString();
    let bedTimeString = this.state.bedTime.toString();
    let endTimeString = this.state.endTime.toString();
    // console.log(typeof startTime);
    if(this.validateTimes(startTimeString, bedTimeString, endTimeString)) {
      this.calculatePay(startTimeString, bedTimeString, endTimeString);
    }
  }

  //Put this in its own method for easier unit testing
  calculatePay(startTimeString, bedTimeString, endTimeString) {
    let amountToCharge = 0;
    let startTimeHour = startTimeString.substring(0,2);
    let bedTimeHour = bedTimeString.substring(0,2);
    let endTimeHour = endTimeString.substring(0,2);

    amountToCharge += Math.abs((timeArray.indexOf(bedTimeHour)-timeArray.indexOf(startTimeHour)))*12;
    amountToCharge += Math.abs((timeArray.indexOf("00")-timeArray.indexOf(bedTimeHour)))*8;
    amountToCharge += Math.abs((timeArray.indexOf(endTimeHour)-timeArray.indexOf("00")))*16;
    document.querySelector('#amountToCharge').innerText = "$"+amountToCharge.toFixed(2);
  }

  validateTimes(startTimeString, bedTimeString, endTimeString) {
    let startTimeHour = startTimeString.substring(0,2);
    let bedTimeHour = bedTimeString.substring(0,2);
    let endTimeHour = endTimeString.substring(0,2);

    let alertMessage = "";
    // console.log(startTime); //Logging for testing
    if(startTimeString === "" || bedTimeString === "" || endTimeString === ""){
      alertMessage = "Please fill in all fields before submitting";
      alert(alertMessage);
      return false;
    }

    if(startTimeString.substring(3,5) !== "00" || bedTimeString.substring(3,5) !== "00"  || endTimeString.substring(3,5) !== "00" ){
      alertMessage = "Please use only whole hours";
      alert(alertMessage);
      return false;
    }

    if(timeArray.indexOf(endTimeHour) === -1 || timeArray.indexOf(endTimeHour) < timeArray.indexOf("00")){
      alertMessage = "End Time must be between Midnight and 4:00A.M.";
      alert(alertMessage);
      return false;
    }

    if(timeArray.indexOf(startTimeHour) === -1 || timeArray.indexOf(startTimeHour) > timeArray.indexOf("00")){
      alertMessage = "Start Time must be between 5:00P.M. and Midnight";
      alert(alertMessage);
      return false;
    }

    if(!(timeArray.indexOf(startTimeHour) < timeArray.indexOf(bedTimeHour) && timeArray.indexOf(bedTimeHour < timeArray.indexOf(endTimeHour)))){
      alertMessage = "Bed Time must be between Start Time and End Time";
      alert(alertMessage);
      return false;
    }

    //Allowing Bed Time to be midnight here, but no later.
    if(timeArray.indexOf(bedTimeHour) > timeArray.indexOf("00"))
    {
      alertMessage = "Bed Time must be Midnight or earlier";
      alert(alertMessage);
      return false;
    }
    return true;
  }

    //Validation I got rid of after refactoring
    // if(timeArray.indexOf(bedTimeHour) === -1 || timeArray.indexOf(bedTimeHour) > timeArray.indexOf("00") || timeArray.indexOf(bedTimeHour) <= timeArray.indexOf(startTimeHour)){
    //   alertMessage = "Bed Time must be between Start Time and Midnight";
    //   alert(alertMessage);
    //   return false;
    // }
    // console.log(timeArray.indexOf(startTime)); //Logging for testing

    // if(timeArray.indexOf(bedTimeHour) === -1 || timeArray.indexOf(bedTimeHour) <= timeArray.indexOf(startTimeHour) || timeArray.indexOf(bedTimeHour) >= timeArray.indexOf(endTimeHour)){
    //   alertMessage = "Bed Time must be between Start Time and End Time";
    //   alert(alertMessage);
    //   return false;
    // }

  render() {
    return (
      <div id="calcPayDiv">
        <form onSubmit={this.submitForm} id="calcPayForm">
          <div className="timePickerDiv" id="startTimeDiv">Start Time: <TimePicker id="startTimePicker" disableClock={true}  clearIcon={null} value={this.state.startTime} onChange={this.changeStartTimeField.bind(this)}/>
          </div>
          <br/>
          <div className="timePickerDiv" id="bedTimeDiv">Bed Time: <TimePicker id="bedTimePicker" disableClock={true} clearIcon={null} value={this.state.bedTime} onChange={this.changeBedTimeField.bind(this)}/>
          </div>
          <br/>
          <div className="timePickerDiv" id="endTimeDiv">End Time: <TimePicker id="endTimePicker" disableClock={true} clearIcon={null} value={this.state.endTime} onChange={this.changeEndTimeField.bind(this)}/>
          </div>
          <br/>
          <input type="submit" value="Calculate Pay" id="calcPayButton"/>
        </form>
        <br/>
        <div id="amountToCharge">
        </div>
      </div>
    )
  }
}

export default CalculatePayForm;
