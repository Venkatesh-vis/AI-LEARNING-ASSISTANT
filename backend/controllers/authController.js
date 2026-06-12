import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User.js';


//Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE || '7d',
    });
}

export const register = async(req, res, next) => {
    try{
        const { username, email, password } = req.body;

        if(!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });

        if(existingUser) {
            return res.status(400).json({ 
                success:false,
                message: "Email already in use" 
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            password: hashedPassword
        });

        const token = generateToken(user._id);

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(201).json({
            success: true,
            data: {
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    profilePicture: user.profilePicture,
                    createdAt: user.createdAt
                },
            },
            message: "User Registered Successfuly"
        });

    }
    catch(err) {
        next(err);
    }
}


export const login = async(req, res, next) => {
    try{
        const {email, password} = req.body;

        if (!email || !password) {
            return res.status(400).json({message:"All fields are required"})
        }

        const user = await User.findOne({email}).select("+password");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        const isMatch =  await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }
        
        const token = generateToken(user._id);

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({
            success: true,
            data: {
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    profilePicture: user.profilePicture,
                },
            },
            message: "Login Successful"
        });

    }
    catch(err) {
        next(err);
    }
}


export const getProfile = async(req, res, next) => {
    try{
        const user = await User.findById(req.user.id);

        return res.status(200).json({
            success:true,
            data: {
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    profilePicture: user.profilePicture,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
                }
            },
            message: "User profile fetched successfully"
        })
    }
    catch(err) {
        next(err);
    }
}

export const updateProfile = async(req, res, next) => {
    try{     
        
        const {username, email, profilePicture} = req.body;

        const user = await User.findById(req.user.id);

        if (username) user.username = username;
        if (email) user.email = email;
        if (profilePicture) user.profilePicture = profilePicture;

        await user.save();

        return res.status(200).json({
            success: true,
            data: {
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    profilePicture: user.profilePicture
                }
            },
            message: "Profile updated successfully",
});
    }   
    catch(err) {
        next(err);
    }   
}

export const changePassword = async(req, res, next) => {
    try{

        const {currentPassword, newPassword} = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                success:false,
                message:"Please provide current and new password"
            })
        }

        const user = await User.findById(req.user.id).select("+password");       

        const isMatch = await bcrypt.compare(currentPassword, user.password);

        if (!isMatch) {
            return res.status(401).json({
                success:false,
                message: "Current password is incorrect"
            })
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;

        await user.save();

        return res.status(200).json({
            success:true,
            message: "Password changes successfully"
        })
        
    }
    catch(err) {
        next(err);
    }
}

export const checkAuth = async(req, res, next) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                success:false,
                message: "User not found"
            })
        }
        return res.status(200).json({
            success:true,
            data: {
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    profilePicture: user.profilePicture,
                    createdAt: user.createdAt,
                }
            },
            message: "Authenticated"
        });
    }
    catch(err) {
        next(err);
    }
}