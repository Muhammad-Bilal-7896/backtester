import React, {} from "react";
import {FormControl, FormLabel, TextField} from "@material-ui/core";
import {Autocomplete} from "@material-ui/lab";

const arr1 = ['item 1', 'item 2', 'item 3'];
const arr2 = ['item 1', 'item 2', 'item 3'];
const arr3 = ['item 1', 'item 2', 'item 3'];

interface Group2Value {
  input1: string | null;
  input2: string | null;
  input3: string | null;
}

const Group2: React.FC<{index: number, onSetValues: (values: Group2Value) => void}> = ({index, onSetValues}) => {
  const [input1, setInput1] = React.useState<string | null>(null);
  const [input2, setInput2] = React.useState<string | null>(null);
  const [input3, setInput3] = React.useState<string | null>(null);


  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Group 2 - Index: {index}</FormLabel>
      <Autocomplete
        id={`group2_input1_${index}`}
        value={input1}
        options={arr1}
        renderInput={(params) => <TextField {...params} label="Input 1" variant="outlined"/>}
        onChange={(e, v) => {
          setInput1(v);
          onSetValues({input1: v, input2, input3})
        }}
      />
      {input1 && <Autocomplete
        id={`group2_input2_${index}`}
        value={input2}
        options={arr2}
        renderInput={(params) => <TextField {...params} label="Input 2" variant="outlined"/>}
        onChange={(e, v) => {
          setInput2(v);
          onSetValues({input1, input2: v, input3})
        }}
      />}
      {input2 && <Autocomplete
        id={`group2_input3_${index}`}
        value={input3}
        options={arr3}
        renderInput={(params) => <TextField {...params} label="Input 3" variant="outlined"/>}
        onChange={(e, v) => {
          setInput3(v);
          onSetValues({input1, input2, input3: v})
        }}
      />}
    </FormControl>
  );
}

export { Group2 }
export type { Group2Value }
