"use client";
import { useState, useEffect } from "react";
import "./table.css";

interface Props {
  data: { name: string; superpower: string; humility: number }[];
}

export default function TableData(props: Props) {
  return (
    <>
      <table>
        <thead>
          <tr key="rowheader">
            <th className="name-box" key="nameheader">
              Name
            </th>
            <th className="superpower-box" key="superpowerheader">
              Superpower
            </th>
            <th className="humility-box" key="humilityheader">
              Humility Rating
            </th>
          </tr>
        </thead>
        <tbody>
          {[...props.data].map((datum, index) => {
            return (
              <tr key={"row" + index}>
                <td className="name-box" key={"name" + index}>
                  {datum.name}
                </td>
                <td className="superpower-box" key={"superpower" + index}>
                  {datum.superpower}
                </td>
                <td className="humility-box" key={"humility" + index}>
                  {datum.humility}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
