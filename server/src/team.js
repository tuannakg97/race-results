const axios = require("axios");
const cheerio = require("cheerio");
const { v4: uuidv4 } = require("uuid");

async function getTeamData(years) {
  // initialized with the first webpage to visit
  console.log('-------> Getting Teams Data....');
  const visitedURLs = [];
  const data = [];


  for (const year of years) {

    const yearData = { id: uuidv4(), year, data: [] };
    // the current webpage to crawl
    const paginationURL = `https://www.formula1.com/en/results.html/${year}/team.html`

    // retrieving the HTML content from paginationURL
    const pageHTML = await axios.get(paginationURL);

    // adding the current webpage to the
    // web pages already crawled
    visitedURLs.push(paginationURL);

    // initializing cheerio on the current webpage
    const $ = cheerio.load(pageHTML.data);

    // retrieving the product URLs
    await $("table > tbody > tr").each((index, element) => {
      const $$ = cheerio.load(element);
      const team = $$("td > a.dark.bold.uppercase.ArchiveLink").prop("innerHTML");
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
  console.log('-------> Get Teams Data successfully!');
  return data;
}

module.exports = {
    getTeamData,
};
