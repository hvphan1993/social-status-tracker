const { User } = require('../models');
// const 

const UserController = {
  // get all Users
  getAllUsers(req, res) {
    User.find({})
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400).json(err);
      });
  },

  // get one User by id
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .select('-__v')
      .then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({ message: "No user found with this id!" });
            return;
        }
        res.json(dbUserData);
    })
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // createUser
  createUser({ body }, res) {
    User.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch((err) => res.status(400).json(err));
  },

  // update User by id
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No User found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

  // delete User and connected thoughts
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
         .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No User found with this id!' });
                return;
            }
            // remove user from any friend list
            User.updateMany(
              { __id: {$in: dbUserData.friends } },
              { $pull: { friends: params.id } }
            )
            .then(() => {
              // remove user comments
              Thought.deleteMany({ username: dbUserData.username })
              .then(() => {
                res.json({ message: "Successfully deleted user!" });
              })
              .catch(err => res.status(400).json(err));
            })
            .catch(err => res.status(400).json(err));
            })
        .catch(err => res.json(err));
  },

  // add friend to User
  addFriend({ params }, res) {
    User.findOneAndUpdate({ _id: params.id }, { $addToSet: { friends: params.friendsId } }, { new: true })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No User found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

   // delete friend from User
   deleteFriend({ params }, res) {
    User.findOneAndUpdate({ _id: params.id }, { $pull: { friends: params.friendsId } }, { new: true })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No User found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

};

module.exports = UserController;
