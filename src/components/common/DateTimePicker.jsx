//not used
import React from "react";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

function DateTimePicker() {
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <DateTimePicker value={selectedDate} onChange={this.handleDateChange} />
    </MuiPickersUtilsProvider>
  );
}

export default DateTimePicker;
