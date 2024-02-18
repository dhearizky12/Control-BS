import React, { memo } from "react";
import { Card, CardBody, Typography } from "@material-tailwind/react";

function Target() {

  return (
    <div className="h-full flex flex-col py-4 px-8">
      <div>
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
      </div>
    </div>
  );
}

Target.propTypes = {};

export default memo(Target);
