const uuid        = require('uuid');
const mongoose    = require('mongoose');
const Schema      = mongoose.Schema;

/* EMBEDDED TYPES */
const ObjectId = String;
const Mixed = mongoose.Schema.Types.Mixed;
const Tag = String;
const Image = exports.Image = new Schema({
    url: String
});


/* FULL SCHEMAS */
const Counter = exports.Counter = new Schema({
  _id: {type: String, default: uuid.v1},
  name: {
    type: String,
    index: true,
    unique: true,
    required: true,
  },
  counter:  {
    type: Number,
    default: 0
  }
});

const Folder = exports.folder = new Schema({
  _id: {type: String, default: uuid.v1},
  name: {
    type: String,
    required: true,
  },
});

const User = exports.User = new Schema({
  _id: {type: String, default: uuid.v1},
  username: {
    type: String,
    index: true,
    unique: true,
    required: true,
  },
  firstname: String,
  lastname: String,
  admin: {
    type: Boolean,
    default: false,
  },
  password:  {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});
User.index({username: "text", firstname: "text", lastname: "text"}, {name: "User Full Text Search Index"});

const Organization = exports.Organization = new Schema({
  _id: {type: String, default: uuid.v1},
  name: {
    type: String,
    index: true,
    unique: true,
    required: true,
  },
  owner: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
  members: {
    type: [ObjectId],
    ref: "User",
  },
});

const Game = exports.Game = new Schema({
  _id: {type: String, default: uuid.v1},
  organization: {
    type: ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: Image,
});
Game.index({organization: 1, name: 1}, {unique: true});


const Item = exports.Item = new Schema({
  _id: {type: String, default: uuid.v1},
  game: {
    type: ObjectId,
    required: true,
  },
  externalId: {
    type: String,
    index: true,
    sparse: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    // maybe add Enum here?
    required: true,
  },
  tags: [Tag],
  meta: Mixed,
  images: [Image],
  folder: {
    type: ObjectId,
    ref: "Folder"
  },
});

Item.index({"name": "text", tags: "text", meta: "text", externalId: "text"}, {name: "Items Full Text Search Index"});
Item.index({game: 1, slug: 1});


const Character = exports.Character = new Schema({
  _id: {type: String, default: uuid.v1},
  player: {
    type: ObjectId,
    index: true,
    sparse: true,
    ref: "Player",
    required: true,
  },
  game: {
    type: ObjectId,
    ref: "Game",
    required: true,
  },
  npc: {
    type: Boolean,
    default: false,
  },
  name: String,
  inventory: {
    type: [String],
    ref: "Item",
  },
});

Character.index({"name": "text"}, {name: "Character Full Text Search Index"});
Character.index({"game": 1, "player": 1, "name":1},
                {unique: true, sparse: true});
Character.index({"game": 1, "name":1, "npc": 1},
                {unique: true, sparse: true});


const Player = exports.Player = new Schema({
  _id: {type: String, default: uuid.v1},
  game: ObjectId,
  organization: ObjectId,
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  userId: {
    type: ObjectId,
    required: true,
  },
  characters: {
    type: [ObjectId],
    ref: "Character"
  },
  inventory: [String],
});
Player.index({"name": "text"}, {name: "Player Full Text Search Index"});
Player.index({"username": 1, "game": 1});
Player.index({"game": 1, "characters.name": 1});
