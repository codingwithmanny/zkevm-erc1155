// Imports
// ========================================================
import Bundlr from "@bundlr-network/client";
import fs from "fs";
import path from 'path';
import dotenv from 'dotenv';
import BigNumber from "bignumber.js";

// Config
// ========================================================
dotenv.config();
const ARWEAVE_TX_URL = "https://arweave.net/";
const privateKey = process.env.WALLET_PRIVATE_KEY;
const bundlr = new Bundlr("http://node1.bundlr.network", "matic", privateKey); // NOTE: You need matic in your wallet to upload

// Main Upload Script
// ========================================================
(async () => {
    try {
        // Retrieve current balance
        console.group('Current Balance');
        const atomicBalance = await bundlr.getLoadedBalance();
        console.log({ atomicBalance });
        console.log({ atomicBalance: atomicBalance.toString() });
        const convertedBalance = bundlr.utils.unitConverter(atomicBalance);
        console.log({ convertedBalance });
        console.log({ convertedBalance: convertedBalance.toString() });
        console.groupEnd();

        // Get all files
        console.group('Files');
        const folderPath = path.join(__dirname, '..', 'svg');
        const files = await fs.readdirSync(folderPath);
        console.log({ files });
        const svgFiles = files.filter(i => i.includes('.svg'));
        console.log({ svgFiles });
        console.groupEnd();

        // Get total file size for all files
        console.group('Funding Node');
        let size = 0;
        for (let i = 0; i < svgFiles.length; i++) {
            const fileToUpload = path.join(__dirname, '..', 'svg', svgFiles[i]);
            const fileSize = await fs.statSync(fileToUpload);
            size += fileSize.size;
        }
        console.log({ size });
        const price = await (await bundlr.getPrice(size)).toNumber() / 1000000000000000000;
        console.log({ price });
        
        // Fund if needed
        if (price > parseFloat(convertedBalance.toString())) {
            console.log('Funding...');
            const fundAmountParsed = BigNumber(price as any).multipliedBy(bundlr.currencyConfig.base[1]);
            console.log({ fundAmountParsed: fundAmountParsed.toString() });
            await bundlr.fund(fundAmountParsed.toString());
            const convertedBalance = bundlr.utils.unitConverter(atomicBalance);
            console.log({ convertedBalance: convertedBalance.toString() });
        }
        console.groupEnd();

        console.group('Uploading...');
        for (let i = 0; i < svgFiles.length; i++) {
            const fileToUpload = path.join(__dirname, '..', 'svg', svgFiles[i]);
            const response = await bundlr.uploadFile(fileToUpload);
            console.log(`${ARWEAVE_TX_URL}${response.id}`);
        }
        console.groupEnd();
    } catch (e) {
        console.error("Error uploading file ", e);
    }
})();
