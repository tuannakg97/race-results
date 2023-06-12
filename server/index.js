const { getDriversData } = require("./src/drivers");
const { getDriversInfoData } = require("./src/drivers-info");
const { getRaceData } = require("./src/race");
const { getTeamData } = require("./src/team");
const { writeToJsonFile } = require("./utils/writeJsonFile");


const years = ["2019","2020","2021", "2022", "2023"];

const  getAllData = async () => {
    console.log('======= Start Getting Data =======')
    const {data: driversData, driverNames} = await getDriversData(years);
    writeToJsonFile(driversData, "drivers");

    const driversInfoData = await getDriversInfoData(driverNames);
    writeToJsonFile(driversInfoData, "drivers-info");


    const teamsData = await getTeamData(years);
    writeToJsonFile(teamsData, "teams");

    const racesData = await getRaceData(years);
    writeToJsonFile(racesData, "races");
    console.log('======= Get Data Successfully =======')
}

getAllData();