import React, { useState } from "react";
import { View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker"; // Ensure this import is correct

const DateTimePickerComponent = ({ date, time, setTime, setDate, setShow, show }) => {

  const [showTime,setShowTime]= useState(false);

  // Initialize date as a valid Date object if undefined
  if (!(date instanceof Date)) {
    date = new Date();
  }

  const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`; // DD-MM-YYYY format

  const minimumDate = new Date(); // Current date
  const maximumDate = new Date();
  maximumDate.setDate(maximumDate.getDate() + 7); // Add 7 days to the current date

  const handleChange = (event, selectedDate) => {
    if (selectedDate) {
      if(show){
        setDate(selectedDate); // Update the date state
        setShow(false)
        setShowTime(true)
      }else if(showTime){
        setTime(selectedDate)
        setShowTime(false);
      }
    }else{
      setShow(false); // Hide the picker
      setShowTime(false);
    }

  };

  return (
    <View>
      {show && (
        <DateTimePicker
          mode="date"
          value={date} // Ensure this is a valid Date object
          display="default"
          onChange={handleChange}
          minimumDate={minimumDate} // Earliest selectable date
          maximumDate={maximumDate} // Latest selectable date
        />
      )}
      {showTime && (
        <DateTimePicker
          mode="time"
          value={time} // Ensure this is a valid Date object
          display="default"
          onChange={handleChange}
        />
      )}
    </View>
  );
};

export default DateTimePickerComponent;
