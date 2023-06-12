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

  // initialized with the first webpage to visit

  const visitedURLs = [];
  const data = [];

  // iterating until the queue is empty
  // or the iteration limit is hit
  for (const driverName of driverNames) {
    console.log(driverName);
    const slugName = driverName.trim().toLowerCase().replaceAll(" ", "-");
    const driverInfo = { id: uuidv4(), driverName };
    // the current webpage to crawl

    // retrieving the HTML content from paginationURL
    let pageHTML;
    try {
      pageHTML = await axios.get(
        `https://www.formula1.com/en/drivers/${slugName}.html`
      );
    } catch (err) {}

    if (!pageHTML) continue;

    // initializing cheerio on the current webpage
    const $ = cheerio.load(pageHTML.data);

    const imgUrl = $("div.fom-adaptiveimage")?.prop("data-path");
    driverInfo.imgUrl = imgUrl;

    // retrieving the product URLs
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
