const User = require ('../models/user');

async function handleGetAllUsers (req, res){
    const allDbUsers = await User.find({});
    res.send(allDbUsers);
};

async function handleGetUserById (req,res){
    //display specific user with id
    // earlier used to find users manually
    // const id = Number(req.params.id);
    // const user = users.find((user)=>user.id===id);

    //using mongodb's built in functionality to search user by id
    const user = await User.findById(req.params.id);
    if(!user) return res.status(404).json({msg: "No user found with this id"});
    res.json(user);
}

async function handleUpdateUserById (req, res){
// edit/update user with id
res.json({status: "pending"})
};

async function handleDeleteUserById (req,res){
    await User.findByIdAndDelete(req.params.id);
    return res.json({status: "successfull delete"})
}

async function handleCreateUser (req,res){
    const body = req.body;
    if(!body || !body.first_name || !body.last_name ||!body.email || !body.gender || !body.job_title ){
        return res.status(400).json({msg: "All fields are required"});
    };    
    //earlier the below code used to append the mock data locally present
    // users.push({id: users.length+1, ...body});
    // fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data)=>{
    //     return res.status(201).json({status: "success", id: users.length});
    // })

    //writing the data in mongoDB
    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.job_title
    });
    
    // console.log("Result >>> ", result);
    return res.status(201).json({msg: "success", id: result._id});
}

module.exports = {
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateUser
}