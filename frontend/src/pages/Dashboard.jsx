import React from "react";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import ChartView from "../components/Chart";

function Dashboard(props) {
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
              <Typography className="font-bold flex gap-2 items-end text-4xl">Giv Biru</Typography>
            </CardBody>
          </Card>
          <Card color="gray" variant="gradient" shadow={false} className="border flex-1">
            <CardBody className="py-4 h-full flex flex-col justify-between">
              <Typography variant="h6" className="font-bold">
                Target Produksi
              </Typography>
              <div>
                <Typography className="font-bold text-4xl inline-block mr-2">4000</Typography>
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
                <Typography className="font-bold text-4xl inline-block mr-2">3000</Typography>
                <Typography className="font-bold text-lg inline-block">Box</Typography>
              </div>
            </CardBody>
          </Card>
          <Card color="gray" variant="gradient" shadow={false} className="border flex-1">
            <CardBody className="py-4 h-full flex flex-col justify-between">
              <Typography variant="h6" className="font-bold">
                Waste Sabun
              </Typography>
              <div>
                <Typography className="font-bold text-4xl inline-block mr-2">50</Typography>
                <Typography className="font-bold text-lg inline-block">Kg</Typography>
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
            <div>
              <Typography color="blue-gray" className="font-bold inline-block mr-2 mt-3 text-5xl">
                1000
              </Typography>
              <Typography color="blue-gray" className="font-bold inline-block mt-3 text-lg">
                Box
              </Typography>
            </div>
          </CardBody>
        </Card>
        <Card shadow={false} className="border flex-1">
          <CardBody className="h-full text-center">
            <Typography variant="h6" className="font-bold">
              Hasil Adukan
            </Typography>
            <div>
              <Typography color="blue-gray" className="font-bold inline-block mr-2 mt-3 text-5xl">
                30
              </Typography>
              <Typography color="blue-gray" className="font-bold inline-block mt-3 text-lg">
                X
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
              <Typography color="blue-gray" className="font-bold inline-block mr-2 mt-3 text-5xl">
                10
              </Typography>
              <Typography color="blue-gray" className="font-bold inline-block mt-3 text-lg">
                X
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
              <Typography color="blue-gray" className="font-bold inline-block mr-2 mt-3 text-5xl">
                10
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
              <Typography color="blue-gray" className="font-bold inline-block mr-2 mt-3 text-5xl">
                10
              </Typography>
              <Typography color="blue-gray" className="font-bold inline-block mt-3 text-lg">
                Kg
              </Typography>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

Dashboard.propTypes = {};

export default Dashboard;
