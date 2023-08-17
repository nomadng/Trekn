import convict from 'convict'

const serverConfig = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV',
  },
  port: {
    doc: 'The port to bind.',
    format: Number,
    default: 5000,
    env: 'PORT',
    arg: 'port',
  },
  host: {
    doc: 'The port to serve',
    format: String,
    default: '127.0.0.1',
    env: 'HOST',
  },
  mongodb: {
    url: {
      doc: 'URL for mongodb connection',
      format: String,
      nullable: true,
      default: null,
      env: 'MONGODB_URL',
    },
  },
  privateKey: {
    doc: 'dApp service private key',
    format: String,
    default: null,
    nullable: true,
    env: 'PRIVATE_KEY',
  },
})

serverConfig.validate({ allowed: 'strict' })

export default serverConfig
