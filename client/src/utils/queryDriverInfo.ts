import data from "@/data/drivers-info.json";

const getDriverInfo = (name: string) => {
  const result = data.data.filter(
    (driverData) =>
      driverData?.driverName?.toLowerCase().includes(name.toLowerCase()) ||
      driverData?.team?.toLowerCase().includes(name.toLowerCase())
  );
  return result;
};

export { getDriverInfo };
