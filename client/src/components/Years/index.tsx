import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/";
import { BsCheckLg } from "react-icons/bs";
import { change } from "@/redux/yearSlice";
import "./styles.scss";
import clsx from "clsx";

const years = ["2019", "2020", "2021", "2022", "2023"];

function Years() {
  const dispatch = useDispatch();
  const yearValue = useSelector((state: RootState) => state.year.value);
  const handleClick = (value: string) => {
    dispatch(change(value));
  };
  return (
    <ul className="years">
      {years.map((year) => (
        <li
          key={year}
          className={clsx([
            "years_item",
            year === yearValue ? "years_item--active" : "",
          ])}
          onClick={() => handleClick(year)}
        >
          {year === yearValue && <BsCheckLg className="years_item_check" />}{" "}
          {year}
        </li>
      ))}
    </ul>
  );
}

export default Years;
