const AWS = require('aws-sdk');
const fs = require('fs');

AWS.config.region = 'us-east-1';

const s3 = new AWS.S3();

const envFileBucket = 'tekkenhub.envs';
const envFilename = '.env';
const envFilePathOnS3 = [envFileBucket, envFilename].join('/');

console.log(`Downloading env file from ${envFilePathOnS3}`);

s3.getObject({
  Bucket: envFileBucket,
  Key: envFilename,
}, (err, data) => {
  if (err) {
    console.log('Failed to download env file on S3.');
    console.log(`Make sure the env file is available as ${envFilePathOnS3}`);
    return;
  }

  fs.writeFileSync(envFilename, data.Body);
  console.log(`Saved env file to ${envFilename}`);
});
