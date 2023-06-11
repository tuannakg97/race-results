import { useState } from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import Header from "@/components/Header";
import "./App.scss";
import MediumCard from "@/components/Card";
import Table from "@/components/Table";
import { getDriversByYear } from "@/utils/queryDrivers";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/";
import Layout from "@/pages/layout";
import Drivers from "@/pages/drivers";
import Teams from "@/pages/teams";
import Races from "@/pages/races";
import DriverInfo from "@/pages/driver-info";

function App() {
  const menuValue = useSelector((state: RootState) => state.menu.value);
  const driverValue = useSelector((state: RootState) => state.driver.value);

  return (
    <Layout>
      {driverValue ? (
        <DriverInfo />
      ) : (
        <>
          {menuValue === "drivers" && <Drivers />}
          {menuValue === "teams" && <Teams />}
          {menuValue === "races" && <Races />}
        </>
      )}
    </Layout>
  );
}

export default App;
