import data from '@/data/teams.json';

const getTeamsByYear = (year: string) => {
    const result = data.data.find(teamData => teamData.year === year); 
    return result || {data: []};
}


export {
    getTeamsByYear
}