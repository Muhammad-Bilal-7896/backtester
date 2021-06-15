import React from "react";
import {Button, FormControl, FormLabel} from "@material-ui/core";

const Group3: React.FC<{onButtonPress: () => void}> = ({onButtonPress}) => {
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Group 3</FormLabel>
      <Button variant="contained" onClick={onButtonPress}>LOG</Button>
      <Button variant="contained" color="primary" onClick={onButtonPress}>
        LOG
      </Button>
    </FormControl>
  );
}

export { Group3 }
