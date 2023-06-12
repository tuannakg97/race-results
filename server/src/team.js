const axios = require("axios");
const cheerio = require("cheerio");
const { v4: uuidv4 } = require("uuid");

async function getTeamData(years) {
  console.log("-------> Getting Teams Data....");
  const data = [];

  for (const year of years) {
    const yearData = { id: uuidv4(), year, data: [] };
    let pageHTML;

    try {
      pageHTML = await axios.get(
        `https://www.formula1.com/en/results.html/${year}/team.html`
      );
    } catch (err) {}

    if (!pageHTML) continue;
    const $ = cheerio.load(pageHTML.data);
    await $("table > tbody > tr").each((index, element) => {
      const $$ = cheerio.load(element);
      const team = $$("td > a.dark.bold.uppercase.ArchiveLink").prop(
        "innerHTML"
      );
      const points = $$("td.dark.bold").prop("innerHTML");

      yearData.data.push({
        id: uuidv4(),
        pos: index + 1,
        team,
        points,
      });
    });
    console.log(year);
    data.push(yearData);
  }
  console.log("-------> Get Teams Data successfully!");
  return data;
}

module.exports = {
  getTeamData,
};
