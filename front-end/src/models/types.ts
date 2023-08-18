export interface CardDetail {
    _id: string,
    collectionId: string,
    collectionName: string,
    nationId: string,
    name: string,
    address: string,
    longitude: number,
    latitude: number,
    radius: number,
    description: string,
    shortDescription: string,
    nftMintedCount: number,
    isDeleted: boolean,
    __v: number,
    createdAt: string,
    updatedAt: string,
    locationPhotos: Array<ILocationPhotos>,
}

interface ILocationPhotos {
    photoLink: string,
    rarity: number,
    author: string
}