import nodemailer from "nodemailer";
import "dotenv/config";

const { UKR_NET_EMAIL, UKR_NET_PASSWD, PORT, SECURE } = process.env;
const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = (data) => {
  const email = { ...data, from: UKR_NET_EMAIL };
  return transport.sendMail(email);
};

export default sendEmail;
