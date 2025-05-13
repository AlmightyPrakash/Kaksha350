const AWS = require('@aws-sdk/client-s3');
const { Upload } = require('@aws-sdk/lib-storage');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Local storage temporarily for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'temp/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files allowed'), false);
    }
  }
});

const s3Client = new AWS.S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

const uploadFileToS3 = async (filePath, filename) => {
  const fileStream = fs.createReadStream(filePath);

  const uploadParams = {
    Bucket: 'examverse-videos',
    Key: `materials/${filename}`,
    Body: fileStream,
    ContentType: 'application/pdf',
  };

  const parallelUpload = new Upload({
    client: s3Client,
    params: uploadParams,
  });

  await parallelUpload.done();
  return `https://${uploadParams.Bucket}.s3.amazonaws.com/${uploadParams.Key}`;
};

module.exports = { upload, uploadFileToS3 };
