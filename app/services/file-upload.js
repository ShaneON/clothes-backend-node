const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const credentials = require('../../config/credentials')

aws.config.update({
  secretAccessKey: credentials.AWS_SECRET_ACCESS,
  accessKeyId: credentials.AWS_ACCESS_KEY,
  region: 'eu-west-1'
});

const s3 = new aws.S3();

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true)
  } else {
      cb(new Error('Invalid Mime Type, only JPEG and PNG'), false);
  }
}

const upload = multer({
  fileFilter,
  storage: multerS3({
    s3,
    bucket: 'clothes-images',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: 'TESTING_META_DATA!'});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
})

module.exports = upload;
