const puppeteer = require("puppeteer-core");

const cdpPort = 40010 + Math.round(Math.random() * 25000);
function browserLaunchHandler(browser = {}, args) {
  if (!["chrome"].includes(browser.family)) {
    return console.log(
      ` [cypress-log-to-output] Warning: An unsupported browser family was used, output will not be logged to console: ${browser.family}`
    );
  }

  if (browser.family === "chrome") {
    args.push(`--remote-debugging-port=${cdpPort}`);
  }
  console.log(browser);
  setTimeout(tryCdpConnection, 500);
  return args;
}

async function tryCdpConnection() {
  console.info(`Connection Ok to port ${cdpPort}`);

  try {
    await connectPuppeteer();
    // console.info('browser session initialized', browser)
  } catch (error) {
    console.info("CDP debugger port not available yet. Reconnecting...");
    setTimeout(tryCdpConnection, 500);
  }
}

async function getCoverageAfterEach() {
  const connectedBrowser = Cypress.config("cdp");
  const pages = await connectedBrowser.pages();
  const page = pages[0].frames()[1];
  console.log(page.url());

  const [jsCoverage, cssCoverage] = await Promise.all([
    page.coverage.stopJSCoverage(),
    page.coverage.stopCSSCoverage()
  ]);

  console.log(jsCoverage, cssCoverage);
  // pti.write([...jsCoverage, ...cssCoverage])
  return null;
}

async function enableBeforeEach() {
  const connectedBrowser = Cypress.config("cdp");
  const pages = await connectedBrowser.pages();
  const page = pages[0].frames()[1];

  return await Promise.all([
    page.coverage.startJSCoverage(),
    page.coverage.startCSSCoverage()
  ]);
}

async function connectPuppeteer() {
  const browserURL = "http://127.0.0.1:" + cdpPort;
  return puppeteer
    .connect({ browserURL, defaultViewport: null })
    .then(conn => Cypress.config("cdp", conn));
}

function install(on) {
  on("before:browser:launch", browserLaunchHandler);

  on("task", {
    afterEach: getCoverageAfterEach,
    beforeEach: enableBeforeEach
  });
}

module.exports = {
  install
};
