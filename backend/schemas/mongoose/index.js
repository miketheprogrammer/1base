const mongoose    = require('mongoose');
const Schema      = mongoose.Schema;

const ObjectId = mongoose.Schema.Types.ObjectId;
const Mixed = mongoose.Schema.Types.Mixed;

const Counter = exports.Counter = new Schema({
  name: {
    type: String,
    index: true,
    unique: true,
  },
  counter:  Number,
});

const User = exports.User = new Schema({
  username: {
    type: String,
    index: true,
    unique: true,
  },
  password:  String,
  created: Date
});

const Organization = exports.Organization = new Schema({
  name: {
    type: String,
    index: true,
    unique: true
  },
  owner: String,
  members: [String],
});

const Game = exports.Game = new Schema({
  organization: ObjectId,
  name: String,
});
Game.index({name: 1, organization: 1});

const Image = exports.Image = new Schema({
    url: String
});

const Item = exports.Item = new Schema({
  game: ObjectId,
  slug: String,
  type: String,
  tags: [String],
  meta: Mixed,
  images: [Image],
  folder: String,
});
Item.index({game: 1, slug: 1});

const Folder = exports.folder = new Schema({
  name: String
});

const Character = exports.Character = new Schema({
  name: String,
  inventory: String,
});

const Player = exports.Player = new Schema({
  game: ObjectId,
  organization: ObjectId,
  username: {
    type: String,
  },
  characters: [Character],
  inventory: [String],
});

Player.index({"username": 1, "game": 1});
Player.index({"game": 1, "characters.name": 1});
