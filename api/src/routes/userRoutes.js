import express from 'express'
import * as userController from '../controllers/userController.js'
import * as authController from '../controllers/authController.js'

const router = express.Router()

router.post('/signup', authController.signUp)
router.post('/login', authController.login)
router.get('/logout', authController.logout)

// restricts to authenticated users
router.use(authController.authenticate)

router.route('/current')
  .get(userController.getCurrentUser, userController.getUser)
  /*  .patch(
      userController.uploadUserPhoto,
      userController.resizeUserPhoto,
      userController.updateCurrentUser
    )*/
  .delete(userController.deleteCurrentUser)

export default router
