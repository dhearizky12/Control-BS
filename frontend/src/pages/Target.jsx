import React, { memo, useEffect, useRef, useState } from "react";
import { Card, CardBody, Typography, Button, Dialog, DialogHeader, DialogBody, DialogFooter, Input, Spinner } from "@material-tailwind/react";
import { PlusIcon } from "@heroicons/react/24/outline";

function Target() {
  const TABLE_HEAD = useRef(["Tanggal", "Nama Produk", "Target Produksi", "MID"]);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [targetsData, setTargetsData] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch("/api/targets", { method: "GET" })
      .then((responses) => responses.json())
      .then((responses) => {
        setLoading(false);

        setTargetsData(
          responses.map((target) => {
            target.product = target.product.name;
            target.date = new Date(target.date).toLocaleDateString()

            return target;
          })
        );
      })
      .catch((error) => {
        setLoading(false);
        console.error("API Error:", error);
      });

    return () => {};
  }, []);

  const handleOpen = () => setOpen(!open);
  return (
    <div className="h-full flex flex-col py-4 px-8">
      <div className="flex items-end gap-2 pb-4">
        <div className="flex-1">
          <div className="font-bold text-3xl">Target Aktif</div>
        </div>
        <div className="flex gap-3">
          <Button onClick={handleOpen} className="flex items-center gap-2">
            <PlusIcon className="h-5 w-5" />
            Tambah Target
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <Card color="gray" variant="filled" shadow={false} className="border flex-1">
          <CardBody className="py-4 h-full flex flex-col justify-between">
            <Typography variant="h6" className="font-bold">
              Tanggal Produksi
            </Typography>
            <div>
              <Typography className="font-bold flex gap-2 items-end text-3xl">8 Februari 2024</Typography>
            </div>
          </CardBody>
        </Card>
        <Card color="gray" variant="filled" shadow={false} className="border flex-1">
          <CardBody className="py-4 h-full flex flex-col justify-between">
            <Typography variant="h6" className="font-bold">
              Nama Produk
            </Typography>
            <div>
              <Typography className="font-bold flex gap-2 items-end text-3xl">Giv Biru</Typography>
            </div>
          </CardBody>
        </Card>
        <Card color="gray" variant="filled" shadow={false} className="border flex-1">
          <CardBody className="py-4 h-full flex flex-col justify-between">
            <Typography variant="h6" className="font-bold">
              Target Produksi
            </Typography>
            <div>
              <Typography className="font-bold flex gap-2 items-end text-3xl">500 Box</Typography>
            </div>
          </CardBody>
        </Card>
        <Card color="gray" variant="filled" shadow={false} className="border flex-1">
          <CardBody className="py-4 h-full flex flex-col justify-between">
            <Typography variant="h6" className="font-bold">
              MID
            </Typography>
            <div>
              <Typography className="font-bold flex gap-2 items-end text-3xl">PO23341231</Typography>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* TODO: ganti isi table */}
      <div className="mt-6">
        <div className="font-bold text-3xl mb-3">History Target</div>
        <div className="flex-1 w-full overflow-hidden pb-4">
          <Card className="max-h-full h-fit w-full overflow-hidden flex flex-col">
            <div className="grid grid-cols-4 bg-black border-b border-blue-gray-100 ">
              {TABLE_HEAD.current.map((head) => (
                <div key={head} className="p-4">
                  <Typography color="white" className="font-bold leading-none text-md">
                    {head}
                  </Typography>
                </div>
              ))}
            </div>
            <div className="overflow-y-auto gutter-stable">
              {targetsData.length ? (
                targetsData.map(({ date, product, target, mid }, index) => {
                  return (
                    <div key={index} className="grid grid-cols-4 [&>div]:p-4 [&>div]:border-b [&>div]:border-blue-gray-50 -mr-[17px]">
                      <div>
                        <Typography color="blue-gray" className="font-bold">
                          {date}
                        </Typography>
                      </div>
                      <div>
                        <Typography color="blue-gray" className="font-normal">
                          {product}
                        </Typography>
                      </div>
                      <div>
                        <Typography color="blue-gray" className="font-normal">
                          {target} Box
                        </Typography>
                      </div>
                      <div>
                        <Typography color="blue-gray" className="font-normal">
                          {mid}
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
          </Card>
        </div>
      </div>

      {/* TODO: ganti isi dialog */}
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Add Target</DialogHeader>
        <DialogBody>
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-1">
              <Input label="Tanggal" size="lg" placeholder="" />
            </div>
            <div className="mb-1">
              <Input label="Nama Produk" size="lg" placeholder="example: GIV Biru" />
            </div>
            <div className="mb-1">
              <Input label="Target Produksi" size="lg" placeholder="example: 400" />
            </div>
            <div className="mb-1">
              <Input label="MID" size="lg" placeholder="example: OP1234" />
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

Target.propTypes = {};

export default memo(Target);
