"use client";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { SuperheroState } from "../page";
import "./input.css";

interface InputProps {
  baseState: SuperheroState;
  onChange: Dispatch<SetStateAction<SuperheroState>>;
}

export default function Input(props: InputProps) {
  const [data, setData] = useState({
    name: "",
    superpower: "",
    humility: 0,
    valid: true,
  });
  const postData = () => {
    fetch("api/superhero", {
      method: "POST",
      body: JSON.stringify({
        name: data.name,
        humility: data.humility,
        superpower: data.superpower,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setData({ name: "", superpower: "", humility: 0, valid: true });
        // updates the changed value of the parent state, used so useEffect fetches the Superheroes on load and on every future change, but doesn't get stuck in a loop
        props.onChange({ ...props.baseState, changed: true });
      });
  };

  return (
    <>
      <label>name:</label>
      <input
        value={data.name}
        onChange={(e) => setData({ ...data, name: e.target.value })}
        id="name"
      ></input>

      <label>superpower:</label>
      <input
        value={data.superpower}
        onChange={(e) => setData({ ...data, superpower: e.target.value })}
        id="superpower"
      ></input>

      <label>humility rating:</label>
      <input
        value={data.humility}
        onChange={(e) =>
          setData({
            ...data,
            humility: +e.target.value,
            valid: +e.target.value >= 1 && +e.target.value <= 10,
          })
        }
        type="number"
        id="humility"
      ></input>
      {/* if the data is not valid, the button used to send the data is disabled*/}
      <button disabled={!data.valid} onClick={postData}>
        save
      </button>
      {/* label presenting the information that the hummility field is filled incorrectly */}
      {data.valid ? null : (
        <label className="invalidDataLabel">
          Humility should be between 1 and 10
        </label>
      )}
    </>
  );
}
