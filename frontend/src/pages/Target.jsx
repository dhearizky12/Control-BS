import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import {
  Card,
  CardBody,
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Spinner,
  Popover,
  PopoverHandler,
  PopoverContent,
  Select,
  Option,
} from "@material-tailwind/react";
import { DayPicker } from "react-day-picker";
import { PlusIcon, ChevronLeftIcon, ChevronRightIcon, CheckIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns";

function Target() {
  const TABLE_HEAD = useRef(["MID", "Tanggal", "Nama Produk", "Target Produksi"]);

  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openDone, setOpenDone] = useState(false);
  const [openLoading, setOpenLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [targetsData, setTargetsData] = useState([]);
  const [productsData, setProductsData] = useState([]);

  const [activeTarget, setActiveTarget] = useState(false);
  const [mid, setMid] = useState("");
  const [date, setDate] = useState("");
  const [product, setProduct] = useState("");
  const [target, setTarget] = useState(0);

  const [nik, setNik] = useState("");

  const [updateData, setUpdateData] = useState({});
  const [deleteData, setDeleteData] = useState({});
  const [saveLoading, setSaveLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [doneLoading, setDoneLoading] = useState(false);

  const [showDate, setShowDate] = useState(false);

  const onSelectDate = (value) => {
    setDate(value);
    setShowDate(false);
  };
  const onMidChange = ({ target }) => setMid(target.value);
  const onTargetChange = ({ target }) => setTarget(target.value);

  const onNikChange = ({ target }) => setNik(target.value);

  const handleGetTargetData = useCallback(() => {
    setLoading(true);
    return fetch("/api/targets", { method: "GET" })
      .then((response) => response.json())
      .then((responses) => {
        setLoading(false);
        let activeTarget = responses.find((target) => target.status);
        setActiveTarget(activeTarget);

        let history = responses
          .filter((target) => target.id !== activeTarget?.id)
          .map((target) => {
            target.product = target.product.name;

            return target;
          });
        setTargetsData(history);
      })
      .catch((error) => {
        setLoading(false);
        console.error("API Error:", error);
      });
  }, []);

  const handleGetProductData = useCallback(() => {
    return fetch("/api/products", { method: "GET" })
      .then((response) => response.json())
      .then((response) => {
        setLoading(false);
        setProductsData(response);
      })
      .catch((error) => {
        setLoading(false);
        console.error("API Error:", error);
      });
  }, []);

  useEffect(() => {
    handleGetTargetData();

    return () => {};
  }, [handleGetTargetData]);

  const handleOpen = async ({ target }) => {
    if (!open) {
      setOpenLoading(true);
      await Promise.all([handleGetProductData()]);
      setOpenLoading(false);
    }

    if (target && target.dataset.id) {
      if (!activeTarget.id) return;

      setMid(activeTarget.mid);
      setDate(activeTarget.date);
      setProduct(activeTarget.productId.toString());
      setTarget(activeTarget.target);

      setUpdateData(activeTarget);
    }

    if (open) {
      setMid("");
      setDate("");
      setProduct("");
      setTarget(0);
      setUpdateData({});
    }

    setOpen(!open);
    setSaveLoading(false);
  };

  const handleOpenDelete = ({ target }) => {
    if (target && target.dataset.id) {
      var data = targetsData.find((value) => value.id === Number(target.dataset.id));
      if (!data) return;

      setDeleteData(data);
    }

    if (openDelete) {
      setDeleteData({});
    }

    setOpenDelete(!openDelete);
    setDeleteLoading(false);
  };

  const handleOpenLoading = () => setOpenLoading(!openLoading);

  const handleOpenDone = () => setOpenDone(!openDone);

  const handleSaveTarget = () => {
    if (!mid || !date || !product || !target) return;

    const url = "/api/targets" + (updateData.id ? "/" + updateData.id : "");
    const method = updateData.id ? "PATCH" : "POST";

    setSaveLoading(true);
    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mid,
        date,
        productId: product,
        target,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        setSaveLoading(false);
        handleOpen({});
        handleGetTargetData();
      })
      .catch((error) => {
        setSaveLoading(false);
        console.error("API Error:", error);
      });
  };

  const handleDeleteTarget = () => {
    if (!deleteData.id) return;

    setDeleteLoading(true);
    fetch("/api/grammages/" + deleteData.id, { method: "DELETE" })
      .then((response) => response.json())
      .then((response) => {
        setSaveLoading(false);
        handleOpenDelete({});
        handleGetTargetData();
      })
      .catch((error) => {
        setSaveLoading(false);
        console.error("API Error:", error);
      });
  };

  const handleDoneTarget = () => {
    if (!activeTarget.id) return;

    setDoneLoading(true);
    fetch("/api/targets/" + activeTarget.id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: 0,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        setDoneLoading(false);
        handleOpenDone();
        handleGetTargetData();
      })
      .catch((error) => {
        setDoneLoading(false);
        console.error("API Error:", error);
      });
  };

  const disableDone = () => {
    return true
  }

  return (
    <div className="h-full flex flex-col py-4 px-8">
      <div className="flex items-end gap-2 pb-4">
        <div className="flex-1">
          <div className="font-bold text-3xl">Target Aktif</div>
        </div>
        {activeTarget ? (
          <div className="flex gap-4">
            <Button onClick={handleOpenDone} color="green" className="flex items-center gap-2">
              <CheckIcon className="h-5 w-5" />
              Target Selesai
            </Button>
            <Button data-id={activeTarget.id} onClick={handleOpen} variant="outlined" className="flex items-center gap-2">
              <PencilSquareIcon className="h-5 w-5" />
              Ubah Target
            </Button>
          </div>
        ) : (
          <Button onClick={handleOpen} className="flex items-center gap-2">
            <PlusIcon className="h-5 w-5" />
            Target Baru
          </Button>
        )}
      </div>
      {activeTarget ? (
        <div className="grid grid-cols-4 gap-4">
          <Card className="border flex-1">
            <CardBody className="py-4 h-full flex flex-col justify-between">
              <Typography className="font-bold">MID</Typography>
              <div>
                <Typography className="font-bold flex gap-2 items-end text-2xl">{activeTarget.mid}</Typography>
              </div>
            </CardBody>
          </Card>
          <Card className="border flex-1">
            <CardBody className="py-4 h-full flex flex-col justify-between">
              <Typography className="font-bold">Tanggal Produksi</Typography>
              <div>
                <Typography className="font-bold flex gap-2 items-end text-2xl">{format(activeTarget.date, "dd MMMM yyyy")}</Typography>
              </div>
            </CardBody>
          </Card>
          <Card className="border flex-1">
            <CardBody className="py-4 h-full flex flex-col justify-between">
              <Typography className="font-bold">Nama Produk</Typography>
              <div>
                <Typography className="font-bold flex gap-2 items-end text-2xl">{activeTarget.product.name}</Typography>
              </div>
            </CardBody>
          </Card>
          <Card className="border flex-1">
            <CardBody className="py-4 h-full flex flex-col justify-between">
              <Typography className="font-bold">Target Produksi</Typography>
              <div>
                <Typography className="font-bold flex gap-2 items-end text-2xl">{activeTarget.target}</Typography>
              </div>
            </CardBody>
          </Card>
        </div>
      ) : (
        <Card className="h-[91.6px] w-full flex items-center justify-center">
          {loading ? (
            <div className="flex gap-2 items-center justify-center">
              <Spinner /> Memuat Data...
            </div>
          ) : (
            "Tidak Ada Target Aktif"
          )}
        </Card>
      )}

      <div className="mt-12">
        <div className="font-bold text-xl mb-3">Histori Target</div>
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
                targetsData.map(({ date, product, target, mid, status }, index) => {
                  return (
                    <div key={index} className="grid grid-cols-4 [&>div]:p-4 [&>div]:border-b [&>div]:border-blue-gray-50 -mr-[17px]">
                      <div>
                        <Typography color="blue-gray" className="font-bold">
                          {mid}
                        </Typography>
                      </div>
                      <div>
                        <Typography color="blue-gray" className="font-normal">
                          {format(date, "dd MMMM yyyy")}
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

      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>{updateData?.id ? "Ubah" : "Tambah"} Target</DialogHeader>
        <DialogBody>
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-1">
              <Input label="MID" size="lg" placeholder="example: OP1234" value={mid} onChange={onMidChange} />
            </div>
            <div className="mb-1 [&>div]:h-full">
              <Popover
                open={showDate}
                animate={{
                  mount: { scale: 1, y: 0 },
                  unmount: { scale: 0, y: 25 },
                }}
              >
                <PopoverHandler>
                  <Input label="Tanggal" onFocus={() => setShowDate(true)} value={date ? format(date, "dd MMMM yyyy") : ""} onChange={() => {}} />
                </PopoverHandler>
                <PopoverContent className="z-[9999]">
                  <DayPicker
                    mode="single"
                    selected={date}
                    onSelect={onSelectDate}
                    showOutsideDays
                    className="border-0"
                    classNames={{
                      caption: "flex justify-center py-2 mb-4 relative items-center",
                      caption_label: "text-sm font-medium text-gray-900",
                      nav: "flex items-center",
                      nav_button: "h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300",
                      nav_button_previous: "absolute left-1.5",
                      nav_button_next: "absolute right-1.5",
                      table: "w-full border-collapse",
                      head_row: "flex font-medium text-gray-900",
                      head_cell: "m-0.5 w-9 font-normal text-sm",
                      row: "flex w-full mt-2",
                      cell: "text-gray-600 rounded-md h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                      day: "h-9 w-9 p-0 font-normal",
                      day_range_end: "day-range-end",
                      day_selected: "rounded-md bg-gray-900 text-white hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white",
                      day_today: "rounded-md bg-gray-200 text-gray-900",
                      day_outside:
                        "day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10",
                      day_disabled: "text-gray-500 opacity-50",
                      day_hidden: "invisible",
                    }}
                    components={{
                      IconLeft: ({ ...props }) => <ChevronLeftIcon {...props} className="h-4 w-4 stroke-2" />,
                      IconRight: ({ ...props }) => <ChevronRightIcon {...props} className="h-4 w-4 stroke-2" />,
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="mb-1">
              <Select label="Produk" size="lg" placeholder="Pilih Produk" value={product} onChange={setProduct}>
                {productsData.map((shift, index) => {
                  return (
                    <Option key={index} value={shift.id.toString()}>
                      {shift.name}
                    </Option>
                  );
                })}
              </Select>
            </div>
            <div className="mb-1">
              <Input label="Target Produksi" size="lg" placeholder="example: 400" value={target} onChange={onTargetChange} />
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" onClick={handleOpen} className="mr-3">
            <span>Batal</span>
          </Button>
          <Button color="green" loading={saveLoading} onClick={handleSaveTarget}>
            <span>Simpan</span>
          </Button>
        </DialogFooter>
      </Dialog>

      <Dialog open={openDelete} handler={handleOpenDelete}>
        <DialogHeader>Hapus Target</DialogHeader>
        <DialogBody>Apakah anda yakin ingin menghapus target ini?</DialogBody>
        <DialogFooter>
          <Button variant="text" onClick={handleOpenDelete} className="mr-3">
            <span>Batal</span>
          </Button>
          <Button color="red" loading={deleteLoading} onClick={handleDeleteTarget}>
            <span>Hapus</span>
          </Button>
        </DialogFooter>
      </Dialog>

      <Dialog open={openLoading} handler={handleOpenLoading}>
        <DialogBody>
          <div className="flex gap-2 items-center justify-center p-2">
            <Spinner /> Sedang memuat data, mohon tunggu...
          </div>
        </DialogBody>
      </Dialog>

      <Dialog open={openDone} handler={handleOpenDone}>
        <DialogHeader>Target Selesai</DialogHeader>
        <DialogBody>
          <div className="mb-2">Masukkan NIK untuk menyelesaikan target</div>
          <Input label="NIK" size="lg" placeholder="example: 0084923" value={nik} onChange={onNikChange} />
        </DialogBody>
        <DialogFooter>
          <Button variant="text" onClick={handleOpenDone} className="mr-3">
            <span>Batal</span>
          </Button>
          <Button color="green" loading={doneLoading} onClick={handleDoneTarget} disabled={disableDone()}>
            <span>Selesai</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

Target.propTypes = {};

export default memo(Target);
