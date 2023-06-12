/* eslint-disable @typescript-eslint/no-explicit-any */
import MediumCard from "@/components/Card";
import Years from "@/components/Years";
import { RootState } from "@/redux/";
import { getRacesByYear } from "@/utils/queryRaces";
import { useSelector } from "react-redux";
import "./styles.scss";
import { IRace } from "@/constants/interfaces";


function RacesPage() {
  const yearValue = useSelector((state: RootState) => state.year.value);
  const { data }: {data: IRace[]} = getRacesByYear(yearValue);

  return (
    <div className="races">
      <div className="races_years">
        <Years />
      </div>
      <div className="races_cards">
        {data.map(({ id, grandPrix, date, winner, team, laps, time }: any) => (
          <MediumCard
            key={id}
            title={grandPrix}
            subtitle={date}
            primary={`Winner: ${winner}`}
          >
            <p className="time">{time}</p>
            <p className="team">{team}</p>
            <p className="laps">Laps: {laps}</p>
          </MediumCard>
        ))}
      </div>
    </div>
  );
}

export default RacesPage;
