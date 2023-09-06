require("dotenv").config();
const stream = require("stream");
const AWS = require("aws-sdk");

class AWSS3Uploader {
  s3 = null;
  config = { accessKeyId, secretAcessKey, destinationBucketName, region };

  constructor(config) {
    AWS.config = new AWS.Config();
    AWS.config.update({
      region: config.region || "eu-west-2",
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
    });
    this.s3 = new AWS.S3();
    this.config = config;
  }

  //Creates a custom name for the file to use in S3
  createDestinationFilePath(filename, mimetype, encoding) {
    return `${filename}-${Date.now()}`;
  }

  //Creates a stream that will point at the s3 bucket for uploading
  createUploadStream(key) {
    const pass = new stream.PassThrough();

    return {
      writeStream: pass,
      promise: this.s3
        .upload({
          Bucket: this.config.destinationBucketName,
          key: key,
          Body: pass,
        })
        .promise(),
    };
  }

  //Will upload a single file passed into it
  async singleFileUploadResovler(parent, { file }) {
    const { stream, filename, mimetype, encoding } = await file;

    const filePath = this.createDestinationFilePath(
      filename,
      mimetype,
      encoding
    );

    //Creates a uploadStream that will point at AWS Bucket
    const uploadStream = this.createUploadStream(filePath);

    //Pipes all the data in our uploadStream
    stream.pipe(uploadStream.writeStream);

    //Wait for the stream to upload to the aws bucket
    const result = await uploadStream.promise;

    //Get the link back from the stream
    const link = result.location;

    return { filename, mimetype, encoding, url: result.location };
  }
}

module.exports = AWSS3Uploader;

// { accessKeyId, secretAcessKey, destinationBucketName, region }
