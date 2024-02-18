import React from "react";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import ChartView from "../components/Chart";

function Grammage(props) {
  return (
    <div className="h-full py-4 px-8 flex flex-col gap-4">
      <div>
        <div className="text-gray-700">Tanggal</div>
        <div className="font-bold text-3xl">08 Februari 2024</div>
      </div>
      <div className="flex-1 w-full grid grid-cols-4 gap-4">
        <div className="col-span-3">
          <ChartView />
        </div>
        <div className="h-full flex flex-col gap-4">
          <Card color="gray" variant="gradient" shadow={false} className="border flex-1">
            <CardBody className="py-4 h-full flex flex-col justify-between">
              <Typography variant="h6" className="font-bold">
                Nama Produk
              </Typography>
              <div>
                <Typography className="font-bold flex gap-2 items-end">
                  <div className="text-4xl">Giv Biru</div>
                </Typography>
              </div>
            </CardBody>
          </Card>
          <Card color="gray" variant="gradient" shadow={false} className="border flex-1">
            <CardBody className="py-4 h-full flex flex-col justify-between">
              <Typography variant="h6" className="font-bold">
                Target Produksi
              </Typography>
              <div>
                <Typography className="font-bold flex gap-2 items-end">
                  <div className="text-4xl">4000</div>
                  <div className="text-lg">Box</div>
                </Typography>
              </div>
            </CardBody>
          </Card>
          <Card color="gray" variant="gradient" shadow={false} className="border flex-1">
            <CardBody className="py-4 h-full flex flex-col justify-between">
              <Typography variant="h6" className="font-bold">
                Hasil Produksi
              </Typography>
              <div>
                <Typography className="font-bold flex gap-2 items-end">
                  <div className="text-4xl">3000</div>
                  <div className="text-lg">Box</div>
                </Typography>
              </div>
            </CardBody>
          </Card>
          <Card color="gray" variant="gradient" shadow={false} className="border flex-1">
            <CardBody className="py-4 h-full flex flex-col justify-between">
              <Typography variant="h6" className="font-bold">
                Waste Sabun
              </Typography>
              <div>
                <Typography className="font-bold flex gap-2 items-end">
                  <div className="text-4xl">3</div>
                  <div className="text-lg">Kg</div>
                </Typography>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-4">
        <Card shadow={false} className="border flex-1">
          <CardBody className="h-full text-center">
            <Typography variant="h6" className="font-bold">
              Kurang Produksi
            </Typography>
            <Typography color="blue-gray" className="font-bold flex gap-2 items-end justify-center mt-3">
              <div className="text-5xl">1000</div>
              <div className="text-lg">Box</div>
            </Typography>
          </CardBody>
        </Card>
        <Card shadow={false} className="border flex-1">
          <CardBody className="h-full text-center">
            <Typography variant="h6" className="font-bold">
              Hasil Adukan
            </Typography>
            <Typography color="blue-gray" className="font-bold flex gap-2 items-end justify-center mt-3">
              <div className="text-5xl">30</div>
              <div className="text-lg">X</div>
            </Typography>
          </CardBody>
        </Card>
        <Card shadow={false} className="border flex-1">
          <CardBody className="h-full text-center">
            <Typography variant="h6" className="font-bold">
              Kurang Adukan
            </Typography>
            <Typography color="blue-gray" className="font-bold flex gap-2 items-end justify-center mt-3">
              <div className="text-5xl">10</div>
              <div className="text-lg">X</div>
            </Typography>
          </CardBody>
        </Card>
        <Card shadow={false} className="border flex-1">
          <CardBody className="h-full text-center">
            <Typography variant="h6" className="font-bold">
              Penambahan BS
            </Typography>
            <Typography color="blue-gray" className="font-bold flex gap-2 items-end justify-center mt-3">
              <div className="text-5xl">10</div>
              <div className="text-lg">Kg</div>
            </Typography>
          </CardBody>
        </Card>
        <Card shadow={false} className="border flex-1">
          <CardBody className="h-full text-center">
            <Typography variant="h6" className="font-bold">
              Stagnasi Adukan
            </Typography>
            <Typography color="blue-gray" className="font-bold flex gap-2 items-end justify-center mt-3">
              <div className="text-5xl">10</div>
              <div className="text-lg">Kg</div>
            </Typography>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

Grammage.propTypes = {};

export default Grammage;
