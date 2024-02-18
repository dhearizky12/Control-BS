import React, { memo, useRef } from "react";
import { Card, Typography, Button, Dialog, DialogHeader, DialogBody, DialogFooter, Input, Select, Option } from "@material-tailwind/react";
import { PlusIcon } from "@heroicons/react/24/outline";

function Grammage() {
  const TABLE_HEAD = useRef(["Waktu", "Sample 1", "Sample 2", "Sample 3", "Sample 4", "Average"]);
  const TABLE_FOOT = useRef(["Average", "70 Kg", "70 Kg", "70 Kg", "70 Kg", "70 Kg"]);

  const TABLE_ROWS = [
    {
      dateTime: "06:00",
      sample1: 70,
      sample2: 70,
      sample3: 70,
      sample4: 70,
      average: 70,
    },
    {
      dateTime: "07:00",
      sample1: 70,
      sample2: 70,
      sample3: 70,
      sample4: 70,
      average: 70,
    },
    {
      dateTime: "08:00",
      sample1: 70,
      sample2: 70,
      sample3: 70,
      sample4: 70,
      average: 70,
    },
    {
      dateTime: "09:00",
      sample1: 70,
      sample2: 70,
      sample3: 70,
      sample4: 70,
      average: 70,
    },
    {
      dateTime: "10:00",
      sample1: 70,
      sample2: 70,
      sample3: 70,
      sample4: 70,
      average: 70,
    },
    {
      dateTime: "11:00",
      sample1: 70,
      sample2: 70,
      sample3: 70,
      sample4: 70,
      average: 70,
    },
    {
      dateTime: "13:00",
      sample1: 70,
      sample2: 70,
      sample3: 70,
      sample4: 70,
      average: 70,
    },
    {
      dateTime: "14:00",
      sample1: 70,
      sample2: 70,
      sample3: 70,
      sample4: 70,
      average: 70,
    },
    {
      dateTime: "15:00",
      sample1: 70,
      sample2: 70,
      sample3: 70,
      sample4: 70,
      average: 70,
    },
    {
      dateTime: "16:00",
      sample1: 70,
      sample2: 70,
      sample3: 70,
      sample4: 70,
      average: 70,
    },
    {
      dateTime: "17:00",
      sample1: 70,
      sample2: 70,
      sample3: 70,
      sample4: 70,
      average: 70,
    },
  ];

  const [open, setOpen] = React.useState(false);

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
                <Typography variant="small" color="white" className="font-bold leading-none text-md">
                  {head}
                </Typography>
              </div>
            ))}
          </div>
          <div className="overflow-y-auto gutter-stable">
            {TABLE_ROWS.map(({ dateTime, sample1, sample2, sample3, sample4, average }, index) => {
              return (
                <div key={index} className="grid grid-cols-6 [&>div]:p-4 [&>div]:border-b [&>div]:border-blue-gray-50 -mr-[17px]">
                  <div>
                    <Typography variant="small" color="blue-gray" className="font-bold">
                      {dateTime}
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {sample1} Kg
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {sample2} Kg
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {sample3} Kg
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {sample4} Kg
                    </Typography>
                  </div>
                  <div className="p-4 border-b !border-white bg-blue-gray-50">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {average} Kg
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
