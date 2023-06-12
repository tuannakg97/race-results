import BarChart from "@/components/Chart/Mixed";
import { RootState } from "@/redux/";
import { getDriverInfo } from "@/utils/queryDriverInfo";
import { analysticDriverByName } from "@/utils/queryDrivers";
import { useSelector } from "react-redux";
import "./styles.scss";
import { IDriverInfo } from "@/constants/interfaces";
import { defaultImage } from "@/constants/images";

const Item = ({ title, value }: { title: string; value?: string | number }) => (
  <div className="driverInfo_right_details_item">
    <h4>{title}:</h4>
    <p>{value}</p>
  </div>
);

interface ConvertProps extends IDriverInfo {
  value: number;
  year: string;
  pos: number;
}

const convertData = (data: ConvertProps[]) => {
  const categories: string[] = [];
  const lineSeries: number[] = [];
  const barSeries: number[] = [];

  data.forEach(({ value, year, pos }: ConvertProps) => {
    categories.push(year);
    barSeries.push(value);
    lineSeries.push(pos);
  });

  return {
    categories,
    lineSeries,
    barSeries,
  };
};

function DriverInfo() {
  const driverName: string = useSelector(
    (state: RootState) => state.driver.value
  );
  const driverInfo: IDriverInfo = getDriverInfo(driverName)[0];
  const {
    imgUrl,
    dateofBirth,
    country,
    placeofBirth,
    podiums,
    grandsPrixEntered,
    worldChampionships,
    highestRaceFinish,
    highestGridPosition,
    team,
  } = driverInfo;
  const data: ConvertProps[] = analysticDriverByName(driverName);
  const { categories, barSeries, lineSeries } = convertData(data);

  return (
    <div className="driverInfo">
      <div className="driverInfo_left">
        <div
          className="driverInfo_left_img"
          style={{
            backgroundImage: `url(${imgUrl || defaultImage})`,
          }}
        ></div>
      </div>

      <div className="driverInfo_right">
        <div className="driverInfo_right_details">
          <div className="driverInfo_right_details--enable-md">
            <img src={imgUrl} alt="avata" />
            <div>
              <h1>{driverName}</h1>
              <h3>{dateofBirth}</h3>
              <h4>{placeofBirth}</h4>
            </div>
          </div>

          <div className="driverInfo_right_details--disable-md">
            <h1>{driverName}</h1>
          </div>

          <div className="driverInfo_right_details--disable-md">
            <Item title="Date of Birth" value={dateofBirth} />
          </div>

          <div className="driverInfo_right_details--disable-md">
            <Item title="Place of Birth" value={placeofBirth} />
          </div>

          <Item title="Team" value={team} />
          <Item title="Country" value={country} />
          <Item title="Podiums" value={podiums} />
          <Item title="Grands Prix Entered" value={grandsPrixEntered} />
          <Item title="World Championships" value={worldChampionships} />
          <Item title="Highest race finish" value={highestRaceFinish} />
          <Item title="Highest grid position" value={highestGridPosition} />
        </div>
        <div className="driverInfo_right_chart">
          <BarChart
            categories={categories}
            lineSeries={lineSeries}
            barSeries={barSeries}
          />
        </div>
      </div>
    </div>
  );
}

export default DriverInfo;
