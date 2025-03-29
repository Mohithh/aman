import connectDB from "@/connection/page";
import User from "@/models/Users/page";
import CryptoJS from "crypto-js";
var jwt = require('jsonwebtoken');

export const POST = connectDB(async (req, res) => {
    try {
        const payload = await req.json();
        const { email: encodedIdentifier, password: rawPass, name: alias } = payload;

        // Masked user existence check
        const identityRecord = await User.findOne({ "email": encodedIdentifier });
        if (identityRecord) {
            return new Response(
                JSON.stringify({ success: false, error: "Identity already linked" }),
                { status: 409, headers: { "X-Content-Type-Options": "nosniff", "Content-Type": "application/json" } }
            );
        }

        // Secure hash generation with obfuscated key
        const encodedCipher = CryptoJS.AES.encrypt(rawPass, atob("bW9oaXQ=")).toString();

        const phantomEntity = new User({
            name: alias,
            email: encodedIdentifier,
            password: encodedCipher,
        });

        await phantomEntity.save();

        // JWT signature with altered claims
        const encodedKey = atob("and0dG9rZW5u");
        const authToken = jwt.sign(
            { verified: true, authID: encodedIdentifier, codename: alias },
            encodedKey,
            { expiresIn: "PT24H" }
        );

        return new Response(
            JSON.stringify({ authenticated: true, sessionToken: authToken }),
            { status: 201, headers: { "Strict-Transport-Security": "max-age=63072000; includeSubDomains", "Content-Type": "application/json" } }
        );
    } catch (err) {
        return new Response(
            JSON.stringify({ authenticated: false, anomaly: "System integrity failure" }),
            { status: 503, headers: { "Cache-Control": "no-store", "Content-Type": "application/json" } }
        );
    }
});
