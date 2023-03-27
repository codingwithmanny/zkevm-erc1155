// Imports
// ========================================================
import Bundlr from "@bundlr-network/client";
import fs from "fs";
import path from 'path';
import dotenv from 'dotenv';

// Config
// ========================================================
dotenv.config();
const ARWEAVE_TX_URL = "https://arweave.net/";
const privateKey = process.env.WALLET_PRIVATE_KEY;
const bundlr = new Bundlr("http://node1.bundlr.network", "matic", privateKey);

// Main Upload Script
// ========================================================
(async () => {
    console.group('Uploading folder...');
    try {
        const folderPath = path.join(__dirname, '..', 'manifest');
        const folder = fs.existsSync(folderPath);
        console.log({ folderExists: folder });
        if (!folder) {
            throw new Error('Folder doesn\'t exist');
        }
        const response = await bundlr.uploadFolder(folderPath, {
            indexFile: "", // optional index file (file the user will load when accessing the manifest)
            batchSize: 4, //number of items to upload at once
            keepDeleted: false, // whether to keep now deleted items from previous uploads
        }); //returns the manifest ID
    
        console.log({ response });
        console.log({ URL: `${ARWEAVE_TX_URL}${response?.id}`});
    } catch (e) {
        console.error("Error uploading file ", e);
    }
    console.groupEnd();
})();
