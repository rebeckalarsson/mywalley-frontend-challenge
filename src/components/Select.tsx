import {
  FormControl,
  InputLabel,
  MenuItem,
  Select as SelectComp,
  type SelectChangeEvent,
  type SelectProps,
} from "@mui/material";

interface ISelectPropsCustom {
  onChange: (event: SelectChangeEvent<string>) => void;
  inputLabel: string;
  selectItems: ISelectItems[];
  valueSelect: string;
}

type ISelectProps = SelectProps<string> & ISelectPropsCustom;

export interface ISelectItems {
  label: string;
  value: string;
}

export const Select = ({
  inputLabel,
  selectItems,
  valueSelect,
  onChange,
  ...rest
}: ISelectProps) => {
  return (
    <FormControl fullWidth>
      <InputLabel>{inputLabel}</InputLabel>
      <SelectComp
        labelId={inputLabel}
        value={valueSelect}
        onChange={onChange}
        {...rest}
      >
        {selectItems.map((item, _i) => {
          return (
            <MenuItem key={item.value + _i} value={item.value}>
              {item.label}
            </MenuItem>
          );
        })}
      </SelectComp>
    </FormControl>
  );
};
