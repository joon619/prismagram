// import dotenv from "dotenv";
// import path from "path";
// dotenv.config({ path: path.resolve(__dirname, ".env") });

import { adjectives, nouns } from "./words";
import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";
import jwt from "jsonwebtoken";

export const generateSecret = () => {
    //adjectives의 배열 길이 내에서 랜덤넘버(내림차순)을 가져옴
    const randomNumber = Math.floor(Math.random() * adjectives.length);
    return `${adjectives[randomNumber]} ${nouns[randomNumber]}`
};

console.log(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD);

const sendMail = email => {
    const options = {
        auth: {
            api_user: process.env.SENDGRID_USERNAME,
            api_key: process.env.SENDGRID_PASSWORD
        }
    };
    const client = nodemailer.createTransport(sgTransport(options));
    return client.sendMail(email);
};

export const sendSecretMail = (adress, secret) => {
    const email = {
        from: "joonhyung619@gmail.com",
        to: adress,
        subject: "Login Secret for Prismagram",
        html: `Hello! Your login secret it <strong>${secret}.</strong><br/>Copy paste on the app/website to log in`
    };
    return sendMail(email);
};

//JWT 생성
export const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET);