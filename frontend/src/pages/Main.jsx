import React, { useEffect } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { Card, Typography, List, ListItem, ListItemPrefix, Accordion, AccordionHeader, AccordionBody } from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ScaleIcon,
  BeakerIcon,
  ViewfinderCircleIcon,
  ChevronDownIcon,
  MinusIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";

function Main() {
  const location = useLocation();
  const { pathname } = location;
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  useEffect(() => {
    if (pathname.includes("/master")) {
      setOpen(1);
    } else {
      setOpen(0);
    }
  }, [pathname]);

  return (
    <div className="flex h-full">
      <Card className="h-full w-full max-w-[18rem] p-4 rounded-none">
        <div className="px-4 pt-4 pb-2">
          <Typography color="blue-gray" className="text-3xl font-extrabold leading-[1]">
            <div>CONTROL BS</div>
            <div>CHANGE OVER</div>
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

          <Accordion
            open={open === 1}
            icon={<ChevronDownIcon className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`} />}
          >
            <ListItem className="p-0" selected={open === 1}>
              <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
                <ListItemPrefix>
                  <Squares2X2Icon className="h-5 w-5 !text-blue-gray-900" />
                </ListItemPrefix>
                <Typography className="mr-auto font-bold">Master Data</Typography>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
              <List className="p-0">
                <NavLink
                  to="/master/product"
                  className={({ isActive }) => (isActive ? "[&>div]:bg-blue-gray-100/50 [&>div]:text-blue-gray-900 " : "")}
                >
                  <ListItem>
                    <ListItemPrefix>
                      <MinusIcon className="h-5 w-5 !text-blue-gray-900" />
                    </ListItemPrefix>
                    Product
                  </ListItem>
                </NavLink>
                <NavLink to="/master/group" className={({ isActive }) => (isActive ? "[&>div]:bg-blue-gray-100/50 [&>div]:text-blue-gray-900 " : "")}>
                  <ListItem>
                    <ListItemPrefix>
                      <MinusIcon className="h-5 w-5 !text-blue-gray-900" />
                    </ListItemPrefix>
                    Group
                  </ListItem>
                </NavLink>
                <NavLink to="/master/shift" className={({ isActive }) => (isActive ? "[&>div]:bg-blue-gray-100/50 [&>div]:text-blue-gray-900 " : "")}>
                  <ListItem>
                    <ListItemPrefix>
                      <MinusIcon className="h-5 w-5 !text-blue-gray-900" />
                    </ListItemPrefix>
                    Shift
                  </ListItem>
                </NavLink>
              </List>
            </AccordionBody>
          </Accordion>
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
