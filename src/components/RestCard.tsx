import { useState } from "react";
import { TRestaurant } from "../types/types";
import { getRestName } from "../utils/getRestName";
import Button from "./Button";

interface IRestCardProps {
  rest: TRestaurant;
}

const RestCard = ({ rest }: IRestCardProps) => {
  const [wasUpdated, setWasUpdated] = useState(false);
  const [updatedDate, setUpdatedDate] = useState<Date | null>(null);

  return (
    <div className=" rounded-md p-6 dark:bg-transparent border-bagel border-[0.5px] shadow-sm shadow-bagel flex flex-col justify-between">
      <div className="flex justify-between mb-12">
        <h2 className="text-2xl font-semibold">{getRestName(rest)}</h2>
        <Button text="Pull reviews" onClick={() => {
            setWasUpdated(true);
            setUpdatedDate(new Date());
        }} />
      </div>
      <div>
        {wasUpdated ? (
            <>
          <div className="flex gap-4 items-center mb-4">
          <div className="flex gap-2 items-center">
            <p>Count:</p>
            <span>4555</span>
          </div>
          <div className="flex gap-2 items-center">
            <p>Rating:</p>
            <span className="bg-green-500 py-1 px-2 rounded-md">4.720</span>
          </div>
        </div>
        <p>
          Last updated at: <span>{
            updatedDate && updatedDate.toLocaleTimeString()
            }</span>
        </p>
        </>
        ) : (
          <p className="text-center text-red-500">Pull reviews to see the latest data</p>
        )}
      </div>
    </div>
  );
};

export default RestCard;
