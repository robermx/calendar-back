const bcrypt = require('bcryptjs');
const { generateJwt } = require('../helpers/jwt');
const User = require('../models/User');

const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: 'User already exists with that email',
      });
    }

    user = new User(req.body);

    // encrypt password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    const token = await generateJwt(user.id, user.name);

    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Talk with administrator',
    });
  }
};

const LoginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: 'Email user does not exists',
      });
    }

    // Password confirm
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      res.status(400).json({
        ok: false,
        msg: 'Incorrect password',
      });
    }

    // JWT generator0
    const token = await generateJwt(user.id, user.name);

    res.json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Talk with administrator',
    });
  }
};

const renewToken = async (req, res) => {
  const { uid, name } = req;

  const token = await generateJwt(uid, name);

  res.json({
    ok: true,
    uid,
    name,
    token,
  });
};

module.exports = {
  createUser,
  LoginUser,
  renewToken,
};
