// eslint-disable-next-line import/named
import { getAllLocations } from '@root/seeder/locationSeeder'
import LocationPhoto from '@root/models/LocationPhoto'

export const locationPhotoSeeder = async () => {
  const photoLinks = [
    'https://www.lasinfoniadelreyhotel.com/img/gallery/guom-22.gif',
    'https://hanoioldquarter.info/wp-content/uploads/2018/02/stock-photo-155026169-741x486.jpg',
    'https://static.doanhnhan.vn/images/upload/tapchidnpl/12182021/img_20211209_024745.jpg',
    'https://cdn.cheapoguides.com/wp-content/uploads/sites/2/2020/02/GettyImages-478125515.jpg',
    'https://www.itourvn.com/images/easyblog_articles/914/Tay-Ho-district-in-Hanoi.jpg',
    'https://vietnamtrips.com/files/photos/article1147/sam-son-1.jpg',
  ]
  const locations = await getAllLocations()
  const locationPhotos = []
  for (let i = 0; i < locations.length; i++) {
    const rarity = Math.floor(Math.random() * (5 - 1 + 1) + 1)
    const locationPhoto = {
      locationId: locations[i]._id.toString(),
      photoLink: photoLinks[i],
      nftMetadataUri: 'https://arweave.net/IxG5hBebTx7uZV_YQog9b_3n7Nif7bREskQvK_Q93oc',
      rarity,
      author: '',
      isDeleted: false,
    }
    locationPhotos.push(locationPhoto)
  }
  await LocationPhoto.insertMany(locationPhotos)
}
