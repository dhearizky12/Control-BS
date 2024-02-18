import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import { Card, Typography, List, ListItem, ListItemPrefix } from "@material-tailwind/react";
import { PresentationChartBarIcon, ScaleIcon, BeakerIcon, ViewfinderCircleIcon } from "@heroicons/react/24/outline";

function Main() {
  return (
    <div className="flex h-full">
      <Card className="h-full w-full max-w-[18rem] p-4 rounded-none">
        <div className="px-4 pt-4 pb-2">
          <Typography color="blue-gray" variant="h2" className="font-bold leading-[1]">
            <div>CONTROL</div>
            <div>BS CO</div>
          </Typography>
        </div>
        <hr className="my-2 border-blue-gray-50" />
        <List className="">
          <NavLink to="/" className={({ isActive }) => (isActive ? "[&>div]:bg-blue-gray-100/50 [&>div]:text-blue-gray-900 " : "")}>
            <ListItem className="font-bold">
              <ListItemPrefix>
                <PresentationChartBarIcon className="h-5 w-5 !text-blue-gray-900" />
              </ListItemPrefix>
              Dashboard
            </ListItem>
          </NavLink>
          <NavLink to="/target" className={({ isActive }) => (isActive ? "[&>div]:bg-blue-gray-100/50 [&>div]:text-blue-gray-900 " : "")}>
            <ListItem className="font-bold">
              <ListItemPrefix>
                <ViewfinderCircleIcon className="h-5 w-5" />
              </ListItemPrefix>
              Target
            </ListItem>
          </NavLink>
          <NavLink to="/production" className={({ isActive }) => (isActive ? "[&>div]:bg-blue-gray-100/50 [&>div]:text-blue-gray-900 " : "")}>
            <ListItem className="font-bold">
              <ListItemPrefix>
                <BeakerIcon className="h-5 w-5" />
              </ListItemPrefix>
              Production
            </ListItem>
          </NavLink>
          <NavLink to="/grammage" className={({ isActive }) => (isActive ? "[&>div]:bg-blue-gray-100/50 [&>div]:text-blue-gray-900 " : "")}>
            <ListItem className="font-bold">
              <ListItemPrefix>
                <ScaleIcon className="h-5 w-5" />
              </ListItemPrefix>
              Gramasi
            </ListItem>
          </NavLink>
        </List>
      </Card>
      <div className="flex-1 bg-gray-50">
        <Outlet />
      </div>
    </div>
  );
}

Main.propTypes = {};

export default Main;
