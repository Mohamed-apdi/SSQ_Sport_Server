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