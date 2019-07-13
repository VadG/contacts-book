const express = require('express');
const router = express.Router();
const User = require('../modules/User');
const check = require('express-validator/check').check;
const validationResult = require('express-validator/check').validationResult;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const validationParams = [
  check('name', 'name is  empty')
    .not()
    .isEmpty(),
  check('email', 'input valid email').isEmail(),
  check('password', 'input valid password').isLength({
    min: 6,
  }),
];

// @route     POST api/users
// @desc      Regiter a user
// @access    Public
router.post('/', validationParams, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  const { password, name, email } = req.body;
  try {
    let user = await User.findOne({ email }); //Есть ли пользователь
    if (user) {
      res.status(400).json({ msg: 'User exists' });
    }
    user = new User({
      //Создаем сущность пользователя
      name,
      email,
      password,
    });
    const salt = await bcrypt.getSalt(
      '$2a$10$llw0G6IyibUob8h5XRt9xuRczaGdCm/AiV6SSjf5v78XS824EGbdh'
    );
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    const jwtPayload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      jwtPayload,
      config.get('jwtSecret'),
      {
        expiresIn: 360000,
      },
      (err, token) => {
        if (err) throw err;
        res.json({token});
      }
    );
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
    console.log(error);
  }
});

module.exports = router;
