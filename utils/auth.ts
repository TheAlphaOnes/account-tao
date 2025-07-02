import { betterAuth } from "better-auth";
import ps from "pg"

import { username } from "better-auth/plugins"
import { sso } from "better-auth/plugins/sso";

// const { sendMail } = useNodeMailer();

import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db/index";



const sendEmailVerify = async (url:String,toUser:String,name:String) => {

  const body = {
    to: toUser,
    subject: "Verify Your Email Address",
    html: `
      <html>
        <body style="font-family: Arial, sans-serif; background-color: #ffffff; color: #333; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
            <h2 style="text-align: center; color: #000000;">Verify Your Email Address</h2>
            <p style="font-size: 16px; line-height: 1.5; color: #000000;">Hello <strong>${name}</strong>,</p>
            <p style="font-size: 16px; line-height: 1.5; color: #000000;">
              Thank you for registering with us! To complete the registration process, please verify your email address by clicking the link below.
            </p>
            <p style="text-align: center;">
              <a href="${url}" style="display: inline-block; background-color: #000000; color: #ffffff; font-size: 16px; font-weight: bold; padding: 12px 24px; text-decoration: none; border-radius: 4px; transition: background-color 0.3s ease;">
                Verify Your Email
              </a>
            </p>
            <p style="font-size: 14px; color: #888888; text-align: center; margin-top: 20px;">
              If you didn't request this, please ignore this email.
            </p>
            <p style="font-size: 14px; color: #888888; text-align: center;">
              Best regards,<br/>
              TheAlphaOnes Team
            </p>
          </div>
        </body>
      </html>
    `
  };


  return body


};

const sendEmailForget = async (url:String,toUser:String,name:String) => {

  const body = {
    to: toUser,
    subject: "Reset Your Password",
    html: `
      <html>
        <body style="font-family: Arial, sans-serif; background-color: #ffffff; color: #333; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
            <h2 style="text-align: center; color: #000000;">Reset Your Password</h2>
            <p style="font-size: 16px; line-height: 1.5; color: #000000;">Hello <strong>${name}</strong>,</p>
            <p style="font-size: 16px; line-height: 1.5; color: #000000;">
              We received a request to reset your password. Click the button below to set a new password for your account.
            </p>
            <p style="text-align: center;">
              <a href="${url}" style="display: inline-block; background-color: #000000; color: #ffffff; font-size: 16px; font-weight: bold; padding: 12px 24px; text-decoration: none; border-radius: 4px; transition: background-color 0.3s ease;">
                Reset Password
              </a>
            </p>
            <p style="font-size: 14px; color: #888888; text-align: center; margin-top: 20px;">
              If you did not request this, you can ignore this email. Your password will remain unchanged.
            </p>
            <p style="font-size: 14px; color: #888888; text-align: center;">
              Best regards,<br/>
              TheAlphaOnes Team
            </p>
          </div>
        </body>
      </html>
    `
};




  return body
};


export const auth = betterAuth({


  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }, request) => {
      await sendEmailVerify(url,user.email,user.name);
    },
  },

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,

    sendResetPassword: async ({user, url, token}, request) => {
      await sendEmailForget(url,user.email,user.name);

    },

  },
    plugins: [
        username(),
         sso()
    ] ,

    database: drizzleAdapter(db, {
        provider: "pg", // or "mysql", "sqlite"
    })
})
