import express from "express";
import { createShortUrl, redirectToOriginalUrl } from "../controller/url";
const userRoute = express();

userRoute.post("/", createShortUrl)
userRoute.get(`/:shortUrlId`, redirectToOriginalUrl)

export default userRoute