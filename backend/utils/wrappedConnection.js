import { AnchorProvider } from '@project-serum/anchor'
import NodeWallet from '@project-serum/anchor/dist/cjs/nodewallet'
import { Connection, Keypair } from '@solana/web3.js'
import axios from 'axios'

export class WrappedConnection extends Connection {
  constructor(payer, connectionString, rpcUrl) {
    super(connectionString, 'confirmed')
    this.rpcUrl = rpcUrl || connectionString
    this.provider = new AnchorProvider(new Connection(connectionString), new NodeWallet(payer), {
      commitment: super.commitment,
      skipPreflight: true,
    })
    this.payer = payer
  }

  async getAsset(assetId) {
    try {
      const response = await axios.post(this.rpcUrl, {
        jsonrpc: '2.0',
        method: 'get_asset',
        id: 'compression-example',
        params: [assetId],
      })
      return response.data.result
    } catch (error) {
      console.error(error)
    }
  }

  async getAssetProof(assetId) {
    try {
      const response = await axios.post(this.rpcUrl, {
        jsonrpc: '2.0',
        method: 'get_asset_proof',
        id: 'compression-example',
        params: [assetId],
      })
      return response.data.result
    } catch (error) {
      console.error(error)
    }
  }

  async getAssetsByOwner(assetId, sortBy, limit, page, before, after) {
    try {
      const response = await axios.post(this.rpcUrl, {
        jsonrpc: '2.0',
        method: 'get_assets_by_owner',
        id: 'compression-example',
        params: [assetId, sortBy, limit, page, before, after],
      })
      return response.data.result
    } catch (error) {
      console.error(error)
    }
  }
}
