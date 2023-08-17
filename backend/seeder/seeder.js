import { locationSeeder } from '@root/seeder/locationSeeder';
import { nationSeeder } from '@root/seeder/nationSeeder';
import { locationPhotoSeeder } from '@root/seeder/locationPhotoSeeder';
import { collectionSeeder } from '@root/seeder/collectionSeeder';

const seeder = async () => {
  await collectionSeeder()
  await nationSeeder()
  await locationSeeder()
  await locationPhotoSeeder()
}

seeder().then();
