const express = require("express")
const {UserModel} = require("../models/user.model")

const userRouter = express.Router()

userRouter.post('/add',async(req,res)=>{
    try {
        const { name, role, email,  phoneNumber } = req.body;
        // Create a new user
        const newUser = new UserModel({
            name,
            role,
            email,
            phoneNumber,
        });
    
        // Save the user to the database
        await newUser.save();
    
        res.status(200).json({ message: 'User added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
})


userRouter.get('/all', async (req, res) => {
    try {
        const users = await UserModel.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


userRouter.get('/:id', async (req, res) => {
    try {
      const user = await UserModel.findById(req.params.id);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
});



userRouter.delete('/:id', async (req, res) => {
    try {
      const deletedUser = await UserModel.findByIdAndDelete(req.params.id);
  
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
});



userRouter.put('/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const updatedUser = await UserModel.findByIdAndUpdate(userId, req.body,{ new: true });

        if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({message:"User updated successfully",updatedUser});
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = {userRouter}