const router = require('express').Router();

const {
  getUsers,
  getUserById,
  addUser,
  editDataUser,
  editAvatarUser,
} = require('../controllers/users');

router.post('/', addUser);
router.get('/', getUsers);
router.get('/:userId', getUserById);
router.patch('/me', editDataUser);
router.patch('/me/avatar', editAvatarUser);

module.exports = router;
