import React, { memo, useCallback, useEffect, useState } from "react";
import { Card, Typography, Button, Dialog, DialogHeader, DialogBody, DialogFooter, Input, Spinner } from "@material-tailwind/react";
import { PlusIcon } from "@heroicons/react/24/outline";

function Shift() {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shiftData, setShiftData] = useState([]);

  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [updateData, setUpdateData] = useState({});
  const [deleteData, setDeleteData] = useState({});
  const [saveLoading, setSaveLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const onTimeChange = ({ target }) => setTime(target.value);
  const onNameChange = ({ target }) => setName(target.value);

  const handleGetShiftData = useCallback(() => {
    setLoading(true);
    fetch("/api/shifts", { method: "GET" })
      .then((response) => response.json())
      .then((response) => {
        setLoading(false);
        setShiftData(response);
      })
      .catch((error) => {
        setLoading(false);
        console.error("API Error:", error);
      });
  }, []);

  useEffect(() => {
    handleGetShiftData();

    return () => {};
  }, [handleGetShiftData]);

  const handleOpen = ({ target }) => {
    if (target && target.dataset.id) {
      var data = shiftData.find((value) => value.id === Number(target.dataset.id));
      if (!data) return;

      setTime(new Date(data.time).getUTCHours().toString().padStart(2, "0") + ":" + new Date(data.time).getUTCMinutes().toString().padStart(2, "0"));
      setName(data.name);
      setUpdateData(data);
    }

    if (open) {
      setTime(null);
      setName(null);
      setUpdateData({});
    }

    setOpen(!open);
    setSaveLoading(false);
  };

  const handleOpenDelete = ({ target }) => {
    if (target && target.dataset.id) {
      var data = shiftData.find((value) => value.id === Number(target.dataset.id));
      if (!data) return;

      setDeleteData(data);
    }

    if (openDelete) {
      setDeleteData({});
    }

    setOpenDelete(!openDelete);
    setDeleteLoading(false);
  };

  const handleSaveShift = () => {
    const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

    // Test the string
    if (!timeRegex.test(time) || !name) return;

    var timeSplit = time.split(":");

    const utcStartDate = new Date(0);
    const finalTime = new Date(utcStartDate.getTime() + Number(timeSplit[0]) * 60 * 60 * 1000 + Number(timeSplit[1]) * 60 * 1000);

    const url = "/api/shifts" + (updateData.id ? "/" + updateData.id : "");
    const method = updateData.id ? "PATCH" : "POST";

    setSaveLoading(true);
    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        time: finalTime,
        name: name,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        setSaveLoading(false);
        handleOpen({});
        handleGetShiftData();
      })
      .catch((error) => {
        setSaveLoading(false);
        console.error("API Error:", error);
      });
  };

  const handleDeleteShift = () => {
    if (!deleteData.id) return;

    setDeleteLoading(true);
    fetch("/api/shifts/" + deleteData.id, { method: "DELETE" })
      .then((response) => response.json())
      .then((response) => {
        setSaveLoading(false);
        handleOpenDelete({});
        handleGetShiftData();
      })
      .catch((error) => {
        setSaveLoading(false);
        console.error("API Error:", error);
      });
  };

  return (
    <div className="h-full flex flex-col">
      <div className="py-4 px-8 flex items-end gap-2">
        <div className="flex-1">
          <div className="font-bold text-3xl">Master Data Shift</div>
        </div>
        <div>
          <Button onClick={handleOpen} className="flex items-center gap-2">
            <PlusIcon className="h-5 w-5" />
            Tambah Shift
          </Button>
        </div>
      </div>
      <div className="flex-1 w-full overflow-hidden pb-4 px-8">
        <Card className="max-h-full h-fit w-full overflow-hidden flex flex-col">
          <div className="flex bg-black border-b border-blue-gray-100 ">
            <div className="p-4 w-1/5">
              <Typography color="white" className="font-bold leading-none text-md">
                Waktu
              </Typography>
            </div>
            <div className="p-4 flex-1">
              <Typography color="white" className="font-bold leading-none text-md">
                Nama Shift
              </Typography>
            </div>
            <div className="p-4 w-[217.89px] mr-[17px]">
              <Typography color="white" className="font-bold leading-none text-md">
                Aksi
              </Typography>
            </div>
          </div>

          <div className="overflow-y-auto overflow-x-hidden gutter-stable">
            {shiftData.length ? (
              shiftData.map(({ id, time, name }, index) => {
                return (
                  <div key={index} className="flex [&>div]:p-4 [&>div]:border-b [&>div]:border-blue-gray-50 -mr-[17px]">
                    <div className="w-1/5 flex items-center">
                      <Typography color="blue-gray" className="font-bold">
                        {new Date(time).getUTCHours().toString().padStart(2, "0") + ":" + new Date(time).getUTCMinutes().toString().padStart(2, "0")}
                      </Typography>
                    </div>
                    <div className="flex-1 flex items-center">
                      <Typography color="blue-gray" className="font-normal">
                        {name}
                      </Typography>
                    </div>
                    <div className="flex gap-3 w-[217.89px] mr-[17px]">
                      <Button variant="outlined" color="red" data-id={id} onClick={handleOpenDelete}>
                        Hapus
                      </Button>
                      <Button variant="outlined" data-id={id} onClick={handleOpen}>
                        Ubah
                      </Button>
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

      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>{updateData.id ? "Ubah" : "Tambah"} Shift</DialogHeader>
        <DialogBody>
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-1">
              <Input label="Waktu" size="lg" placeholder="example: 17:00" value={time} onChange={onTimeChange} />
            </div>
            <div className="mb-1">
              <Input label="Nama" size="lg" placeholder="example: Shift 7" value={name} onChange={onNameChange} />
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" onClick={handleOpen} className="mr-3">
            <span>Batal</span>
          </Button>
          <Button color="green" loading={saveLoading} onClick={handleSaveShift}>
            <span>Simpan</span>
          </Button>
        </DialogFooter>
      </Dialog>

      <Dialog open={openDelete} handler={handleOpenDelete}>
        <DialogHeader>Hapus Shift</DialogHeader>
        <DialogBody>Apakah anda yakin ingin menghapus {deleteData.name}?</DialogBody>
        <DialogFooter>
          <Button variant="text" onClick={handleOpenDelete} className="mr-3">
            <span>Batal</span>
          </Button>
          <Button color="red" loading={deleteLoading} onClick={handleDeleteShift}>
            <span>Hapus</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

Shift.propTypes = {};

export default memo(Shift);
