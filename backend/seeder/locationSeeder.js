import Location from '@root/models/Location'
// eslint-disable-next-line import/named

export const locationSeeder = async () => {
  const locations = [
    {
      _id: '64df406b4e7c0cc745c74f7c',
      collectionId: '64df40111779e6cf3dbf3db3',
      collectionName: 'Vietnam Collection',
      nationId: '64df3f8652402d78732a7163',
      name: 'Central Sector of Imperial Citadel of Thăng Long',
      address: '19C Hoàng Diệu, Điện Biên, Ba Đình, Hà Nội 100000',
      longitude: 105.82107571309811,
      latitude: 21.03912071830396,
      radius: 500,
      location: {
        type: 'Point',
        coordinates: [105.82107571309811, 21.03912071830396],
      },
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
      longitude: 105.8470038,
      latitude: 21.0254799,
      radius: 500,
      location: {
        type: 'Point',
        coordinates: [105.8470038, 21.0254799],
      },
      nftMintedCount: 0,
      isDeleted: false,
    },
    {
      _id: '64e0947408855bdf2ba1403f',
      collectionId: '64df40111779e6cf3dbf3db3',
      collectionName: 'Vietnam Collection',
      nationId: '64df3f8652402d78732a7163',
      name: ' MAC Plaza',
      address: '10 Trần Phú, P. Mộ Lao, Hà Đông, Hà Nội 10999',
      longitude: 105.7923872,
      latitude: 20.98425098,
      radius: 500,
      location: {
        type: 'Point',
        coordinates: [105.7923872, 20.98425098],
      },
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
      longitude: 105.8531479,
      latitude: 21.0292304,
      radius: 500,
      location: {
        type: 'Point',
        coordinates: [105.8531479, 21.0292304],
      },
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
      longitude: 105.8617811,
      latitude: 21.04444341,
      radius: 500,
      location: {
        type: 'Point',
        coordinates: [105.8617811, 21.04444341],
      },
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
      longitude: 105.8386401,
      latitude: 21.04641311,
      radius: 500,
      location: {
        type: 'Point',
        coordinates: [105.8386401, 21.04641311],
      },
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
      longitude: 106.695345,
      latitude: 10.77721026,
      radius: 500,
      location: {
        type: 'Point',
        coordinates: [106.695345, 10.77721026],
      },
      nftMintedCount: 0,
      isDeleted: false,
    },
    {
      _id: '64df40ee774887051fbb8a2d',
      collectionId: '64df40111779e6cf3dbf3db3',
      collectionName: 'Vietnam Collection',
      nationId: '64df3f8652402d78732a7163',
      name: 'Mekong Delta',
      longitude: 106.695345,
      latitude: 10.77721026,
      radius: 500,
      location: {
        type: 'Point',
        coordinates: [106.695345, 10.77721026],
      },
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
      longitude: 106.7002346,
      latitude: 10.78018692,
      radius: 500,
      location: {
        type: 'Point',
        coordinates: [106.7002346, 10.78018692],
      },
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
      longitude: 106.6984392,
      latitude: 10.77269597,
      radius: 500,
      location: {
        type: 'Point',
        coordinates: [106.6984392, 10.77269597],
      },
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
      longitude: 106.70503,
      latitude: 10.77190033,
      radius: 500,
      location: {
        type: 'Point',
        coordinates: [106.70503, 10.77190033],
      },
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
      longitude: 108.1091933,
      latitude: 15.77417887,
      radius: 500,
      location: {
        type: 'Point',
        coordinates: [108.1091933, 15.77417887],
      },
      nftMintedCount: 0,
      isDeleted: false,
    },
  ]

  await Location.insertMany(locations)
}

export const getAllLocations = async () => Location.find().lean()
