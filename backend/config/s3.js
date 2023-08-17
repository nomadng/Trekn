import aws from 'aws-sdk'
import awsServicesConfig from './awsConfig'

const s3 = new aws.S3({
  region: awsServicesConfig.get('s3.region'),
  accessKeyId: awsServicesConfig.get('s3.accessKeyId'),
  secretAccessKey: awsServicesConfig.get('s3.secretAccessKey'),
  signatureVersion: 'v1',
})

export default s3
