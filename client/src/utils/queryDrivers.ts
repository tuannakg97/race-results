import data from "@/data/drivers.json";
import { createListDataFromKey } from "./helper";

const getDriversByYear = (year: string) => {
  const result = data.data.find((driverData) => driverData.year === year);
  return result;
};

const analysticDriverByName = (name: string) => {
  return createListDataFromKey({
    key: "name",
    value: name,
    numberValueKey: "point",
    data: data.data,
  });
};

export { getDriversByYear, analysticDriverByName };
