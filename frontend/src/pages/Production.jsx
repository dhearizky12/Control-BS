import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { Card, Typography, Button, Dialog, DialogHeader, DialogBody, DialogFooter, Input, Spinner, Select, Option } from "@material-tailwind/react";
import { PlusIcon } from "@heroicons/react/24/outline";

function Production() {
  const TABLE_HEAD = useRef(["MID", "Group", "Shift", "Hasil Adukan", "Tambahan BS", "Gramasi", "Hasil Produksi", "Waste"]);

  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openLoading, setOpenLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [productionsData, setProductionsData] = useState([]);
  const [targetsData, setTargetsData] = useState([]);
  const [groupsData, setGroupsData] = useState([]);
  const [shiftsData, setShiftsData] = useState([]);

  const [target, setTarget] = useState(null);
  const [group, setGroup] = useState(null);
  const [shift, setShift] = useState(null);
  const [mixResult, setMixResult] = useState("");
  const [additionBS, setAdditionBS] = useState("");
  const [grammage, setGrammage] = useState("");
  const [result, setResult] = useState("");
  const [waste, setWaste] = useState("");

  const [updateData, setUpdateData] = useState({});
  const [deleteData, setDeleteData] = useState({});
  const [saveLoading, setSaveLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const onMixResultChange = ({ target }) => setMixResult(target.value);
  const onAdditionBSChange = ({ target }) => setAdditionBS(target.value);
  const onGrammageChange = ({ target }) => setGrammage(target.value);
  const onResultChange = ({ target }) => setResult(target.value);
  const onWasteChange = ({ target }) => setWaste(target.value);

  const handleGetProductionData = useCallback(() => {
    setLoading(true);
    fetch("/api/productions", { method: "GET" })
      .then((response) => response.json())
      .then((responses) => {
        setLoading(false);

        setProductionsData(
          responses.map((production) => {
            production.mid = production.target?.mid;
            production.group = production.group?.name;
            if (production.shift?.time)
              production.shift =
                new Date(production.shift.time).getUTCHours().toString().padStart(2, "0") +
                ":" +
                new Date(production.shift.time).getUTCMinutes().toString().padStart(2, "0");

            return production;
          })
        );
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

  const handleGetGroupData = useCallback(() => {
    return fetch("/api/groups", { method: "GET" })
      .then((response) => response.json())
      .then((response) => {
        setLoading(false);
        setGroupsData(response);
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
    handleGetProductionData();

    return () => {};
  }, [handleGetProductionData]);

  const handleOpen = async ({ target }) => {
    if (target && target.dataset.id) {
      var data = productionsData.find((value) => value.id === Number(target.dataset.id));
      if (!data) return;

      setTarget(data.target);
      setGroup(data.group);
      setShift(data.shift);
      setMixResult(data.mixResult);
      setAdditionBS(data.additionBS);
      setGrammage(data.grammage);
      setResult(data.result);
      setWaste(data.waste);
      setUpdateData(data);
    }

    if (open) {
      setTarget(null);
      setGroup(null);
      setShift(null);
      setMixResult(null);
      setAdditionBS(null);
      setGrammage(null);
      setResult(null);
      setWaste(null);
      setUpdateData({});
    } else {
      setOpenLoading(true);
      await Promise.all([handleGetGroupData(), handleGetShiftData(), handleGetTargetData()]);
      setOpenLoading(false);
    }

    setOpen(!open);
    setSaveLoading(false);
  };

  const handleOpenDelete = ({ target }) => {
    if (target && target.dataset.id) {
      var data = productionsData.find((value) => value.id === Number(target.dataset.id));
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
    console.log(target, group, shift, mixResult, additionBS, grammage, result, waste);
    if (!target || !group || !shift || !mixResult || !additionBS || !grammage || !result || !waste) return;

    const url = "/api/productions" + (updateData.id ? "/" + updateData.id : "");
    const method = updateData.id ? "PATCH" : "POST";

    setSaveLoading(true);
    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        targetId: target,
        groupId: group,
        shiftId: shift,
        mixResult,
        additionBS,
        grammage,
        result,
        waste,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        setSaveLoading(false);
        handleOpen({});
        handleGetProductionData();
      })
      .catch((error) => {
        setSaveLoading(false);
        console.error("API Error:", error);
      });
  };

  const handleDeleteProduction = () => {
    if (!deleteData.id) return;

    setDeleteLoading(true);
    fetch("/api/productions/" + deleteData.id, { method: "DELETE" })
      .then((response) => response.json())
      .then((response) => {
        setSaveLoading(false);
        handleOpenDelete({});
        handleGetProductionData();
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
            Tambah Production
          </Button>
        </div>
      </div>
      <div className="flex-1 w-full overflow-hidden pb-4 px-8">
        <Card className="max-h-full h-fit w-full overflow-hidden flex flex-col">
          <div className="grid grid-cols-8 bg-black border-b border-blue-gray-100 ">
            {TABLE_HEAD.current.map((head) => (
              <div key={head} className="p-4">
                <Typography variant="small" color="white" className="font-bold leading-none text-md">
                  {head}
                </Typography>
              </div>
            ))}
          </div>
          <div className="overflow-y-auto gutter-stable">
            {productionsData.length ? (
              productionsData.map(({ mid, group, shift, mixResult, additionBS, grammage, result, waste }, index) => {
                return (
                  <div key={index} className="grid grid-cols-8 [&>div]:p-4 [&>div]:border-b [&>div]:border-blue-gray-50 -mr-[17px]">
                    <div>
                      <Typography variant="small" color="blue-gray" className="font-bold">
                        {mid}
                      </Typography>
                    </div>
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
                        {waste} Kg
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

      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>{updateData.id ? "Ubah" : "Tambah"} Production</DialogHeader>
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
              <Select label="Group" size="lg" placeholder="Pilih Group" value={group} onChange={setGroup}>
                {groupsData.map((group, index) => {
                  return (
                    <Option key={index} value={group.id.toString()}>
                      {group.name}
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
              <Input label="Hasil Adukan" size="lg" placeholder="example: 70" value={mixResult} onChange={onMixResultChange} />
            </div>
            <div className="mb-1">
              <Input label="Penambahan BS" size="lg" placeholder="example: 70" value={additionBS} onChange={onAdditionBSChange} />
            </div>
            <div className="mb-1">
              <Input label="Gramasi" size="lg" placeholder="example: 70" value={grammage} onChange={onGrammageChange} />
            </div>
            <div className="mb-1">
              <Input label="Hasil Produksi" size="lg" placeholder="example: 70" value={result} onChange={onResultChange} />
            </div>
            <div className="mb-1">
              <Input label="Waste" size="lg" placeholder="example: 70" value={waste} onChange={onWasteChange} />
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
        <DialogHeader>Hapus Production</DialogHeader>
        <DialogBody>Apakah anda yakin ingin menghapus produksi ini?</DialogBody>
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

Production.propTypes = {};

export default memo(Production);
