import bcrypt from 'bcryptjs';

const users = [

  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('1234', 10),
    isAdmin: true,
  },
  {
    name: 'Rohan Lad',
    email: 'rohanlad@example.com',
    password: bcrypt.hashSync('1234', 10),
  },
  {
    name: 'Faiz Khan',
    email: 'faizbbx@example.com',
    password: bcrypt.hashSync('1234', 10),
  },
];

export default users 