require("dotenv").config();
const stream = require("stream");
const AWS = require("aws-sdk");

class AWSS3Uploader {
  s3 = null;
  config = {
    accessKeyId: "",
    secretAcessKey: "",
    destinationBucketName: "",
    region: "",
  };

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
    console.log("Destination File name");
    return `${filename}-${Date.now()}`;
  }

  //Creates a stream that will point at the s3 bucket for uploading
  createUploadStream(key) {
    console.log("Upload stream");
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
    console.log("Got files and deconstructed");
    const { stream, filename, mimetype, encoding } = await file;
    console.log("Created a file name");
    const filePath = this.createDestinationFilePath(
      filename,
      mimetype,
      encoding
    );

    //Creates a uploadStream that will point at AWS Bucket
    console.log("created an uploadstream");
    const uploadStream = this.createUploadStream(filePath);

    //Pipes all the data in our uploadStream
    console.log("Piped in the stream into the uploadStream");
    stream.pipe(uploadStream.writeStream);

    //Wait for the stream to upload to the aws bucket
    console.log("Upload the stream");
    const result = await uploadStream.promise;

    //Get the link back from the stream
    const link = result.location;
    console.log("did it get here ");
    return { filename, mimetype, encoding, url: link };
  }
}

module.exports = AWSS3Uploader;

// { accessKeyId, secretAcessKey, destinationBucketName, region }
