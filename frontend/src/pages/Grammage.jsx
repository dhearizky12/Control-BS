import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { Card, Typography, Button, Dialog, DialogHeader, DialogBody, DialogFooter, Input, Select, Option, Spinner } from "@material-tailwind/react";
import { PlusIcon } from "@heroicons/react/24/outline";

function Grammage() {
  const TABLE_HEAD = useRef(["Waktu Shift", "Sample 1", "Sample 2", "Sample 3", "Sample 4", "Average", "Aksi"]);

  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openLoading, setOpenLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [grammagesData, setGrammagesData] = useState([]);
  const [averageSample, setAverageSample] = useState([0, 0, 0, 0, 0]);
  const [targetsData, setTargetsData] = useState([]);
  const [shiftsData, setShiftsData] = useState([]);

  const [target, setTarget] = useState(null);
  const [shift, setShift] = useState(null);
  const [sample1, setSample1] = useState("");
  const [sample2, setSample2] = useState("");
  const [sample3, setSample3] = useState("");
  const [sample4, setSample4] = useState("");

  const [updateData, setUpdateData] = useState({});
  const [deleteData, setDeleteData] = useState({});
  const [saveLoading, setSaveLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const onSample1Change = ({ target }) => setSample1(target.value);
  const onSample2Change = ({ target }) => setSample2(target.value);
  const onSample3Change = ({ target }) => setSample3(target.value);
  const onSample4Change = ({ target }) => setSample4(target.value);

  const handleGetGrammageData = useCallback(() => {
    setLoading(true);
    fetch("/api/grammages", { method: "GET" })
      .then((responses) => responses.json())
      .then((responses) => {
        setLoading(false);
        let averageSample = [];

        setGrammagesData(
          responses.map((grammage) => {
            if (grammage.shift?.time)
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
  }, []);

  const handleGetTargetData = useCallback(() => {
    return fetch("/api/targets", { method: "GET" })
      .then((response) => response.json())
      .then((response) => {
        setLoading(false);
        setTargetsData(response);
      })
      .catch((error) => {
        setLoading(false);
        console.error("API Error:", error);
      });
  }, []);

  const handleGetShiftData = useCallback(() => {
    return fetch("/api/shifts", { method: "GET" })
      .then((response) => response.json())
      .then((response) => {
        setLoading(false);
        setShiftsData(response);
      })
      .catch((error) => {
        setLoading(false);
        console.error("API Error:", error);
      });
  }, []);

  useEffect(() => {
    handleGetGrammageData();

    return () => {};
  }, [handleGetGrammageData]);

  const handleOpen = async ({ target }) => {
    if (!open) {
      setOpenLoading(true);
      await Promise.all([handleGetShiftData(), handleGetTargetData()]);
      setOpenLoading(false);
    }

    if (target && target.dataset.id) {
      var data = grammagesData.find((value) => value.id === Number(target.dataset.id));
      if (!data) return;

      setTarget(data.targetId.toString());
      setShift(data.shiftId.toString());
      setSample1(data.sample1);
      setSample2(data.sample2);
      setSample3(data.sample3);
      setSample4(data.sample4);
      setUpdateData(data);
    }

    if (open) {
      setTarget(null);
      setShift(null);
      setSample1("");
      setSample2("");
      setSample3("");
      setSample4("");
      setUpdateData({});
    }

    setOpen(!open);
    setSaveLoading(false);
  };

  const handleOpenDelete = ({ target }) => {
    if (target && target.dataset.id) {
      var data = grammagesData.find((value) => value.id === Number(target.dataset.id));
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

  const handleSaveProduction = () => {
    if (!target || !shift || !sample1 || !sample2 || !sample3 || !sample4) return;

    const url = "/api/grammages" + (updateData.id ? "/" + updateData.id : "");
    const method = updateData.id ? "PATCH" : "POST";

    setSaveLoading(true);
    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        targetId: target,
        shiftId: shift,
        sample1,
        sample2,
        sample3,
        sample4,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        setSaveLoading(false);
        handleOpen({});
        handleGetGrammageData();
      })
      .catch((error) => {
        setSaveLoading(false);
        console.error("API Error:", error);
      });
  };

  const handleDeleteProduction = () => {
    if (!deleteData.id) return;

    setDeleteLoading(true);
    fetch("/api/grammages/" + deleteData.id, { method: "DELETE" })
      .then((response) => response.json())
      .then((response) => {
        setSaveLoading(false);
        handleOpenDelete({});
        handleGetGrammageData();
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
          <div className="text-gray-700">Tanggal</div>
          <div className="font-bold text-3xl">08 Februari 2024</div>
        </div>
        <div>
          <Button onClick={handleOpen} className="flex items-center gap-2">
            <PlusIcon className="h-5 w-5" />
            Tambah Gramasi
          </Button>
        </div>
      </div>
      <div className="flex-1 w-full overflow-hidden pb-4 px-8">
        <Card className="max-h-full h-fit w-full overflow-hidden flex flex-col">
          <div className="grid grid-cols-[repeat(7,_1fr)_auto] bg-black border-b border-blue-gray-100 ">
            {TABLE_HEAD.current.map((head, index) => (
              <div key={head} className={"p-4" + (index === 6 ? " w-[217.89px] mr-[17px]" : "")}>
                <Typography variant="small" color="white" className="font-bold leading-none text-md">
                  {head}
                </Typography>
              </div>
            ))}
          </div>
          <div className="overflow-y-auto overflow-x-hidden gutter-stable">
            {grammagesData.length ? (
              grammagesData.map(({ id, shift, sample1, sample2, sample3, sample4, average }, index) => {
                return (
                  <div
                    key={index}
                    className="grid  grid-cols-[repeat(7,_1fr)_auto] [&>div]:p-4 [&>div]:border-b [&>div]:border-blue-gray-50 -mr-[17px]"
                  >
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
          {grammagesData.length > 0 && (
            <div className="grid grid-cols-[repeat(7,_1fr)_auto] bg-black ">
              <div className="border-blue-gray-100 p-4">
                <Typography color="white" className="font-bold leading-none text-md">
                  Average
                </Typography>
              </div>
              {averageSample.map((foot, index) => (
                <div key={index + "-foot"} className={"border-blue-gray-100 p-4" + (index === 4? ' bg-green-500/60' : '')}>
                  <Typography color="white" className="font-bold leading-none text-md">
                    {foot} Kg
                  </Typography>
                </div>
              ))}
              <div className="p-4 w-[217.89px] mr-[17px]"></div>
            </div>
          )}
        </Card>
      </div>

      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>{updateData.id ? "Ubah" : "Tambah"} Gramasi</DialogHeader>
        <DialogBody>
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-1">
              <Select label="Target" size="lg" placeholder="Pilih Target" value={target} onChange={setTarget}>
                {targetsData.map((target, index) => {
                  return (
                    <Option key={index} value={target.id.toString()}>
                      {target.mid} - {target.target} Box
                    </Option>
                  );
                })}
              </Select>
            </div>
            <div className="mb-1">
              <Select label="Shift" size="lg" placeholder="Pilih Shift" value={shift} onChange={setShift}>
                {shiftsData.map((shift, index) => {
                  return (
                    <Option key={index} value={shift.id.toString()}>
                      {new Date(shift.time).getUTCHours().toString().padStart(2, "0") +
                        ":" +
                        new Date(shift.time).getUTCMinutes().toString().padStart(2, "0")}{" "}
                      - {shift.name}
                    </Option>
                  );
                })}
              </Select>
            </div>
            <div className="mb-1">
              <Input label="Sample 1" size="lg" placeholder="example: 70" value={sample1} onChange={onSample1Change} />
            </div>
            <div className="mb-1">
              <Input label="Sample 2" size="lg" placeholder="example: 70" value={sample2} onChange={onSample2Change} />
            </div>
            <div className="mb-1">
              <Input label="Sample 3" size="lg" placeholder="example: 70" value={sample3} onChange={onSample3Change} />
            </div>
            <div className="mb-1">
              <Input label="Sample 4" size="lg" placeholder="example: 70" value={sample4} onChange={onSample4Change} />
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" onClick={handleOpen} className="mr-3">
            <span>Batal</span>
          </Button>
          <Button color="green" loading={saveLoading} onClick={handleSaveProduction}>
            <span>Simpan</span>
          </Button>
        </DialogFooter>
      </Dialog>

      <Dialog open={openDelete} handler={handleOpenDelete}>
        <DialogHeader>Hapus Gramasi</DialogHeader>
        <DialogBody>Apakah anda yakin ingin menghapus gramasi ini?</DialogBody>
        <DialogFooter>
          <Button variant="text" onClick={handleOpenDelete} className="mr-3">
            <span>Batal</span>
          </Button>
          <Button color="red" loading={deleteLoading} onClick={handleDeleteProduction}>
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

Grammage.propTypes = {};

export default memo(Grammage);
