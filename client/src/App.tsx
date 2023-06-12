import DriverInfo from "@/pages/driver-info";
import Drivers from "@/pages/drivers";
import Layout from "@/pages/layout";
import Races from "@/pages/races";
import Teams from "@/pages/teams";
import { RootState } from "@/redux/";
import { useSelector } from "react-redux";
import "./App.scss";

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
