import convict from 'convict'

const awsServicesConfig = convict({
  s3: {
    region: {
      doc: 'S3 AWS bucket region',
      format: String,
      default: '',
      nullable: true,
      env: 'S3_AWS_REGION',
    },
    accessKeyId: {
      doc: 'S3 AWS access key id',
      format: String,
      default: '',
      nullable: true,
      env: 'S3_AWS_ACCESS_KEY_ID',
    },
    secretAccessKey: {
      doc: 'S3 AWS secret access key',
      format: String,
      default: '',
      nullable: true,
      env: 'S3_AWS_SECRET_ACCESS_KEY',
    },
    bucketName: {
      doc: 'S3 AWS bucket name',
      format: String,
      default: '',
      nullable: true,
      env: 'S3_AWS_BUCKET_NAME',
    },
  },
})

awsServicesConfig.validate({ allowed: 'strict' })

export default awsServicesConfig
