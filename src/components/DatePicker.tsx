import { FormControl, Input, InputLabel, type InputProps } from "@mui/material";

export interface IDatePicker extends InputProps {
  name: string;
  inputLabel: string;
}

export const DatePicker = ({ name, inputLabel, ...rest }: IDatePicker) => {
  return (
    <div className="date-picker-container">
      <InputLabel>
        {inputLabel}
        <Input type="date" name={name} {...rest} />
      </InputLabel>
    </div>
  );
};
