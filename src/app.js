import express from "express";
import * as dotenv from 'dotenv'
import Server from "./server.js";


const main = async () => {
    const server = new Server()
    server.run()
}

main().catch(console.error)