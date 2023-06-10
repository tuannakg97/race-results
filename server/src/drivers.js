const axios = require("axios");
const cheerio = require("cheerio");
const { v4: uuidv4 } = require("uuid");

async function getDriversData(years) {
  console.log('-------> Getting Driver Data....');

  // initialized with the first webpage to visit

  const visitedURLs = [];
  const data = [];

  // iterating until the queue is empty
  // or the iteration limit is hit
  for (const year of years) {
    const paginationURLsToVisit = [
      `https://www.formula1.com/en/results.html/${year}/drivers.html`,
    ];
    const yearData = { id: uuidv4(), year, data: [] };
    // the current webpage to crawl
    const paginationURL = paginationURLsToVisit.pop();

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
      const lastName = $$("span.hide-for-tablet").prop("innerText");
      const firstName = $$("span.hide-for-mobile").prop("innerText");
      const team = $$("a.grey.semi-bold.uppercase.ArchiveLink").prop(
        "innerText"
      );
      const point = $$("td.dark.bold").prop("innerText");
      yearData.data.push({
        id: uuidv4(),
        pos: index + 1,
        name: `${lastName} ${firstName}`,
        team,
        point,
      });
    });
    console.log(year);
    data.push(yearData);
  }
  console.log('-------> Get Drivers Data successfully!');
  return data;
}

module.exports = {
  getDriversData,
};
