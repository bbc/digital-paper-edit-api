exports.seed = knex => knex('Users').del()
  .then(() => knex('Users').insert([
    {
      email: 'nigel@email.com',
      name: 'Nigel One',
    },
    {
      email: 'nakaz@email.com',
      name: 'Nakaz Two',
    },
    {
      email: 'jaywon@email.com',
      name: 'Jaywon Three',
    },
  ]));
