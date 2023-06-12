/* eslint-disable @typescript-eslint/no-explicit-any */
interface yearData {
  id: string;
  year: string;
  data: Array<any>;
}

interface createListDataFromKey {
  key: string;
  value: string;
  numberValueKey: string;
  data: Array<any>;
}

const createListDataFromKey = ({
  key,
  value,
  numberValueKey,
  data,
}: createListDataFromKey) => {
  const result: any = [];

  data.forEach((yearData: yearData) => {
    const item = yearData.data.find((el) => el[key] === value);

    if (item) {
      result.push({
        ...item,
        value: Number(item[numberValueKey]),
        year: yearData.year,
      });
    }
  });

  return result;
};



export { createListDataFromKey };
