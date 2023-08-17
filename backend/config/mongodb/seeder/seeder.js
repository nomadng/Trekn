import { locationSeeder } from '@root/config/mongodb/seeder/locationSeeder';
import { nationSeeder } from '@root/config/mongodb/seeder/nationSeeder';
import { locationPhotoSeeder } from '@root/config/mongodb/seeder/locationPhotoSeeder';

const seeder = async () => {
  await nationSeeder();
  await locationSeeder();
  await locationPhotoSeeder();
}

seeder().then();
