const express= require('express');

const router = express.Router();

const {handleGetAllUsers, 
    handleGetUserById, 
    handleUpdateUserById, 
    handleDeleteUserById, 
    handleCreateUser} = require('../controllers/user')

// router.get('/users', async (req, res)=>{
//     const allDbUsers = await User.find({});
//     const html = `
//     <ul>
//         ${allDbUsers.map((user)=> `<li>${user.firstName} - ${user.email}</li>`).join("")}
//     </ul>
//     `
//     res.send(html)
// })

//rest api end point

router.route('/')
.get(handleGetAllUsers)
.post(handleCreateUser);

router.route('/:id')
.get(handleGetUserById)
.patch(handleUpdateUserById)
.delete(handleDeleteUserById);

module.exports = router;