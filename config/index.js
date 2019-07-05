const dotenv = require('dotenv');
const fs = require('fs');

const result = dotenv.config();

if (result.error) {
  throw result.error;
}

try {
  const envConfig = dotenv.parse(fs.readFileSync('.env.override'));
  envConfig.forEach((k) => {
    process.env[k] = envConfig[k];
  });
} catch (err) {
  console.log('No override file found');
}
