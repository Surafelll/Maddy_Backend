import { PrismaService } from '../prisma/prisma.service';  // Ensure correct path to PrismaService
import * as bcrypt from 'bcrypt';  // To hash the password

async function seed() {
  const prisma = new PrismaService();  // Instantiate PrismaService

  const username = 'testuser';
  const password = 'testpassword';  // Plain password to hash

  // Hash the password using bcrypt
  const hashedPassword = await bcrypt.hash(password, 10);

  // Check if the user already exists using PrismaService method
  const existingUser = await prisma.findUserByUsername(username);

  if (existingUser) {
    console.log('User already exists');
    await prisma.$disconnect(); // Disconnect the Prisma client when done
    return;
  }

  // Create the test user with the hashed password
  await prisma.createUser(username, hashedPassword);

  console.log('Test user created successfully');

  // Disconnect the Prisma client after seeding
  await prisma.$disconnect();
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // Ensure to disconnect Prisma even if an error occurs
    const prisma = new PrismaService();
    await prisma.$disconnect();
  });
