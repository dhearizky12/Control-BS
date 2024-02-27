import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import {
  Card,
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Spinner,
  Select,
  Option,
  Radio,
} from "@material-tailwind/react";
import { PlusIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns";

function Production() {
  const TARGET_STATUS = useRef(["Selesai", "Aktif"]); // TODO: move this into constan
  const TARGET_STATUS_COLOR = useRef(["blue", "green"]); // TODO: move this into constan

  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openLoading, setOpenLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [productionsData, setProductionsData] = useState([]);
  const [targetsData, setTargetsData] = useState([]);
  const [groupsData, setGroupsData] = useState([]);
  const [shiftsData, setShiftsData] = useState([]);

  const [selectedTarget, setSelectedTarget] = useState(null);
  const [openTarget, setOpenTarget] = useState(false);
  const [tempSelectedTargetId, setTempSelectedTargetId] = useState(null);

  const [group, setGroup] = useState("");
  const [shift, setShift] = useState("");
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

  const onTargetChange = ({ target }) => setTempSelectedTargetId(target.value);

  const handleGetProductionData = useCallback((activeTarget) => {
    console.log(activeTarget);
    if (!activeTarget?.id) return;

    setLoading(true);
    let url = "/api/productions?targetId=" + activeTarget.id;
    fetch(url, { method: "GET" })
      .then((response) => response.json())
      .then((responses) => {
        setLoading(false);

        setProductionsData(
          responses.map((production) => {
            production.mid = production.target?.mid;
            production.group = production.group?.name;
            production.shift = production.shift?.name;
            // if (production.shift?.time)
            //   production.shift =
            //     new Date(production.shift.time).getUTCHours().toString().padStart(2, "0") +
            //     ":" +
            //     new Date(production.shift.time).getUTCMinutes().toString().padStart(2, "0");

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
      .then((responses) => {
        setLoading(false);
        let activeTarget = responses.find((target) => target.status);
        if (activeTarget) {
          setSelectedTarget(activeTarget);
          setTempSelectedTargetId(activeTarget.id);
        }

        handleGetProductionData(activeTarget);
        setTargetsData(responses);
      })
      .catch((error) => {
        setLoading(false);
        console.error("API Error:", error);
      });
  }, [handleGetProductionData]);

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
    handleGetTargetData();

    return () => {};
  }, [handleGetTargetData]);

  const handleOpen = async ({ target }) => {
    if (!open) {
      setOpenLoading(true);
      await Promise.all([handleGetGroupData(), handleGetShiftData(), handleGetTargetData()]);
      setOpenLoading(false);
    }

    if (target && target.dataset.id) {
      var data = productionsData.find((value) => value.id === Number(target.dataset.id));
      if (!data) return;

      setGroup(data.groupId.toString());
      setShift(data.shiftId.toString());
      setMixResult(data.mixResult);
      setAdditionBS(data.additionBS);
      setGrammage(data.grammage);
      setResult(data.result);
      setWaste(data.waste);
      setUpdateData(data);
    }

    if (open) {
      setGroup("");
      setShift("");
      setMixResult("");
      setAdditionBS("");
      setGrammage("");
      setResult("");
      setWaste("");
      setUpdateData({});
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

  const handleOpenTarget = () => setOpenTarget(!openTarget);

  const handleSaveProduction = () => {
    if (!selectedTarget.id || !group || !shift || !mixResult || !additionBS || !grammage || !result || !waste) return;

    const url = "/api/productions" + (updateData.id ? "/" + updateData.id : "");
    const method = updateData.id ? "PATCH" : "POST";

    setSaveLoading(true);
    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        targetId: selectedTarget.id,
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
        handleGetProductionData(selectedTarget);
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
        handleGetProductionData(selectedTarget);
      })
      .catch((error) => {
        setSaveLoading(false);
        console.error("API Error:", error);
      });
  };

  const handleSelectTarget = () => {
    let selected = targetsData.find((target) => target.id === Number(tempSelectedTargetId));
    setSelectedTarget(selected);
    setTempSelectedTargetId(selected.id);
    handleGetProductionData(selected);
    handleOpenTarget();
  };

  return (
    <div className="h-full flex flex-col">
      <div className="py-4 px-8 flex items-end gap-2">
        <div className="cursor-pointer pr-4" onClick={handleOpenTarget}>
          <Typography className="text-gray-700">Target</Typography>
          {selectedTarget ? (
            <div>
              <div className="flex gap-4 items-center">
                <Typography className="font-bold text-3xl">{selectedTarget.mid}</Typography>
                <ChevronDownIcon className="h-5 w-5" />
              </div>
              <div className="flex gap-2">
                <Typography>{format(selectedTarget.date, "dd MMMM yyyy")} - </Typography>
                <Typography color={TARGET_STATUS_COLOR.current[selectedTarget.status]}>{TARGET_STATUS.current[selectedTarget.status]}</Typography>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex gap-4 items-center">
                <Typography className="font-bold text-3xl">Tidak Ada Target</Typography>
                <ChevronDownIcon className="h-5 w-5" />
              </div>
              <Typography>Klik untuk memilih target</Typography>
            </div>
          )}
        </div>
        <div className="flex-1"></div>
        {selectedTarget && !!selectedTarget.status && (
          <div>
            <Button onClick={handleOpen} className="flex items-center gap-2">
              <PlusIcon className="h-5 w-5" />
              Tambah Produksi
            </Button>
          </div>
        )}
      </div>
      <div className="flex-1 w-full overflow-hidden pb-4 px-8">
        <Card className="max-h-full h-fit w-full overflow-hidden flex flex-col">
          <div className="grid grid-cols-[repeat(8,_1fr)_auto] bg-black border-b border-blue-gray-100 ">
            <Typography variant="small" color="white" className="font-bold leading-none text-md p-4">
              MID
            </Typography>
            <Typography variant="small" color="white" className="font-bold leading-none text-md p-4">
              Group
            </Typography>
            <Typography variant="small" color="white" className="font-bold leading-none text-md p-4">
              Shift
            </Typography>
            <Typography variant="small" color="white" className="font-bold leading-none text-md p-4">
              Hasil Adukan
            </Typography>
            <Typography variant="small" color="white" className="font-bold leading-none text-md p-4">
              Tambahan BS
            </Typography>
            <Typography variant="small" color="white" className="font-bold leading-none text-md p-4">
              Gramasi
            </Typography>
            <Typography variant="small" color="white" className="font-bold leading-none text-md p-4">
              Hasil Produksi
            </Typography>
            <Typography variant="small" color="white" className="font-bold leading-none text-md p-4">
              Waste
            </Typography>
            {!!selectedTarget?.status && (
              <Typography variant="small" color="white" className="font-bold leading-none text-md p-4 w-[217.89px] mr-[17px]">
                Aksi
              </Typography>
            )}
          </div>
          <div className="overflow-y-auto gutter-stable">
            {productionsData.length ? (
              productionsData.map(({ id, mid, group, shift, mixResult, additionBS, grammage, result, waste }, index) => {
                return (
                  <div
                    key={index}
                    className="grid grid-cols-[repeat(8,_1fr)_auto] [&>div]:p-4 [&>div]:border-b [&>div]:border-blue-gray-50 -mr-[17px]"
                  >
                    <div className="flex items-center">
                      <Typography variant="small" color="blue-gray" className="font-bold">
                        {mid}
                      </Typography>
                    </div>
                    <div className="flex items-center">
                      <Typography variant="small" color="blue-gray" className="font-bold">
                        {group}
                      </Typography>
                    </div>
                    <div className="flex items-center">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {shift}
                      </Typography>
                    </div>
                    <div className="flex items-center">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {mixResult} Kg
                      </Typography>
                    </div>
                    <div className="flex items-center">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {additionBS} Kg
                      </Typography>
                    </div>
                    <div className="flex items-center">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {grammage} Kg
                      </Typography>
                    </div>
                    <div className="flex items-center">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {result} Box
                      </Typography>
                    </div>
                    <div className="flex items-center">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {waste} Kg
                      </Typography>
                    </div>
                    {!!selectedTarget?.status && (
                      <div className="flex gap-3 w-[217.89px] mr-[17px]">
                        <Button variant="outlined" color="red" data-id={id} onClick={handleOpenDelete}>
                          Hapus
                        </Button>
                        <Button variant="outlined" data-id={id} onClick={handleOpen}>
                          Ubah
                        </Button>
                      </div>
                    )}
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
        <DialogHeader>{updateData.id ? "Ubah" : "Tambah"} Produksi</DialogHeader>
        <DialogBody>
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-1 pointer-events-none">
              <Input label="Target" size="lg" value={selectedTarget?.mid} readOnly className="!bg-gray-200" />
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
                      {shift.name} (
                      {new Date(shift.startWorkingHour.time).getUTCHours().toString().padStart(2, "0") +
                        ":" +
                        new Date(shift.startWorkingHour.time).getUTCMinutes().toString().padStart(2, "0")}
                      &#10240;-&#10240;
                      {new Date(shift.endWorkingHour.time).getUTCHours().toString().padStart(2, "0") +
                        ":" +
                        new Date(shift.endWorkingHour.time).getUTCMinutes().toString().padStart(2, "0")}
                      )
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
        <DialogHeader>Hapus Produksi</DialogHeader>
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

      <Dialog open={openTarget} handler={handleOpenTarget}>
        <DialogHeader>Pilih Target</DialogHeader>
        <DialogBody>
          <div className="[&>div]:!grid [&>div]:!grid-cols-[auto_1fr] [&>div]:border [&>div]:p-2 [&>div]:rounded [&>div]:mb-3 ">
            {targetsData.map((target, index) => {
              return (
                <Radio
                  key={index}
                  name="target"
                  value={target.id}
                  defaultChecked={target.id === tempSelectedTargetId}
                  label={
                    <div className="flex gap-2">
                      <Typography>{target.mid + " - " + format(target.date, "dd MMMM yyyy") + " - "}</Typography>
                      <Typography color={TARGET_STATUS_COLOR.current[target.status]}>{TARGET_STATUS.current[target.status]}</Typography>
                    </div>
                  }
                  onChange={onTargetChange}
                />
              );
            })}
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" onClick={handleOpenTarget} className="mr-3">
            <span>Batal</span>
          </Button>
          <Button onClick={handleSelectTarget}>
            <span>Pilih</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

Production.propTypes = {};

export default memo(Production);
