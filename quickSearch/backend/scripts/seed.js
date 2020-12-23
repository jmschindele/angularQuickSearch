const mongoose = require("mongoose");
const db = require("../models");
console.log(db);

// This file empties the Projects collection and inserts the projects below

mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://admin:rIugMeimT5pmj65B@cluster0.tqsvv.mongodb.net/autocomplete_poc?retryWrites=true&w=majority");

const searchResponseSeed = [
  {
    pk_id: 1236,
    e_type: "R",
    org: "CLEM",
    sport_id: 7777,
    s_text: "Andy Samberg",
    g_year: 1985,
    city: "Brooklyn",
    state: "NY",
    ph: {
      M: "5554445557",
      H: "2022220002",
      C: "8889998991",
      W: "3033330002"
    },
    email: "Brooklyn@911.com",
    email_2: "nypd@comedy.com",
    twit: "@dieHardRoolz",
    u_id: "university1236",
    ncaa_e_num: "enumber1236"
  },
  {
    pk_id: 1234,
    e_type: "R",
    org: "CLEM",
    sport_id: 7777,
    s_text: "Lester Middleton Tester L.T",
    g_year: 1980,
    city: "Fredericksburg",
    state: "VA",
    ph: {
      M: "5554445555",
      H: "2022220000",
      C: "8889998989",
      W: "3033330000"
    },
    email: "lester@tester.com",
    email_2: "leseter@email2",
    twit: "@lester4Real",
    u_id: "university1234",
    ncaa_e_num: "enumber1234"
  },
  {
    pk_id: 1235,
    e_type: "R",
    org: "CLEM",
    sport_id: 7777,
    s_text: "Mark Jones",
    g_year: 1991,
    city: "Richmond",
    state: "VA",
    ph: { M: "5554445556", H: "2022220001", C: "8889998990", W: "3033330001" },
    email: "mark@tester.com",
    email_2: "mark@email2",
    twit: "@markJonesWho",
    u_id: "university1235",
    ncaa_e_num: "enumber125"
  }
];

db.SearchResponse.remove({})
  .then(() => db.SearchResponse.collection.insertMany(searchResponseSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
