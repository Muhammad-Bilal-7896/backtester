import React from "react";
import {RadioGroup, FormControlLabel, Radio, FormControl, FormLabel, Grid} from "@material-ui/core";

const Group1: React.FC<{ value: number, setValue: (value: number) => void }> = ({value, setValue}) => {
  const handleChange = (event: any) => {
    setValue(parseInt(event.target.value));
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Group 1</FormLabel>
      <RadioGroup aria-label="group1" name="group1" value={value.toString()} onChange={handleChange}>
        <Grid container direction="row">
          {[...Array(10)].map((v, index) => {
            const option = index + 1;
            return <FormControlLabel key={`group1_radio_${option}`} value={option.toString()} control={<Radio/>}
                                     label={option.toString()}/>;
          })}
        </Grid>
      </RadioGroup>
    </FormControl>
  );
}

export {Group1}
