const mongoose    = require('mongoose');
const schemas     = require('../schemas');
const faker       = require('faker');
const md5         = require('md5');
const uuid        = require('uuid');

mongoose.connect('mongodb://localhost/1base');

Counter = mongoose.model('Counter', schemas.mongoose.Counter);
User = mongoose.model('User', schemas.mongoose.User);
Player = mongoose.model('Player', schemas.mongoose.Player);
Character = mongoose.model('Character', schemas.mongoose.Character);
Game = mongoose.model('Game', schemas.mongoose.Game);
Organization = mongoose.model('Organization', schemas.mongoose.Organization);
Item = mongoose.model('Item', schemas.mongoose.Item);

const MakeRandomNumber = (upperLimit, lowerLimit) => {
  Math.floor(Math.random() * upperLimit) + lowerLimit;
};
const MakeUser = (admin) => {
  let user = new User();
  user.username = faker.internet.email();
  user.firstname = faker.name.firstName();
  user.lastname = faker.name.lastName();
  user.admin = !!admin;
  let password = faker.internet.password();
  user.password = md5(password);
  user.save(console.log);
  return [user, password];
};

const MakeAdmin = MakeUser.bind(Object.create(null), true);

const MakeOrganization = (owner, members) => {
  let org = new Organization();
  org.name = faker.company.companyName();
  org.owner = owner._id;
  org.members = members.map((member) => member._id);
  org.save(console.log);
  return org;
};

const MakeGame = (organization) => {
    let game = new Game();
    game.organization = organization._id;
    game.name = faker.hacker.phrase();
    game.save(console.log);
    return game;
};

const MakeItem = (game, cb) => {
    let item = new Item();
    item.game = game._id;
    let name = faker.commerce.product();
    item.name = name;
    item.externalId = faker.helpers.slugify(item.name) + '-' + uuid.v4();
    item.type = faker.commerce.productAdjective();
    let tags = [];
    for (var i = 0; i < 3; i += 1){
      tags.push(faker.commerce.productAdjective());
    }
    item.tags = tags;
    item.meta = {
      price: faker.commerce.price()
    }
    console.log('Making Item', item);
    item.save(cb);
    return item;
};

const MakeNItems = (n, game, cb) => {
  let items = []

  _cb = (err, doc) => {
      n -= 1;
      console.log('we have ', n)
      if (!err && doc) items.push((new Item(doc)));
      if (n <= 0) {
        return cb(null, items);
      }


  }
  for (var i = 0; i < n; i += 1) {
    MakeItem(game, _cb);
  }
  return items;
}

const MakeCharacter = (game, player, npc, items) => {
  let character = new Character();
  character.player = player._id;
  character.game = game._id;
  character.npc = !!npc;
  character.name = faker.name.findName();
  character.inventory = items.map((item) => item._id);
  character.save(console.log);
  return character;
};

const MakePlayer = (game, organization, cb) => {
  console.log('making player');
  let player = new Player();
  player.game = game._id;
  player.organization = organization._id;
  player.externalId = uuid.v4();
  MakeNItems(10, game, (err, characterItems) => {
    let character = MakeCharacter(game, player, false, characterItems);
    player.characters = [character._id];
    MakeNItems(10, game, (err, playerItems) => {
      player.inventory = playerItems.map((item) => item._id);
      player.save(console.log);
      cb(null, [player, playerItems, character, characterItems]);
    });

  });

};


setTimeout(function () {
  users = [];

  result = [admin1, password1] = MakeUser(true);
  users.push(result);
  result = [orgowner, password2] = MakeUser();
  users.push(result);
  result = [orgMember1, password3] = MakeUser();
  users.push(result);
  result = [orgMember2, password4] = MakeUser();
  users.push(result);
  result = [orgMember3, password5] = MakeUser();
  users.push(result);
  result = [orgMember4, password6] = MakeUser();
  users.push(result);

  orgMembers = [orgMember1, orgMember2, orgMember3, orgMember4];

  let organization = MakeOrganization(orgowner, orgMembers);
  let game = MakeGame(organization);
  for (var i = 0; i < 10; i += 1) {
    MakePlayer(game, organization, console.log);
  }
  setTimeout(function () {
    console.log(users);
  }, 5000);

}, 5000);
