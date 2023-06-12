const axios = require("axios");
const cheerio = require("cheerio");
const { v4: uuidv4 } = require("uuid");

const infoList = [
  "team",
  "country",
  "podiums",
  "points",
  "grandsPrixEntered",
  "worldChampionships",
  "highestRaceFinish",
  "highestGridPosition",
  "dateofBirth",
  "placeofBirth",
];

async function getDriversInfoData(driverNames) {
  console.log("-------> Getting Info Driver Data....");
  const data = [];

  for (const driverName of driverNames) {
    console.log(driverName);
    const slugName = driverName.trim().toLowerCase().replaceAll(" ", "-");
    const driverInfo = { id: uuidv4(), driverName };

    let pageHTML;
    try {
      pageHTML = await axios.get(
        `https://www.formula1.com/en/drivers/${slugName}.html`
      );
    } catch (err) {}

    if (!pageHTML) continue;

    const $ = cheerio.load(pageHTML.data);

    const imgUrl = $("div.fom-adaptiveimage")?.prop("data-path");
    driverInfo.imgUrl = imgUrl;

    await $("table.stat-list > tbody > tr").each((index, element) => {
      const $$ = cheerio.load(element);

      const team = $$("td.stat-value").prop("innerText");

      driverInfo[infoList[index]] = team;
    });
    data.push(driverInfo);
  }
  console.log("-------> Get Drivers Info Data successfully!");
  return data;
}

module.exports = {
  getDriversInfoData,
};
