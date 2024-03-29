import React, { memo, useCallback, useEffect, useState } from "react";
import { Card, Typography, Button, Dialog, DialogHeader, DialogBody, DialogFooter, Input, Spinner, Select, Option } from "@material-tailwind/react";
import { PlusIcon } from "@heroicons/react/24/outline";

function Shift() {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openLoading, setOpenLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shiftData, setShiftData] = useState([]);
  const [workingHourData, setWorkingHourData] = useState([]);

  const [name, setName] = useState("");
  const [startWorkingHour, setStartWorkingHour] = useState("");
  const [endWorkingHour, setEndWorkingHour] = useState("");
  const [updateData, setUpdateData] = useState({});
  const [deleteData, setDeleteData] = useState({});
  const [saveLoading, setSaveLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

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

  const handleGetWorkingHourData = useCallback(() => {
    return fetch("/api/working-hours", { method: "GET" })
      .then((response) => response.json())
      .then((response) => {
        setLoading(false);
        setWorkingHourData(response);
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

  const handleOpen = async ({ target }) => {
    if (!open) {
      setOpenLoading(true);
      await Promise.all([handleGetWorkingHourData()]);
      setOpenLoading(false);
    }

    if (target && target.dataset.id) {
      var data = shiftData.find((value) => value.id === Number(target.dataset.id));
      if (!data) return;

      setName(data.name);
      setStartWorkingHour(data.startWorkingHourId.toString());
      setEndWorkingHour(data.endWorkingHourId.toString());
      setUpdateData(data);
    }

    if (open) {
      setName("");
      setStartWorkingHour("");
      setEndWorkingHour("");
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

  const handleOpenLoading = () => setOpenLoading(!openLoading);

  const handleSaveShift = () => {

    // Test the string
    if (!name || !startWorkingHour || !endWorkingHour) return;

    const url = "/api/shifts" + (updateData.id ? "/" + updateData.id : "");
    const method = updateData.id ? "PATCH" : "POST";

    setSaveLoading(true);
    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        startWorkingHourId: startWorkingHour,
        endWorkingHourId: endWorkingHour,
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
            <div className="p-4 flex-1">
              <Typography color="white" className="font-bold leading-none text-md">
                Nama Shift
              </Typography>
            </div>
            <div className="p-4 w-1/5">
              <Typography color="white" className="font-bold leading-none text-md">
                Mulai Waktu Kerja
              </Typography>
            </div>
            <div className="p-4 w-1/5">
              <Typography color="white" className="font-bold leading-none text-md">
                Selesai Waktu Kerja
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
              shiftData.map(({ id, startWorkingHour, endWorkingHour, name }, index) => {
                return (
                  <div key={index} className="flex [&>div]:p-4 [&>div]:border-b [&>div]:border-blue-gray-50 -mr-[17px]">
                    <div className="flex-1 flex items-center">
                      <Typography color="blue-gray" className="font-normal">
                        {name}
                      </Typography>
                    </div>
                    <div className="w-1/5 flex items-center">
                      <Typography color="blue-gray" className="font-bold">
                        {new Date(startWorkingHour.time).getUTCHours().toString().padStart(2, "0") +
                          ":" +
                          new Date(startWorkingHour.time).getUTCMinutes().toString().padStart(2, "0")}
                      </Typography>
                    </div>
                    <div className="w-1/5 flex items-center">
                      <Typography color="blue-gray" className="font-bold">
                        {new Date(endWorkingHour.time).getUTCHours().toString().padStart(2, "0") +
                          ":" +
                          new Date(endWorkingHour.time).getUTCMinutes().toString().padStart(2, "0")}
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
              <Input label="Nama" size="lg" placeholder="example: Shift 7" value={name} onChange={onNameChange} />
            </div>
            <div className="mb-1">
              <Select
                label="Mulai Jam Kerja"
                size="lg"
                placeholder="Pilih Mulai Jam Kerja"
                value={startWorkingHour}
                onChange={setStartWorkingHour}
              >
                {workingHourData.map((workingHour, index) => {
                  return (
                    <Option key={index} value={workingHour.id.toString()}>
                      {new Date(workingHour.time).getUTCHours().toString().padStart(2, "0") +
                        ":" +
                        new Date(workingHour.time).getUTCMinutes().toString().padStart(2, "0")}
                    </Option>
                  );
                })}
              </Select>
            </div>
            <div className="mb-1">
              <Select
                label="Selesai Jam Kerja"
                size="lg"
                placeholder="Pilih Selesai Jam Kerja"
                value={endWorkingHour}
                onChange={setEndWorkingHour}
              >
                {workingHourData.map((workingHour, index) => {
                  return (
                    <Option key={index} value={workingHour.id.toString()}>
                      {new Date(workingHour.time).getUTCHours().toString().padStart(2, "0") +
                        ":" +
                        new Date(workingHour.time).getUTCMinutes().toString().padStart(2, "0")}
                    </Option>
                  );
                })}
              </Select>
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

      <Dialog open={openLoading} handler={handleOpenLoading}>
        <DialogBody>
          <div className="flex gap-2 items-center justify-center p-2">
            <Spinner /> Sedang memuat data, mohon tunggu...
          </div>
        </DialogBody>
      </Dialog>
    </div>
  );
}

Shift.propTypes = {};

export default memo(Shift);
