const axios = require("axios");
const cheerio = require("cheerio");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");

async function getRaceData(years) {
  console.log("-------> Getting Race Data....");
  // initialized with the first webpage to visit
  const data = [];

  for await (const year of years) {
    const yearData = { id: uuidv4(), year, data: [] };

    // retrieving the HTML content from paginationURL
    let pageHTML;

    try {
      pageHTML = await axios.get(
        `https://www.formula1.com/en/results.html/${year}/races.html`
      );
    } catch (err) {}

    if (!pageHTML) continue;

    // initializing cheerio on the current webpage
    const $ = cheerio.load(pageHTML.data);

    // retrieving the product URLs
    await $("table > tbody > tr").each((index, element) => {
      const $$ = cheerio.load(element);
      const grandPrix = $$("a.dark.bold.ArchiveLink").prop("innerHTML");
      const date = $$("td.dark.hide-for-mobile").prop("innerHTML");
      const firstName = $$("td.dark.bold > span.hide-for-mobile").prop(
        "innerHTML"
      );
      const lastName = $$("td.dark.bold > span.hide-for-tablet").prop(
        "innerHTML"
      );
      const team = $$("td.semi-bold.uppercase").prop("innerHTML");
      const laps = $$("td.bold.hide-for-mobile").prop("innerHTML");
      const time = $$("td.dark.bold.hide-for-tablet").prop("innerHTML");

      yearData.data.push({
        id: uuidv4(),
        grandPrix: grandPrix.replace(/\n/g, "").trim(),
        date: moment(new Date(date)).format("DD/MM/YYYY"),
        winner: `${lastName} ${firstName}`,
        team,
        laps,
        time,
      });
    });
    console.log(year);
    data.push(yearData);
  }
  console.log("-------> Get Races Data successfully!");
  return data;
}

module.exports = {
  getRaceData,
};
