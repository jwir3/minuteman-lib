import path from 'path';
import fs from 'fs';

export let fixtures = [];

class Fixture {
    constructor(jsonData) {
      this.json = jsonData;
      this.rawObject = JSON.parse(jsonData);
    }
};

before(() => {
  // Load all of our fixtures
  let fixturesDir = path.join(__dirname, 'fixtures');

  if (fs.existsSync(fixturesDir)) {
    let files = fs.readdirSync(fixturesDir);
    for (let fileIdx in files) {
      loadFixtureFile(path.join(fixturesDir, files[fileIdx]));
    }
  }
});

function loadFixtureFile(filePath) {
  let baseName = path.basename(filePath, path.extname(filePath));
  let stringContents = fs.readFileSync(filePath);
  fixtures[baseName] = new Fixture(stringContents);
}
