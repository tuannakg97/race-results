import data from '@/data/races.json';

const getRacesByYear = (year: string) => {
    const result = data.data.find(raceData => raceData.year === year); 
    return result || {data: []};
}


export {
    getRacesByYear
}