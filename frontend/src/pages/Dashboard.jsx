import React, { useCallback, useEffect, useRef, useState } from "react";
import { Card, CardBody, Typography, Button, Dialog, DialogHeader, DialogBody, DialogFooter, Radio, Spinner } from "@material-tailwind/react";
import { ChevronDownIcon, Bars4Icon } from "@heroicons/react/24/outline";
import { format } from "date-fns";

function Dashboard() {
  const TARGET_STATUS = useRef(["Selesai", "Aktif"]); // TODO: move this into constan
  const TARGET_STATUS_COLOR = useRef(["blue", "green"]); // TODO: move this into constan

  const [openLoading, setOpenLoading] = useState(false);
  const [targetsData, setTargetsData] = useState([]);

  const [totalProduction, setTotalProduction] = useState(0);
  const [totalMix, setTotalMix] = useState(0);
  const [insufficientMix, setInsufficientMix] = useState(0);
  const [totalAdditionBS, setTotalAdditionBS] = useState(0);
  const [stagnationMix, setStagnationMix] = useState(0);
  const [totalWaste, setTotalWaste] = useState(0);
  const [shortageProduction, setShortageProduction] = useState(0);
  const [grammage, setGrammage] = useState(0);

  const [selectedTarget, setSelectedTarget] = useState(null);
  const [openTarget, setOpenTarget] = useState(false);
  const [tempSelectedTargetId, setTempSelectedTargetId] = useState(null);

  const handleGetProductionData = useCallback((activeTarget) => {
    return fetch("/api/productions?targetId=" + activeTarget.id, { method: "GET" })
      .then((response) => response.json())
      .catch((error) => {
        console.error("API Error:", error);
      });
  }, []);

  const handleGetGrammageData = useCallback((activeTarget) => {
    return fetch("/api/grammages?targetId=" + activeTarget.id, { method: "GET" })
      .then((response) => response.json())
      .catch((error) => {
        console.error("API Error:", error);
      });
  }, []);

  const processData = useCallback(
    async (selectedTarget) => {
      const productions = await handleGetProductionData(selectedTarget);
      let totalProduction = 0;
      let totalMix = 0;
      let totalAdditionBS = 0;
      let totalWaste = 0;
      productions.forEach((production) => {
        totalProduction += production.result;
        totalMix += production.mixResult;
        totalAdditionBS += production.additionBS;
        totalWaste += production.waste;
      });

      totalMix += Math.floor(totalAdditionBS / 120);

      setTotalProduction(totalProduction);
      setTotalMix(totalMix);
      setTotalAdditionBS(totalAdditionBS);
      setTotalWaste(totalWaste);
      setShortageProduction(selectedTarget.target - totalProduction);

      const grammages = await handleGetGrammageData(selectedTarget);
      const averages = grammages.map((grammage) => grammage.average);
      const grammage = averages.length ? (averages.reduce((a, b) => a + b, 0) / averages.length).toFixed(2) : 0;
      setGrammage(grammage);

      processInsufficientMix(grammage, totalProduction, selectedTarget.target, totalAdditionBS, totalWaste);
      processStagnationMix(totalProduction, grammage, totalMix, totalAdditionBS, totalWaste);
    },
    [handleGetProductionData, handleGetGrammageData]
  );

  const processInsufficientMix = (grammageInput, totalProductionInput, targetInput, totalAdditionBSInput, totalWasteInput) => {
    let grammage = grammageInput / 1000;
    let totalProduction = totalProductionInput * 72 * grammage;
    let materialRequirements = targetInput * 72 * grammage;
    let materialTotal = materialRequirements - totalAdditionBSInput - (totalProduction + totalWasteInput);
    let insufficientMix = materialTotal / 210;

    setInsufficientMix(insufficientMix.toFixed(2));
  };

  const processStagnationMix = (totalProductionInput, grammageInput, totalMixInput, totalAdditionBSInput, totalWasteInput) => {
    let grammage = grammageInput / 1000;
    let totalProduction = totalProductionInput * 72 * grammage;
    let totalMix = totalMixInput * 120;

    let stagnationMix = totalMix - totalAdditionBSInput - (totalProduction + totalWasteInput);
    setStagnationMix(stagnationMix.toFixed(2));
  };

  const handleGetTargetData = useCallback(() => {
    return fetch("/api/targets", { method: "GET" })
      .then((response) => response.json())
      .then(async (responses) => {
        setTargetsData(responses);

        let selectedTarget = responses.find((target) => target.status);
        if (selectedTarget) {
          setSelectedTarget(selectedTarget);
          setTempSelectedTargetId(selectedTarget.id);

          processData(selectedTarget);
        }

        setOpenLoading(false);
      })
      .catch((error) => {
        setOpenLoading(false);
        console.error("API Error:", error);
      });
  }, [processData]);

  useEffect(() => {
    setOpenLoading(true);
    handleGetTargetData();

    return () => {};
  }, [handleGetTargetData]);

  const handleOpenLoading = () => setOpenLoading(!openLoading);
  const handleOpenTarget = () => setOpenTarget(!openTarget);

  const onTargetChange = ({ target }) => setTempSelectedTargetId(target.value);

  const handleSelectTarget = async () => {
    let selected = targetsData.find((target) => target.id === Number(tempSelectedTargetId));
    setSelectedTarget(selected);
    setTempSelectedTargetId(selected.id);
    handleOpenTarget();

    setOpenLoading(true);
    await processData(selected);
    setOpenLoading(false);
  };

  return (
    <div className="h-full py-4 px-8 flex flex-col gap-4 overflow-auto">
      <div className="flex items-end gap-2">
        <div>
          <Bars4Icon className="w-10 h-10" />
        </div>
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
      </div>
      <div className="w-full">
        <div className="h-full w-full grid grid-cols-1 xl:grid-cols-5 gap-4">
          <Card color="gray" variant="gradient" shadow={false} className="border flex-1">
            <CardBody className="py-4 h-full flex flex-col justify-between">
              <Typography variant="h6" className="font-bold">
                Nama Produk
              </Typography>
              <Typography className="font-bold flex gap-2 items-end text-4xl">{selectedTarget?.product?.name || "-"}</Typography>
            </CardBody>
          </Card>
          <Card color="gray" variant="gradient" shadow={false} className="border flex-1">
            <CardBody className="py-4 h-full flex flex-col justify-between">
              <Typography variant="h6" className="font-bold">
                Target Produksi
              </Typography>
              <div>
                <Typography className="font-bold text-4xl inline-block mr-2">{selectedTarget?.target || "-"}</Typography>
                <Typography className="font-bold text-lg inline-block">Box</Typography>
              </div>
            </CardBody>
          </Card>
          <Card color="gray" variant="gradient" shadow={false} className="border flex-1">
            <CardBody className="py-4 h-full flex flex-col justify-between">
              <Typography variant="h6" className="font-bold">
                Hasil Produksi
              </Typography>
              <div>
                <Typography className="font-bold text-4xl inline-block mr-2">{totalProduction}</Typography>
                <Typography className="font-bold text-lg inline-block">Box</Typography>
              </div>
            </CardBody>
          </Card>
          <Card color="gray" variant="gradient" shadow={false} className="border flex-1">
            <CardBody className="py-4 h-full flex flex-col justify-between">
              <Typography variant="h6" className="font-bold">
                Kurang Produksi
              </Typography>
              <div>
                <Typography className="font-bold text-4xl inline-block mr-2">{shortageProduction}</Typography>
                <Typography className="font-bold text-lg inline-block">Box</Typography>
              </div>
            </CardBody>
          </Card>
          <Card color="gray" variant="gradient" shadow={false} className="border flex-1">
            <CardBody className="py-4 h-full flex flex-col justify-between">
              <Typography variant="h6" className="font-bold">
                Gramasi Terakhir
              </Typography>
              <div>
                <Typography className="font-bold text-4xl inline-block mr-2">{grammage}</Typography>
                <Typography className="font-bold text-lg inline-block">Gram</Typography>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">
        <Card shadow={false} className="border flex-1">
          <CardBody className="h-full text-center">
            <Typography variant="h6" className="font-bold">
              Hasil Adukan
            </Typography>
            <div>
              <Typography color="blue-gray" className="font-bold mt-3 text-6xl">
                {totalMix}
              </Typography>
              <Typography color="blue-gray" className="font-bold inline-block mt-3 text-lg">
                Kali
              </Typography>
            </div>
          </CardBody>
        </Card>
        <Card shadow={false} className="border flex-1">
          <CardBody className="h-full text-center">
            <Typography variant="h6" className="font-bold">
              Kurang Adukan
            </Typography>
            <div>
              <Typography color="blue-gray" className="font-bold mt-3 text-6xl">
                {insufficientMix}
              </Typography>
              <Typography color="blue-gray" className="font-bold inline-block mt-3 text-lg">
                Kali
              </Typography>
            </div>
          </CardBody>
        </Card>
        <Card shadow={false} className="border flex-1">
          <CardBody className="h-full text-center">
            <Typography variant="h6" className="font-bold">
              Penambahan BS
            </Typography>
            <div>
              <Typography color="blue-gray" className="font-bold mt-3 text-6xl">
                {totalAdditionBS}
              </Typography>
              <Typography color="blue-gray" className="font-bold inline-block mt-3 text-lg">
                Kg
              </Typography>
            </div>
          </CardBody>
        </Card>
        <Card shadow={false} className="border flex-1">
          <CardBody className="h-full text-center">
            <Typography variant="h6" className="font-bold">
              Stagnasi Adukan
            </Typography>
            <div>
              <Typography color="blue-gray" className="font-bold mt-3 text-6xl">
                {stagnationMix}
              </Typography>
              <Typography color="blue-gray" className="font-bold inline-block mt-3 text-lg">
                Kg
              </Typography>
            </div>
          </CardBody>
        </Card>
        <Card shadow={false} className="border flex-1">
          <CardBody className="h-full text-center">
            <Typography variant="h6" className="font-bold">
              Waste
            </Typography>
            <div>
              <Typography color="blue-gray" className="font-bold mt-3 text-6xl">
                {totalWaste}
              </Typography>
              <Typography color="blue-gray" className="font-bold inline-block mt-3 text-lg">
                Kg
              </Typography>
            </div>
          </CardBody>
        </Card>
      </div>
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

Dashboard.propTypes = {};

export default Dashboard;
