import { Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { Square3Stack3DIcon } from "@heroicons/react/24/outline";

const chartConfig = {
  type: "line",
  series: [
    {
      name: "Gramasi",
      data: [70, 72, 69, 71, 71, 72, 70, 70, 70, null, null, null, null, null],
    },
  ],
  options: {
    chart: {
      toolbar: {
        show: false,
      },
      animations: {
        enabled: false,
      },
    },
    title: {
      show: "",
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#020617"],
    stroke: {
      lineCap: "round",
      curve: "smooth",
    },
    markers: {
      size: 0,
    },
    xaxis: {
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      labels: {
        style: {
          colors: "#616161",
          fontSize: "12px",
          fontFamily: "inherit",
          fontWeight: 400,
        },
      },
      categories: ["07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"],
    },
    yaxis: {
      labels: {
        style: {
          colors: "#616161",
          fontSize: "12px",
          fontFamily: "inherit",
          fontWeight: 400,
        },
      },
      max: 80,
      min: 40,
      range: 50,
    },
    grid: {
      show: true,
      borderColor: "#dddddd",
      strokeDashArray: 5,
      xaxis: {
        lines: {
          show: true,
        },
      },
      padding: {
        top: 5,
        right: 20,
      },
    },
    fill: {
      opacity: 0.8,
    },
    tooltip: {
      theme: "dark",
    },
  },
};

function ChartView() {
  return (
    <Card shadow={false} className="border h-full">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="-mb-6 h-[63.19px] flex-shrink-0 pb-2 flex items-center gap-3 rounded-none"
      >
        <div className="w-max rounded-lg bg-gray-900 p-2 text-white m-1">
          <Square3Stack3DIcon className="h-4 w-4" />
        </div>
        <Typography variant="h3" color="blue-gray" className="flex-1">
          Gramasi
        </Typography>
        <div className="pr-2">
          <div>Gramasi Final</div>
          <div className="flex items-end justify-end gap-1">
            <Typography color="blue-gray" className="text-4xl font-bold">
              70
            </Typography>
            <Typography color="blue-gray">Kg</Typography>
          </div>
        </div>
      </CardHeader>
      <CardBody className="h-full pt-0 px-2 pb-0">
        <Chart height="99%" {...chartConfig} />
      </CardBody>
    </Card>
  );
}

export default ChartView;
