"use client";
import { useState, useEffect } from "react";
import Input from "./superhero/input";
import TableData from "./superhero/table";

export interface SuperheroData {
  name: string;
  superpower: string;
  humility: number;
}
export interface SuperheroState {
  data: SuperheroData[];
  changed: boolean;
}

export default function Superhero() {
  const [state, setState] = useState({
    data: [],
    changed: false,
  } as SuperheroState);
  useEffect(() => {
    fetch("api/superhero")
      .then((res) => {
        return res.json();
      })
      .then((resAsJSON) => {
        setState({ data: resAsJSON.data, changed: false });
      });
  }, [state.changed]);

  return (
    <>
      {/* contains the inputs for the creation of new superheroes */}
      <Input baseState={state} onChange={setState}></Input>
      {/* presents the superhero data in a table format */}
      <TableData data={state.data}></TableData>
    </>
  );
}
