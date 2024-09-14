import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcrypt'
import jwt from 'jsonwebtoken'



export async function POST(req: NextRequest)
{
    try{
        await connect()
        const reqBody = await req.json()
        const {email, password}  = reqBody

        const user = await User.findOne({email})
        if(!user)
        {    
            return NextResponse.json(
            {
                message: "Cannot Find User",
                success: false
            },
            {
                status: 401
            })
        }

        const ValidPassword = await bcryptjs.compare(password, user.password)
        if(!ValidPassword)
            {
                return NextResponse.json(
                    {
                        message: "Invalid Credentials",
                        success: false
                    },
                    {
                        status: 401
                    })
            }
        
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET!)

            const response = NextResponse.json(
                {
                    message: 'Successful Login',
                    success: true
                },
                {
                    status: 201
                }
            )

            response.cookies.set('token', token, {
                httpOnly: true
            })

            return response
    }
    catch(error)
    {
        NextResponse.json(
            {
                message: "Error Generated",
                success: false
            },
            {
                status: 400
            }
        )
    }
}