const express = require('express');
const router = express.Router();
const User = require('../modules/User');
const Contact = require('../modules/Contact');
const check = require('express-validator/check').check;
const validationResult = require('express-validator/check').validationResult;
const auth = require('../middleware/auth');

// @route     GET api/ 
// @desc      Get all users contacts
// @access    Private
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      data: -1,
    });
    res.json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// @route     POST api/contacts
// @desc      Add new contact
// @access    Private
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Name is required')
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, type } = req.body;
    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id,
      });

      const contact = await newContact.save();

      res.json(contact);
    } catch (err) {
      console.error(er.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route     PUT api/contacts/:id
// @desc      Update contact
// @access    Private
router.put('/:id', (req, res) => {
  res.send('Update contact');
});

// @route     DELETE api/contacts/:id
// @desc      Delete contact
// @access    Private
router.delete('/:id', (req, res) => {
  res.send('Delete contact');
});

module.exports = router;
