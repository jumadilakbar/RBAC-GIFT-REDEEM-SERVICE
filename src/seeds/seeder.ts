import { DataSource } from 'typeorm';
import { User } from '../user/user.entity/user.entity';
import * as bcrypt from 'bcryptjs';
import 'dotenv/config';
async function seed() {
  const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [User],
  });
  console.log('Database config:', {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
  await dataSource.initialize();
  console.log('Database connected!');

  const userRepository = dataSource.getRepository(User);

  // Hash passwords
  const adminPassword = await bcrypt.hash('admin123', 10);
  const userPassword = await bcrypt.hash('user123', 10);

  // Create admin user
  const admin = userRepository.create({
    email: 'admin@example.com',
    username: 'admin',
    password: adminPassword,
    role: 'admin',
  });

  // Create regular user
  const user = userRepository.create({
    email: 'user@example.com',
    username: 'user',
    password: userPassword,
    role: 'user',
  });

  // Save users
  await userRepository.save([admin, user]);

  console.log('Admin and User seeded successfully!');
  await dataSource.destroy();
}

seed().catch((error) => {
  console.error('Error seeding data:', error);
});
