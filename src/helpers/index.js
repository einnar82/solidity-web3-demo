import { NFTStorage } from 'nft.storage'
import { nftStorageKey } from '../config'

const storageClient = new NFTStorage({ token: nftStorageKey })

export {
    storageClient
}