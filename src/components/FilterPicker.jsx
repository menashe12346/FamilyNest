import React from "react";
import { Picker } from "@react-native-picker/picker";

const FilterPicker = ({ selectedValue, onValueChange, options, label }) => (
  <Picker selectedValue={selectedValue} onValueChange={onValueChange}>
    <Picker.Item label={`All ${label}`} value={null} />
    {options.map((option, index) => (
      <Picker.Item key={index} label={option} value={option} />
    ))}
  </Picker>
);

export default FilterPicker;
