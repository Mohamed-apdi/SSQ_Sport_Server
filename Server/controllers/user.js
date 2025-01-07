import User from "../models/user.js";


// Helper function to handle errors
const handleError = (res, status, message, error = null) => {
    console.error(error || message);
    res.status(status).json({ message, error: error?.message });
};

// create a new user
export const createUser = async (req, res) => {
    const { email, username } = req.body;

    try {
        const userByEmail = await User.findOne({ email });
        const userByUsername = await User.findOne({ username });

        if(userByEmail ) {
            return res.status(400).send({ message: "email already exists" });
        }
        if(userByUsername) {
            return res.status(400).send({ message: "username already exists" });
        }

        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser);

    } catch (error) {
        handleError(res, 500, "Internal server error", error);
    }
}

// get all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.status(200).json(users);
    } catch (error) {
        handleError(res, 500, "Internal server error", error);
    }
}

// get a user by id
export const getUserById = async (req, res) => {

    try {
        const { id } = req.params;

        const user = await User.findById(id).select("-password");
        if(!user) {
            return res.status(404).send({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        handleError(res, 500, "Internal server error", error);
    }
}

// update a user by id
export const updateUserById = async (req, res) => {
    const {id} = req.params;

    try {
        const updatedUser = await User.findByIdAndUpdate(id, req.body, {
            new: true,
        }).select("-password");
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(updatedUser);
    } catch (error) {
        handleError(res, 500, "Internal server error", error);
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
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        handleError(res, 500, "Internal server error", error);
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

        const token = await findUser.generateAuthToken();
        res.status(200).json({
            _id: findUser._id,
            username: findUser.username,
            email: findUser.email,
            role: findUser.role,
            token,
        });


    } catch (error) {
        handleError(res, 500, "Internal server error", error);
    }
};


// logout user
export const logoutUser = async (req, res) => {
    try {
        return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        handleError(res, 500, "Internal server error", error);
    }
};

// Get user overview
export const getUserOverview = async (req, res) => {
    try {
        const userOverview = await User.aggregate([
            {
                $group: {
                    _id: {
                        year: { $year: "$createdAt" },
                        month: { $month: "$createdAt" },
                    },
                    count: { $sum: 1 },
                },
            },
            { $sort: { "_id.year": 1, "_id.month": 1 } },
            {
                $project: {
                    _id: 0,
                    year: "$_id.year",
                    month: "$_id.month",
                    count: 1,
                },
            },
        ]);

        res.status(200).json(userOverview);
    } catch (error) {
        handleError(res, 500, "Internal server error", error);
    }
};