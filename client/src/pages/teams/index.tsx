/* eslint-disable @typescript-eslint/no-explicit-any */
import MediumCard from "@/components/Card";
import Table from "@/components/Table";
import { useSelector } from "react-redux";
import "./styles.scss";
import { getTeamsByYear } from "@/utils/queryTeams";
import Years from "@/components/Years";
import { RootState } from "@/redux/";
import { ITeam } from "@/constants/interfaces";


const columns = [
  {
    name: "pos",
    keyData: "pos",
  },
  {
    name: "team",
    keyData: "team",
  },
  {
    name: "points",
    keyData: "points",
  },
];

function TeamsPage() {
  const yearValue = useSelector((state: RootState) => state.year.value);
  const { data }: {data: ITeam[]} = getTeamsByYear(yearValue);
  const len = data.length;
  const topNumber = 3;
  const top = data.slice(0, topNumber);
  const remain = data.slice(topNumber, len);

  return (
    <div className="teams">
     <div className="teams_years">
     <Years />
     </div>
      <div className="teams_cards">
        {top.map(({ id, team, points }: any, index: number) => (
          <MediumCard key={id} title={team} subtitle="" primary={`PTS: ${points}`} pos={index + 1} />
        ))}
      </div>

      <div className="teams_table">
        <Table columns={columns} data={remain} />
      </div>
    </div>
  );
}

export default TeamsPage;
