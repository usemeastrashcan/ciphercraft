import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcrypt';

export async function POST(req: NextRequest) {
    try {
        await connect();
        console.log("Database connected");

        const reqBody = await req.json();
        const { username, email, password } = reqBody;

        if (!username || !email || !password) {
            return NextResponse.json(
                {
                    message: "All data not available.",
                    success: false
                },
                {
                    status: 400 
                }
            );
        }
        console.log("Input data validated");

        const user = await User.findOne({ email });
        if (user) {
            return NextResponse.json(
                {
                    message: "Already Exists.",
                    success: false
                },
                {
                    status: 400 
                }
            );
        }
        console.log("User does not exist");

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        console.log("Password hashed");

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        const savedUser = await newUser.save();
        console.log("User saved");

        return NextResponse.json(
            {
                message: "User Created.",
                success: true,
                savedUser
            },
            {
                status: 201 
            }
        );
    } catch (error) {
        console.error('Error during user signup:', error);
        return NextResponse.json(
            {
                message: "Couldn't Sign Up",
                success: false,
            },
            {
                status: 500 
            }
        );
    }
}
