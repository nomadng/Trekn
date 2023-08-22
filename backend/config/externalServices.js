import convict from 'convict'

const externalServicesConfig = convict({
  rarityRatioConfig: {
    doc: 'Ratio of rarity',
    default: [50, 25, 15, 8, 2],
    nullable: false,
    env: 'RARITY_RATIO',
  },
  heliusRpcUrl: {
    doc: 'Helius rpc url',
    format: String,
    default: null,
    nullable: false,
    env: 'HELIUS_RPC_URL',
  },
})

externalServicesConfig.validate({ allowed: 'strict' })

export default externalServicesConfig
