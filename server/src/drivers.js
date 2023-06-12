const axios = require("axios");
const cheerio = require("cheerio");
const { v4: uuidv4 } = require("uuid");

async function getDriversData(years) {
  console.log("-------> Getting Driver Data....");
  const data = [];
  const setNames = new Set();

  for (const year of years) {
    const yearData = { id: uuidv4(), year, data: [] };
    let pageHTML;
    try {
      pageHTML = await axios.get(
        `https://www.formula1.com/en/results.html/${year}/drivers.html`
      );
    } catch (err) {}

    if (!pageHTML) continue;
    const $ = cheerio.load(pageHTML.data);

    //*  Truy cập vào thẻ chứa đata
    await $("table > tbody > tr").each((index, element) => {
      const $$ = cheerio.load(element);
      const lastName = $$("span.hide-for-tablet").prop("innerText");
      const firstName = $$("span.hide-for-mobile").prop("innerText");
      const team = $$("a.grey.semi-bold.uppercase.ArchiveLink").prop(
        "innerText"
      );
      const point = $$("td.dark.bold").prop("innerText");
      const name = `${lastName} ${firstName}`;
      setNames.add(name);
      yearData.data.push({
        id: uuidv4(),
        pos: index + 1,
        name,
        team,
        point,
      });
    });
    console.log(year);
    data.push(yearData);
  }
  console.log("-------> Get Drivers Data successfully!");
  const driverNames = Array.from(setNames);
  return { data, driverNames };
}

module.exports = {
  getDriversData,
};
