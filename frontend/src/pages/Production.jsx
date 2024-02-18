import React, { memo, useRef } from "react";
import { Card, Typography, Button, Dialog, DialogHeader, DialogBody, DialogFooter, Input } from "@material-tailwind/react";
import { PlusIcon } from "@heroicons/react/24/outline";

function Production() {
  const TABLE_HEAD = useRef(["Group", "Shift", "Hasil Adukan", "Penambahan BS", "Gramasi", "Hasil Produksi", "Waste"]);
  const TABLE_ROWS = [
    {
      group: 1,
      shift: 1,
      mixResult: 70,
      additionBS: 10,
      grammage: 70,
      result: 200,
      waste: 10,
    },
    {
      group: 1,
      shift: 2,
      mixResult: 70,
      additionBS: 10,
      grammage: 70,
      result: 200,
      waste: 10,
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
            Add Production
          </Button>
        </div>
      </div>
      <div className="flex-1 w-full overflow-hidden pb-4 px-8">
        <Card className="max-h-full h-fit w-full overflow-hidden flex flex-col">
          <div className="grid grid-cols-7 bg-black border-b border-blue-gray-100 ">
            {TABLE_HEAD.current.map((head) => (
              <div key={head} className="p-4">
                <Typography variant="small" color="white" className="font-bold leading-none text-md">
                  {head}
                </Typography>
              </div>
            ))}
          </div>
          <div className="overflow-y-auto gutter-stable">
            {TABLE_ROWS.map(({ group, shift, mixResult, additionBS, grammage, result }, index) => {
              return (
                <div key={index} className="grid grid-cols-7 [&>div]:p-4 [&>div]:border-b [&>div]:border-blue-gray-50 -mr-[17px]">
                  <div>
                    <Typography variant="small" color="blue-gray" className="font-bold">
                      {group}
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {shift}
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {mixResult} Kg
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {additionBS} Kg
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {grammage} Kg
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {result} Box
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {result} Kg
                    </Typography>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Add Production</DialogHeader>
        <DialogBody>
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-1">
              <Input label="Group" size="lg" placeholder="example: 70" />
            </div>
            <div className="mb-1">
              <Input label="Shift" size="lg" placeholder="example: 70" />
            </div>
            <div className="mb-1">
              <Input label="Hasil Adukan" size="lg" placeholder="example: 70" />
            </div>
            <div className="mb-1">
              <Input label="Penambahan BS" size="lg" placeholder="example: 70" />
            </div>
            <div className="mb-1">
              <Input label="Gramasi" size="lg" placeholder="example: 70" />
            </div>
            <div className="mb-1">
              <Input label="Hasil Produksi" size="lg" placeholder="example: 70" />
            </div>
            <div className="mb-1">
              <Input label="Waste" size="lg" placeholder="example: 70" />
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

Production.propTypes = {};

export default memo(Production);