import { Button, ButtonGroup as BGroup } from "@mui/material";
import React from "react";

type Iprops = {
  games: string[] | (number | undefined)[];
};

export const ButtonGroup = (props: Iprops) => {
  return (
    <BGroup variant="text" aria-label="Home Games">
      {props.games.map((gm) => (
        <Button>{gm}</Button>
      ))}
    </BGroup>
  );
};
