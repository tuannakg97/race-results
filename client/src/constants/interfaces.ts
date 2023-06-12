export interface IDriverInfo {
  id:  string ;
  driverName?:  string ;
  imgUrl?:  string ;
  team?:  string ;
  country?:  string ;
  podiums?:  string ;
  points?:  string ;
  grandsPrixEntered?:  string ;
  worldChampionships?:  string ;
  highestRaceFinish?:  string ;
  highestGridPosition?:  string ;
  dateofBirth?:  string ;
  placeofBirth?:  string ;
}

export interface IDriver {
  id: string;
  point: string;
  name: string;
  pos: number;
  team: string;
}

export interface IRace {
  id: string;
  date: string;
  grandPrix: string;
  laps: string;
  team: string;
  winner: string;
  time: string;
}

export interface ITeam {
  id: string;
  points: string;
  pos: number;
  team: string;
}