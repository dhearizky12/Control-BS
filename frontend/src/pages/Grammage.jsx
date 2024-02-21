import React, { memo, useEffect, useRef, useState } from "react";
import { Card, Typography, Button, Dialog, DialogHeader, DialogBody, DialogFooter, Input, Select, Option, Spinner } from "@material-tailwind/react";
import { PlusIcon } from "@heroicons/react/24/outline";

function Grammage() {
  const TABLE_HEAD = useRef(["Waktu Shift", "Sample 1", "Sample 2", "Sample 3", "Sample 4", "Average"]);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [grammagesData, setGrammagesData] = useState([]);
  const [averageSample, setAverageSample] = useState([0, 0, 0, 0, 0]);

  useEffect(() => {
    setLoading(true);
    fetch("/api/grammages", { method: "GET" })
      .then((responses) => responses.json())
      .then((responses) => {
        setLoading(false);
        let averageSample = [];

        setGrammagesData(
          responses.map((grammage) => {
            grammage.shift =
              new Date(grammage.shift.time).getUTCHours().toString().padStart(2, "0") +
              ":" +
              new Date(grammage.shift.time).getUTCMinutes().toString().padStart(2, "0");

            // calculate sample average
            averageSample[0] = averageSample[0] ? (averageSample[0] + grammage.sample1) / 2 : grammage.sample1;
            averageSample[1] = averageSample[1] ? (averageSample[1] + grammage.sample2) / 2 : grammage.sample2;
            averageSample[2] = averageSample[2] ? (averageSample[2] + grammage.sample3) / 2 : grammage.sample3;
            averageSample[3] = averageSample[3] ? (averageSample[3] + grammage.sample4) / 2 : grammage.sample4;
            averageSample[4] = averageSample[4] ? (averageSample[4] + grammage.average) / 2 : grammage.average;

            return grammage;
          })
        );

        setAverageSample(averageSample);
      })
      .catch((error) => {
        setLoading(false);
        console.error("API Error:", error);
      });

    return () => {};
  }, []);

  const handleOpen = () => setOpen(!open);

  return (
    <div className="h-full flex flex-col">
      <div className="py-4 px-8 flex items-end gap-2">
        <div className="flex-1">
          <div className="text-gray-700">Tanggal</div>
          <div className="font-bold text-3xl">08 Februari 2024</div>
        </div>
        <div>
          <Button onClick={handleOpen} className="flex items-center gap-2">
            <PlusIcon className="h-5 w-5" />
            Add Grammage
          </Button>
        </div>
      </div>
      <div className="flex-1 w-full overflow-hidden pb-4 px-8">
        <Card className="max-h-full h-fit w-full overflow-hidden flex flex-col">
          <div className="grid grid-cols-6 bg-black border-b border-blue-gray-100 ">
            {TABLE_HEAD.current.map((head) => (
              <div key={head} className="p-4">
                <Typography color="white" className="font-bold leading-none text-md">
                  {head}
                </Typography>
              </div>
            ))}
          </div>
          <div className="overflow-y-auto overflow-x-hidden gutter-stable">
            {grammagesData.length ? (
              grammagesData.map(({ shift, sample1, sample2, sample3, sample4, average }, index) => {
                return (
                  <div key={index} className="grid grid-cols-6 [&>div]:p-4 [&>div]:border-b [&>div]:border-blue-gray-50 -mr-[17px]">
                    <div>
                      <Typography color="blue-gray" className="font-bold">
                        {shift}
                      </Typography>
                    </div>
                    <div>
                      <Typography color="blue-gray" className="font-normal">
                        {sample1} Kg
                      </Typography>
                    </div>
                    <div>
                      <Typography color="blue-gray" className="font-normal">
                        {sample2} Kg
                      </Typography>
                    </div>
                    <div>
                      <Typography color="blue-gray" className="font-normal">
                        {sample3} Kg
                      </Typography>
                    </div>
                    <div>
                      <Typography color="blue-gray" className="font-normal">
                        {sample4} Kg
                      </Typography>
                    </div>
                    <div className="p-4 border-b !border-white bg-blue-gray-50">
                      <Typography color="blue-gray" className="font-bold">
                        {average} Kg
                      </Typography>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="px-3 py-5 text-center">
                {loading ? (
                  <div className="flex gap-2 items-center justify-center">
                    <Spinner /> Memuat Data...
                  </div>
                ) : (
                  "Data Kosong"
                )}
              </div>
            )}
          </div>
          {grammagesData.length > 0 && (
            <div className="grid grid-cols-6">
              <div className="border-b border-blue-gray-100 bg-black py-4 pr-4 pl-[15px]">
                <Typography color="white" className="font-bold leading-none text-md">
                  Average
                </Typography>
              </div>
              {averageSample.map((foot, index) => (
                <div key={index + "-foot"} className="border-b border-blue-gray-100 bg-black py-4 pr-4 pl-[15px]">
                  <Typography color="white" className="font-bold leading-none text-md">
                    {foot}
                  </Typography>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Add Grammage</DialogHeader>
        <DialogBody>
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <Select label="Select Time">
                <Option>06:00</Option>
                <Option>07:00</Option>
                <Option>08:00</Option>
                <Option>09:00</Option>
                <Option>10:00</Option>
                <Option>11:00</Option>
                <Option>13:00</Option>
                <Option>14:00</Option>
                <Option>15:00</Option>
                <Option>16:00</Option>
                <Option>17:00</Option>
              </Select>
            </div>
            <div></div>
            <div className="mb-1">
              <Input label="Sample 1" size="lg" placeholder="example: 70" />
            </div>
            <div className="mb-1">
              <Input label="Sample 2" size="lg" placeholder="example: 70" />
            </div>
            <div className="mb-1">
              <Input label="Sample 3" size="lg" placeholder="example: 70" />
            </div>
            <div className="mb-1">
              <Input label="Sample 4" size="lg" placeholder="example: 70" />
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={handleOpen} className="mr-3">
            <span>Cancel</span>
          </Button>
          <Button color="green" onClick={handleOpen}>
            <span>Save</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

Grammage.propTypes = {};

export default memo(Grammage);
