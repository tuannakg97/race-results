/* eslint-disable @typescript-eslint/no-explicit-any */
import MediumCard from "@/components/Card";
import Table from "@/components/Table";
import { useSelector } from "react-redux";
import "./styles.scss";
import { getDriversByYear } from "@/utils/queryDrivers";
import { getDriverInfo } from "@/utils/queryDriverInfo";
import Years from "@/components/Years";
import { RootState } from "@/redux/";
import { IDriver } from "@/constants/interfaces";

const columns = [
  {
    name: "pos",
    keyData: "pos",
  },
  {
    name: "driver",
    keyData: "name",
  },
  {
    name: "team",
    keyData: "team",
  },
  {
    name: "points",
    keyData: "point",
  },
];

function DriversPage() {
  const yearValue = useSelector((state: RootState) => state.year.value);
  const { data }: {data: Array<IDriver>} = getDriversByYear(yearValue);
  const len = data.length;
  const topNumber = 3;
  const top = data.slice(0, topNumber);
  const remain = data.slice(topNumber, len);

  return (
    <div className="drivers">
      <div className="drivers_years">
        <Years />
      </div>
      <div className="drivers_cards">
        {top.map(({ id, name, team, point }: any, index: number) => {
          const driverInfo = getDriverInfo(name);
          let imgUrl;
          if (driverInfo?.length) {
            imgUrl = driverInfo[0].imgUrl;
          }
          return (
            <MediumCard
              key={id}
              title={name}
              subtitle={team}
              primary={`PTS: ${point}`}
              imgUrl={imgUrl}
              pos={index + 1}
            />
          );
        })}
      </div>

      <div className="drivers_table">
        <Table columns={columns} data={remain} />
      </div>
    </div>
  );
}

export default DriversPage;
