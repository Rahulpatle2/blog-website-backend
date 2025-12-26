import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'

export const userRegisterController = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "all fields are required" })
        }

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "user already exist!" })
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            username,
            email,
            password: hashPassword,
        });

        const { password: _, ...safeUser } = user._doc

        const token = jwt.sign({
            id: user._id,
            username: user.username
        }, process.env.SECRET_KEY);
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "none",
        });

        res.status(201).json({ token, user: safeUser })

    } catch (error) {
        res.status(500).json({ massage: error })
    }
}

export const userLoginController = async (req, res) => {
    try {
        const {  email, password } = req.body

        if ( !email || !password) {
            return res.status(400).json({ message: "All credentials required!" })
        }
        const user = await userModel.findOne({
            email,
        });

        if (!user) {
            return res.status(404).json({ message: "user doesn't exist!" })
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);

        if (!isPasswordMatched) {
            return res.status(401).json({ message: "wrong credentials!" })
        }



        const token = jwt.sign({
            id: user._id,
            email: user.email,
        }, process.env.SECRET_KEY, { expiresIn: "10m" });
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "none",
        });

        res.status(200).json({ message: "user logged in successfully", token });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

export const getUserController = async (req, res) => {
    
   try {
        res.status(200).json({
            isAuthenticated: true,
            user: req.user 
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }


}