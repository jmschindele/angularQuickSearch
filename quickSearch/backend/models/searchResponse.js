const mongoose = require("mongoose");

const searchResponseSchema = mongoose.Schema({
  pk_id: Number,
  e_type: String,
  org: String,
  sport_id: Number,
  s_text: String,
  g_year: Number,
  city: String,
  state: String,
  ph: {
    M: { type: String, required: false },
    H: { type: String, required: false },
    C: { type: String, required: false },
    W: { type: String, required: false }
  },
  email: String,
  email_2: String,
  twit: String,
  u_id: String,
  ncaa_e_num: String
});

const SearchResponse = mongoose.model("SearchResponse", searchResponseSchema);

module.exports = SearchResponse;