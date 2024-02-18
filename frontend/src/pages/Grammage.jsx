import React, { memo, useEffect, useRef } from "react";
import { Card, Typography } from "@material-tailwind/react";

function Grammage(props) {
  const TABLE_HEAD = useRef(["Waktu", "Shift 1", "Shift 2", "Shift 3", "Shift 4", "Average"]);
  const TABLE_FOOT = useRef(["Average", "70 Gram", "70 Gram", "70 Gram", "70 Gram", "70 Gram"]);

  const TABLE_ROWS = [
    {
      dateTime: "06:00",
      shift1: 70,
      shift2: 70,
      shift3: 70,
      shift4: 70,
      average: 70,
    },
    {
      dateTime: "07:00",
      shift1: 70,
      shift2: 70,
      shift3: 70,
      shift4: 70,
      average: 70,
    },
    {
      dateTime: "08:00",
      shift1: 70,
      shift2: 70,
      shift3: 70,
      shift4: 70,
      average: 70,
    },
    {
      dateTime: "09:00",
      shift1: 70,
      shift2: 70,
      shift3: 70,
      shift4: 70,
      average: 70,
    },
    {
      dateTime: "10:00",
      shift1: 70,
      shift2: 70,
      shift3: 70,
      shift4: 70,
      average: 70,
    },
    {
      dateTime: "11:00",
      shift1: 70,
      shift2: 70,
      shift3: 70,
      shift4: 70,
      average: 70,
    },
    {
      dateTime: "13:00",
      shift1: 70,
      shift2: 70,
      shift3: 70,
      shift4: 70,
      average: 70,
    },
    {
      dateTime: "14:00",
      shift1: 70,
      shift2: 70,
      shift3: 70,
      shift4: 70,
      average: 70,
    },
    {
      dateTime: "15:00",
      shift1: 70,
      shift2: 70,
      shift3: 70,
      shift4: 70,
      average: 70,
    },
    {
      dateTime: "16:00",
      shift1: 70,
      shift2: 70,
      shift3: 70,
      shift4: 70,
      average: 70,
    },
    {
      dateTime: "17:00",
      shift1: 70,
      shift2: 70,
      shift3: 70,
      shift4: 70,
      average: 70,
    },
  ];

  useEffect(() => {}, []);

  return (
    <div className="h-full flex flex-col">
      <div className="py-4 px-8">
        <div className="text-gray-700">Tanggal</div>
        <div className="font-bold text-3xl">08 Februari 2024</div>
      </div>
      <div className="flex-1 w-full overflow-hidden pb-4 px-8">
        <Card className="h-full w-full overflow-hidden flex flex-col">
          <div className="grid grid-cols-6 bg-black border-b border-blue-gray-100 ">
            {TABLE_HEAD.current.map((head) => (
              <div key={head} className="p-4">
                <Typography variant="small" color="white" className="font-bold leading-none text-md">
                  {head}
                </Typography>
              </div>
            ))}
          </div>
          <div className="overflow-y-auto gutter-stable">
            {TABLE_ROWS.map(({ dateTime, shift1, shift2, shift3, shift4, average }, index) => {
              return (
                <div key={index} className="grid grid-cols-6 [&>div]:p-4 [&>div]:border-b [&>div]:border-blue-gray-50 -mr-[17px]">
                  <div>
                    <Typography variant="small" color="blue-gray" className="font-bold">
                      {dateTime}
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {shift1} Gram
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {shift2} Gram
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {shift3} Gram
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {shift4} Gram
                    </Typography>
                  </div>
                  <div className="p-4 border-b !border-white bg-blue-gray-50">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {average} Gram
                    </Typography>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="grid grid-cols-6">
            {TABLE_FOOT.current.map((foot, index) => (
              <div key={index + "-foot"} className="border-b border-blue-gray-100 bg-black py-4 pr-4 pl-[15px]">
                <Typography variant="small" color="white" className="font-bold leading-none text-md">
                  {foot}
                </Typography>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

Grammage.propTypes = {};

export default memo(Grammage);
