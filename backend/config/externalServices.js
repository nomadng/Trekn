const convict = require('convict')

const externalServicesConfig = convict({
  rarityRatioConfig: {
    doc: 'Ratio of rarity',
    default: [50, 25, 15, 8, 2],
    nullable: false,
    env: 'RARITY_RATIO',
  },
})

externalServicesConfig.validate({ allowed: 'strict' })

export default externalServicesConfig
