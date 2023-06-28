import express from 'express';
import User from '../models/UserModel.js';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils.js';

const userRoutes = express.Router();

userRoutes.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: 'Invalid email or password' });
  })
);

userRoutes.post(
  '/signup',
  expressAsyncHandler(async (req, res) => {
    const { name, email, pswd } = req.body;
    const AlreadyaUser = await User.findOne({ email: email });
    if (AlreadyaUser) {
      res.status(401).send({ message: 'User with this email already exists' });
      return;
    }
    const newUser = new User({
      name: name,
      email: email,
      password: bcrypt.hashSync(pswd),
    });
    const user = await newUser.save();
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user),
    });
    return;
  })
);

export default userRoutes;
