import Location from '@root/models/Location'
import { getAllNations } from '@root/seeder/nationSeeder'
// eslint-disable-next-line import/named
import { getAllCollections } from '@root/seeder/collectionSeeder'

export const locationSeeder = async () => {
  const locations = [
    {
      _id: '64df406b4e7c0cc745c74f7c',
      collectionId: '64df40111779e6cf3dbf3db3',
      collectionName: 'Vietnam Collection',
      nationId: '64df3f8652402d78732a7163',
      name: 'Central Sector of Imperial Citadel of Thăng Long',
      address: '19C Hoàng Diệu, Điện Biên, Ba Đình, Hà Nội 100000',
      longitude: 21.03419665,
      latitude: 105.84076,
      radius: 0,
      description:
        'The Thang Long Imperial Citadel was built in the 11th century by the Ly Viet Dynasty, marking the independence of the Dai Viet. It was constructed on the remains of a Chinese fortress dating from the 7th century, on drained land reclaimed from the Red River Delta in Hanoi. It was the centre of regional political power for almost 13 centuries without interruption. The Imperial Citadel buildings and the remains in the 18 Hoang Dieu Archaeological Site reflect a unique South-East Asian culture specific to the lower Red River Valley, at the crossroads between influences coming from China in the north and the ancient Kingdom of Champa in the south.',
      shortDescription:
        'The Imperial Citadel of Thăng Long is a complex of historic buildings associated with the history of Vietnam located in the centre of Hanoi, Vietnam. Its construction began in 1010 and was completed in early 1011 under the reign of Emperor Lý Thái Tổ of the Lý dynasty.',
      nftMintedCount: 0,
      isDeleted: false,
    },
    {
      _id: '64df407933b6e1615f3f75e5',
      collectionId: '64df40111779e6cf3dbf3db3',
      collectionName: 'Vietnam Collection',
      nationId: '64df3f8652402d78732a7163',
      name: 'Hoa Lo Prison',
      address: '1 P. Hoả Lò, Trần Hưng Đạo, Hoàn Kiếm, Hà Nội, Vietnam',
      longitude: 21.0254799,
      latitude: 105.8470038,
      radius: 0,
      nftMintedCount: 0,
      isDeleted: false,
    },
    {
      _id: '64df407f7d213270e18b365b',
      collectionId: '64df40111779e6cf3dbf3db3',
      collectionName: 'Vietnam Collection',
      nationId: '64df3f8652402d78732a7163',
      name: 'Hoan Kiem Lake',
      address: 'Hang Trong, Hoàn Kiếm, Hanoi',
      longitude: 21.0292304,
      latitude: 105.8531479,
      radius: 0,
      nftMintedCount: 0,
      isDeleted: false,
    },
    {
      _id: '64df40d85e9ec661b0030f33',
      collectionId: '64df40111779e6cf3dbf3db3',
      collectionName: 'Vietnam Collection',
      nationId: '64df3f8652402d78732a7163',
      name: 'Long Bien Bridge',
      address: '2VV6+P92, Cầu Long Biên, Ngọc Thụy, Hoàn Kiếm, Hà Nội, Vietnam',
      longitude: 21.04444341,
      latitude: 105.8617811,
      radius: 0,
      nftMintedCount: 0,
      isDeleted: false,
    },
    {
      _id: '64df40dfaa00031bde992ef5',
      collectionId: '64df40111779e6cf3dbf3db3',
      collectionName: 'Vietnam Collection',
      nationId: '64df3f8652402d78732a7163',
      name: 'Truc Bach Lake',
      address: 'Ba Đình, Hanoi, Vietnam',
      longitude: 21.04641311,
      latitude: 105.8386401,
      radius: 0,
      nftMintedCount: 0,
      isDeleted: false,
    },
    {
      _id: '64df40e7904ca93d2e274bcd',
      collectionId: '64df40111779e6cf3dbf3db3',
      collectionName: 'Vietnam Collection',
      nationId: '64df3f8652402d78732a7163',
      name: 'Independence Palace',
      address: 'Ben Thanh, District 1, Ho Chi Minh City, Vietnam',
      longitude: 10.77721026,
      latitude: 106.695345,
      radius: 0,
      nftMintedCount: 0,
      isDeleted: false,
    },
    {
      _id: '64df40ee774887051fbb8a2d',
      collectionId: '64df40111779e6cf3dbf3db3',
      collectionName: 'Vietnam Collection',
      nationId: '64df3f8652402d78732a7163',
      name: 'Mekong Delta',
      radius: 0,
      nftMintedCount: 0,
      isDeleted: false,
    },
    {
      _id: '64df40f4c9f00f82aac6d743',
      collectionId: '64df40111779e6cf3dbf3db3',
      collectionName: 'Vietnam Collection',
      nationId: '64df3f8652402d78732a7163',
      name: 'Sai Gon Central Post Office',
      address: '02 Công xã Paris, Bến Nghé, Quận 1, Thành phố Hồ Chí Minh 70000, Vietnam',
      longitude: 10.78018692,
      latitude: 106.7002346,
      radius: 0,
      nftMintedCount: 0,
      isDeleted: false,
    },
    {
      _id: '64df40fa5520f2014d894bfd',
      collectionId: '64df40111779e6cf3dbf3db3',
      collectionName: 'Vietnam Collection',
      nationId: '64df3f8652402d78732a7163',
      name: 'Ben Thanh Market',
      address: 'Ben Thanh, District 1, Ho Chi Minh City, Vietnam',
      longitude: 10.77269597,
      latitude: 106.6984392,
      radius: 0,
      shortDescription:
        'Ben Thanh Market is one of the busiest local markets in Ho Chi Minh City that you should visit to enjoy famous Vietnamese foods and shop for lovely souvenirs. You will be definitely amazed by plenty of colorful kiosks where they sell food, gifts, clothes, and thousands of other items here.',
      nftMintedCount: 0,
      isDeleted: false,
    },
    {
      _id: '64df41010a4944f747f66721',
      collectionId: '64df40111779e6cf3dbf3db3',
      collectionName: 'Vietnam Collection',
      nationId: '64df3f8652402d78732a7163',
      name: 'Bitexco Financial Tower',
      address: '2 Đ. Hải Triều, Bến Nghé, Quận 1, Thành phố Hồ Chí Minh 700000, Vietnam',
      longitude: 10.77190033,
      latitude: 106.70503,
      radius: 0,
      nftMintedCount: 0,
      isDeleted: false,
    },
    {
      _id: '64df41cc400a07a11a676ce2',
      collectionId: '64df40111779e6cf3dbf3db3',
      collectionName: 'Vietnam Collection',
      nationId: '64df3f8652402d78732a7163',
      name: 'My Son Sanctuary',
      address: 'Duy Phú, Duy Xuyên District, Quảng Nam, Vietnam',
      longitude: 15.77417887,
      latitude: 108.1091933,
      radius: 0,
      nftMintedCount: 0,
      isDeleted: false,
    },
  ]

  await Location.insertMany(locations)
}

export const getAllLocations = async () => Location.find().lean()
