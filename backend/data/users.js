import bcrypt from "bcryptjs/dist/bcrypt";

const users = 
[
    {
        name: 'Admin User',
        email: 'admin.user@cockmail.peanus',
        password: bcrypt.hashSync('12345', 10), // second argument determined how many hash cycles it goes through. 
        isAdmin: true
    },
    {
        name: 'testUser 1',
        email: 'test.user1@example.com',
        password: bcrypt.hashSync('12345', 10)
    },
    {
        name: 'testUser 2',
        email: 'test.user2@example.com',
        password: bcrypt.hashSync('12345', 10)
    },

]

export default users;