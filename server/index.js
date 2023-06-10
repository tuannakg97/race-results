const { getDriversData } = require("./src/drivers");
const { getRaceData } = require("./src/race");
const { getTeamData } = require("./src/team");
const { writeToJsonFile } = require("./utils/writeJsonFile");


const years = ["2019", "2020", "2021", "2022", "2023"];

const  getAllData = async () => {
    console.log('======= Start Getting Data =======')
    const dt = await getDriversData(years);
    writeToJsonFile(dt, "drivers");

    const dt1 = await getTeamData(years);
    writeToJsonFile(dt1, "teams");

    const dt2 = await getRaceData(years);
    writeToJsonFile(dt2, "races");
    console.log('======= Get Data Successfully =======')
}

getAllData();