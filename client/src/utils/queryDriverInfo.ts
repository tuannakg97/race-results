import { IDriverInfo } from "@/constants/interfaces";
import data from "@/data/drivers-info.json";

const getDriverInfo = (name: string) => {
  const result: IDriverInfo[] = data.data.filter(
    (driverData: IDriverInfo) =>
      driverData.driverName?.toLowerCase().includes(name.toLowerCase()) ||
      driverData.team?.toLowerCase().includes(name.toLowerCase())
  );
  return result;
};

export { getDriverInfo };
