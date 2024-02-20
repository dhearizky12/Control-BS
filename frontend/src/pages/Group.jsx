import React, { memo } from "react";
import { Card, Typography, Button, Dialog, DialogHeader, DialogBody, DialogFooter, Input, Select, Option } from "@material-tailwind/react";
import { PlusIcon } from "@heroicons/react/24/outline";

function Group() {
  const TABLE_ROWS = [
    {
      name: "Group 1",
    },
    {
      name: "Group 2",
    },
  ];

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <div className="h-full flex flex-col">
      <div className="py-4 px-8 flex items-end gap-2">
        <div className="flex-1">
          <div className="font-bold text-3xl">Master Data Group </div>
        </div>
        <div>
          <Button onClick={handleOpen} className="flex items-center gap-2">
            <PlusIcon className="h-5 w-5" />
            Add Group
          </Button>
        </div>
      </div>
      <div className="flex-1 w-full overflow-hidden pb-4 px-8">
        <Card className="max-h-full h-fit w-full overflow-hidden flex flex-col">
          <div className="flex bg-black border-b border-blue-gray-100 ">
            <div key="name" className="p-4 flex-1">
              <Typography variant="small" color="white" className="font-bold leading-none text-md">
                Nama Group
              </Typography>
            </div>
            <div key="name" className="p-4 w-[217.89px]">
              <Typography variant="small" color="white" className="font-bold leading-none text-md">
                Aksi
              </Typography>
            </div>
          </div>
          <div className="overflow-y-auto overflow-x-hidden gutter-stable">
            {TABLE_ROWS.map(({ name }, index) => {
              return (
                <div key={index} className="flex [&>div]:p-4 [&>div]:border-b [&>div]:border-blue-gray-50 -mr-[17px]">
                  <div className="flex-1 flex items-center">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {name}
                    </Typography>
                  </div>
                  <div className="flex gap-3 w-[217.89px]">
                    <Button variant="outlined" color="red">
                      Delete
                    </Button>
                    <Button variant="outlined">Edit</Button>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Add Group</DialogHeader>
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

Group.propTypes = {};

export default memo(Group);
