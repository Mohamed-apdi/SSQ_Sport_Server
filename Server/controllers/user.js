import { generateToken } from "../Config/jwtToken.js";
import User from "../models/user.js";


// create a new user

export const createUser = async (req, res) => {
    const { email, username } = req.body;

    try {
        const findUser = await User.findOne({ 
            $or: [{email}, {username}]
        });
        if(findUser) {
            return res.status(400).send({ message: "User already exists" });
        }

        const newUser = new User(req.body);
        await newUser.save();
        res.status(200).json(newUser);

    } catch (error) {
        res.status(500).send({ message: "internal server error" });
    }
}

// get all users

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).send({ message: "internal server error" });
    }
}

// get a user by id

export const getUserById = async (req, res) => {

    try {
        const { id } = req.params;

        const findUser = await User.findById(id);
        if(!findUser) {
            return res.status(404).send({ message: "User not found" });
        }
        res.status(200).json(findUser);
    } catch (error) {
        res.status(500).send({ message: "internal server error" });
    }
}

// update a user by id

export const updateUserById = async (req, res) => {
    const {id} = req.params;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,req.body,
            {
                new: true,
            }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(updatedUser);
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error"});
    }
}

// delete a user by id

export const deleteUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(deletedUser);
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
}

// login user

export const loginUser = async (req, res ) => {
    const { email, password } = req.body;
    try {
        const findUser = await User.findOne({email});
        if(!findUser){
            return res.status(400).send({ message: "Invalid Email, please provide a valid email" });
        }

        const isMatch = await findUser.comparePassword(password);
        if(!isMatch){
            return res.status(400).send({ message: "Invalid Password, please provide a valid password" });
        }

        if(findUser && isMatch ) {
           return res.status(200).json({
                _id: findUser?._id,
                username: findUser?.username,
                email: findUser?.email,
                role: findUser?.role,
                token: generateToken(findUser?._id)
            });
        }else{
            return res.status(400).send({ message: "Invalid Email or Password, please provide a valid email and password" });
        }


    } catch (error) {
        res.status(500).send({ message: "Internal Server Error", error: error})
    }
}

// logout user

export const logoutUser = async (req, res) => {
    try {
        return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Logout error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
