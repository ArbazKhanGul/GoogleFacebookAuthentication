const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    googleId: String,
    date:Number
});

userSchema.methods.generateAuthToken = async function () {
    try {
      let token = jwt.sign({ _id: this._id }, "mynameisarbazkhanguliliveinsalhadabbottabad");
      this.date = Date.now();
      console.log(this.username);
      await this.save();
      console.log("Im token");
      return token;
    } catch (err) {
      console.log(err);
    }
  };


const User = mongoose.model('user', userSchema);

module.exports = User;
