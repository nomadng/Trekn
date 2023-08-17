import Location from '@root/models/Location'
import { getAllNations } from '@root/seeder/nationSeeder'
// eslint-disable-next-line import/named
import { getAllCollections } from '@root/seeder/collectionSeeder';

export const locationSeeder = async () => {
  const collections = await getAllCollections();
  const nations = await getAllNations();
  const locations = [
    {
      collectionId: collections[0]._id.toString(),
      collectionName: collections[0].name,
      nationId: nations[0]._id.toString(),
      name: 'Hoan Kiem Lake',
      address: 'Ha Noi, Viet Nam',
      longitude: 105.85260073109312,
      latitude: 21.028995045040713,
      radius: 2000,
      description: '',
      shortDescription: '',
      nftMintedCount: 50,
      isDeleted: false,
    },
    {
      collectionId: collections[0]._id.toString(),
      collectionName: collections[0].name,
      nationId: nations[0]._id.toString(),
      name: 'Old Quarter',
      address: 'Ha Noi, Viet Nam',
      longitude: 105.85066898321513,
      latitude: 21.034239231502863,
      radius: 2000,
      description: '',
      shortDescription: '',
      nftMintedCount: 50,
      isDeleted: false,
    },
    {
      collectionId: collections[0]._id.toString(),
      collectionName: collections[0].name,
      nationId: nations[0]._id.toString(),
      name: 'MAC plaza',
      address: 'Ha Noi, Viet Nam',
      longitude: 105.79159330040682,
      latitude: 20.983669957972037,
      radius: 2000,
      description: '',
      shortDescription: '',
      nftMintedCount: 50,
      isDeleted: false,
    },
    {
      collectionId: collections[0]._id.toString(),
      collectionName: collections[0].name,
      nationId: nations[1]._id.toString(),
      name: 'Tokyo Sky Tree',
      address: 'Tokyo, Japan',
      longitude: 139.81074331240245,
      latitude: 35.71014978864685,
      radius: 2000,
      description: '',
      shortDescription: '',
      nftMintedCount: 30,
      isDeleted: false,
    },
    {
      collectionId: collections[0]._id.toString(),
      collectionName: collections[0].name,
      nationId: nations[0]._id.toString(),
      name: 'Ho Tay Lake',
      address: 'Ha Noi, Viet Nam',
      longitude: 105.817571,
      latitude: 21.054727,
      radius: 2000,
      description: '',
      shortDescription: '',
      nftMintedCount: 40,
      isDeleted: false,
    },
    {
      collectionId: collections[0]._id.toString(),
      collectionName: collections[0].name,
      nationId: nations[0]._id.toString(),
      name: 'Sam Son Beach',
      address: 'Thanh Hoa, Ha Noi',
      longitude: 105.90795198485591,
      latitude: 19.74604365520222,
      radius: 2000,
      description: '',
      shortDescription: '',
      nftMintedCount: 40,
      isDeleted: false,
    }
  ];
  await Location.insertMany(locations);
}

export const getAllLocations = async () => Location.find().lean()
