// eslint-disable-next-line import/named
import { getAllLocations } from '@root/seeder/locationSeeder'
import LocationPhoto from '@root/models/LocationPhoto'

export const locationPhotoSeeder = async () => {
  const locationPhotos = [
    {
      _id: '64df46f60642a2cf9e820a20',
      locationId: '64df406b4e7c0cc745c74f7c',
      locationNumber: 1,
      photoLink:
        'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/18/c5/b7/6b/the-front-of-doan-mon.jpg?w=1200&h=-1&s=1',
      nftMetadataUri: 'https://arweave.net/OMTxblQuTWKmcBZA52smiSC-zSl_2askD9VJWLXX2q8',
      rarity: 1,
      author: 'Trekn',
      isDeleted: false,
    },g
    {
      _id: '64df46f60642a2cf9e820a21',
      locationId: '64df406b4e7c0cc745c74f7c',
      locationNumber: 2,
      photoLink: 'https://rubicontours.com/wp-content/uploads/2020/05/imperial-citadel.jpg.jpg',
      nftMetadataUri: 'https://arweave.net/aBGABEoKbXFaeJWcmKFxXLjWNSuYLrF-zJ3tSttxZ5g',
      rarity: 2,
      author: 'Trekn',
      isDeleted: false,
    },
    {
      _id: '64df46f60642a2cf9e820a22',
      locationId: '64df406b4e7c0cc745c74f7c',
      locationNumber: 3,
      photoLink: 'https://www.hatravel.com.vn/images/news/img_in_news/Imperial-Citadel-of-Thang%20Long-04.png',
      nftMetadataUri: 'https://arweave.net/kDRgLIHeVP4kko_UXv4CSJGkniVtHwylc4o3FoOOWc8',
      rarity: 3,
      author: 'Trekn',
      isDeleted: false,
    },
    {
      _id: '64df46f60642a2cf9e820a23',
      locationId: '64df406b4e7c0cc745c74f7c',
      locationNumber: 4,
      photoLink:
        'https://c8.alamy.com/comp/MDJ04E/doan-mon-the-main-gate-to-the-palatial-complex-of-later-le-emperors-in-the-central-sector-of-the-imperial-citadel-of-thang-long-hanoi-vietnam-MDJ04E.jpg',
      nftMetadataUri: 'https://arweave.net/iLZJiDLHscXJ1abI2p2JR-1DeqDZVzkNxdxx0IKKUf8',
      rarity: 4,
      author: 'Trekn',
      isDeleted: false,
    },
    {
      _id: '64df46f60642a2cf9e820a24',
      locationId: '64df406b4e7c0cc745c74f7c',
      locationNumber: 5,
      photoLink:
        'https://res.cloudinary.com/fleetnation/image/private/c_fit,w_1120/g_south,l_text:style_gothic2:%C2%A9%20Dong%20Bui,o_20,y_10/g_center,l_watermark4,o_25,y_50/v1496043837/u4gfnmyzkzitfoqv9fao.jpg',
      nftMetadataUri: 'https://arweave.net/kDRgLIHeVP4kko_UXv4CSJGkniVtHwylc4o3FoOOWc8',
      rarity: 5,
      author: 'Trekn',
      isDeleted: false,
    },
    {
      _id: '64df46f60642a2cf9e820a25',
      locationId: '64df3f8652402d78732a7163',
      locationNumber: 6,
      photoLink: 'https://static.vinwonders.com/2023/02/ben-thanh-market-thumb.jpg',
      nftMetadataUri: 'https://arweave.net/iY3vy2Y1c5fQ4_iPr45REC31N_pI-OEuSk28VFVhT_M',
      rarity: 1,
      author: 'Trekn',
      isDeleted: false,
    },
    {
      _id: '64df46f60642a2cf9e820a26',
      locationId: '64df3f8652402d78732a7163',
      locationNumber: 7,
      photoLink: 'https://d13jio720g7qcs.cloudfront.net/images/destinations/origin/5cac53f628523.png',
      nftMetadataUri: 'https://arweave.net/PMssaWN9dkyAokvP5gPID6eOEEs3AgMIJOJ8HMI0Bko',
      rarity: 2,
      author: 'Trekn',
      isDeleted: false,
    },
    {
      _id: '64df46f60642a2cf9e820a27',
      locationId: '64df3f8652402d78732a7163',
      locationNumber: 8,
      photoLink: 'https://saigononmotorbike.com/assets/media/ben-thanh-market/ben-thanh-market-today.jpg',
      nftMetadataUri: 'https://arweave.net/m2wy-7j-q0w4oeWUl4Ak9p_qfr4LbS_gsXs1RDWYVvs',
      rarity: 3,
      author: 'Trekn',
      isDeleted: false,
    },
    {
      _id: '64df46f60642a2cf9e820a28',
      locationId: '64df3f8652402d78732a7163',
      locationNumber: 9,
      photoLink: 'https://tranhgao.com/english/images/product/product/large_img/8a654_1f3af_Ben%20Thanh%20Market.jpg',
      nftMetadataUri: 'https://arweave.net/1tSRYIzcyL1BDsWCtsw-pjwcauzeJ0lDvzfjWw25-VY',
      rarity: 4,
      author: 'Trekn',
      isDeleted: false,
    },
    {
      _id: '64df46f60642a2cf9e820a29',
      locationId: '64df3f8652402d78732a7163',
      locationNumber: 10,
      photoLink:
        'https://en.vcci.com.vn/hm_content/uploads/247-news/Tranh-Ky-hoa-Saigon-ChoLon18-1-2281-6818-1579676932.jpg',
      nftMetadataUri: 'https://arweave.net/5E-zUj6xja9J1CO0V3qO8wFLNQB72Yn9EnYvV6Z1RDM',
      rarity: 5,
      author: 'Trekn',
      isDeleted: false,
    },
  ]

  await LocationPhoto.insertMany(locationPhotos)
}
