import express from 'express';
const router = express.Router();
import bcrypt from 'bcrypt';
import UserModel from '../models/UserModel';

router.post('/api/signup', (req, res, next) => {
  const {username, password} = req.body;

  if (!username || !password) {
    return res.status(422).json({error: 'Invalid username or password'});
  }

  UserModel.findOne({username}).exec()
    .then(existingUser => {
      if (existingUser) {
        return res.status(422).json({error: 'username already existed'});
      }

      bcrypt.hash(password, 10, (err, hashedPassword) => {
        /* here salt refers to the random string that the function hashes with */
        if (err) {
          return next(err);
        }

        const user = new UserModel({username, password: hashedPassword});

        user.save()
          .then(savedUser => res.json(savedUser));
      });
    })
  .catch(err => res.json(err));
});

export default router;
