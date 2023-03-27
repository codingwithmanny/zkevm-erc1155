# zkEVM ERC1155 NFT Contract - Zk Mythic Cards

This project demonstrates how to create an erc1155 contract with multiple game card items.

!["zkEVM EC1155 Mythic Cards NFTs"](/docs/nfts.png)

---

## Requirements

- NVM or Node `v18.15.0`
- Wallet With Polygon Mainnet Matic (for the upload to arweave)
- Wallet With zkEVM Testnet Tokens

---

## Getting Start

This will walk you through the steps to setup, deploy, and mint the contract.

### Install Dependencies

```bash
# FROM: ./zkevm-erc1155

npm install; # pnpm install
```

### Copy Environment Variable File

```bash
# FROM: ./zkevm-erc1155

cp .env.example .env;
```

### Update Environment Variables With Wallet Private Key

**File:** `.env`

```toml
WALLET_PRIVATE_KEY="<YOUR-WALLET-PRIVATE-KEY>"
```

### Upload Images To Arweave

**NOTE:** You will need actual `matic` to upload these files or just use the urls below

```bash
# FROM: ./zkevm-erc1155

npm run uploadFiles; # pnpm uploadFiles

# Expected Output:
# Uploading...
#   https://arweave.net/R5XqHv1UKWOazGJDX0iLe7GxqLByn3Zr5iYTCq-toko
#   https://arweave.net/QeV-FZNE4U-sDX659aQjHqnj1ocEHqGOlZm57k1mHxU
#   https://arweave.net/mnwuhiIbcne6swxK0Vm98OK-azPV-x3-_dGCsMSZbrw
#   https://arweave.net/h3kkGN_QRfhYWbZlQb5N2bSaqj6HNB4_pGxLfsdhWuo
```

### Modify Manifest JSON

Modify all four json files in the `./manifest` folder with the respective arweave url

**File:** `./manifest/1.json`

```json
{
    "description": "The Blade of Souls is a legendary weapon steeped in mystery and lore. It is said to have been created by the gods themselves, imbued with the power to vanquish even the most malevolent of beings", 
    "image": "https://arweave.net/h3kkGN_QRfhYWbZlQb5N2bSaqj6HNB4_pGxLfsdhWuo", 
    "name": "Blade Of Souls",
    "attributes": [
        {
            "trait_type": "Damage", 
            "value": 12
        }
    ]
}
```

### Upload Manifest Folder With JSON Files To Arweave

**NOTE:** You will need actual `matic` to upload these files or just use the urls below

```bash
# FROM: ./zkevm-erc1155

npm run uploadFolder;; # pnpm uploadFolder;

# Expected Output:
# Uploading folder...
#   { folderExists: true }
#   {
#     response: {
#       id: 'l9LANRyWrOOOgnaDrOG8QKBRbxTNf7mMeANw781y4bs',
#       timestamp: 1679943617898
#     }
#   }
#   {
#     URL: 'https://arweave.net/l9LANRyWrOOOgnaDrOG8QKBRbxTNf7mMeANw781y4bs'
#   }
```

Verify the files (Example):

[https://arweave.net/l9LANRyWrOOOgnaDrOG8QKBRbxTNf7mMeANw781y4bs/1.json](https://arweave.net/l9LANRyWrOOOgnaDrOG8QKBRbxTNf7mMeANw781y4bs/1.json)
[https://arweave.net/l9LANRyWrOOOgnaDrOG8QKBRbxTNf7mMeANw781y4bs/2.json](https://arweave.net/l9LANRyWrOOOgnaDrOG8QKBRbxTNf7mMeANw781y4bs/2.json)
[https://arweave.net/l9LANRyWrOOOgnaDrOG8QKBRbxTNf7mMeANw781y4bs/3.json](https://arweave.net/l9LANRyWrOOOgnaDrOG8QKBRbxTNf7mMeANw781y4bs/3.json)
[https://arweave.net/l9LANRyWrOOOgnaDrOG8QKBRbxTNf7mMeANw781y4bs/4.json](https://arweave.net/l9LANRyWrOOOgnaDrOG8QKBRbxTNf7mMeANw781y4bs/4.json)

### Update Environment Variable

**File:** `.env`

```toml
BASE_URL="https://arweave.net/l9LANRyWrOOOgnaDrOG8QKBRbxTNf7mMeANw781y4bs/"
```

### Compile Contract

```bash
# FROM: ./zkevm-erc1155

npx hardhat compile;

# Expected Output:
# Generating typings for: 15 artifacts in dir: typechain-types for target: ethers-v5
# Successfully generated 46 typings!
# Compiled 15 Solidity files successfully
```

### Deploy Contract To zkEVM Testnet

**NOTE:** Make sure you enough have zkEVM Testnet Tokens in your wallet to deploy the contract

```bash
# FROM: ./zkevm-erc1155

npx hardhat run scripts/deploy.ts --network zkevmTestnet;

# Expected Output:
# ZkMythicCards deployed to 0x4eeA7fB8f39E28D5cEDB2f0661E8BE3b4d40131F
```

### Update Environment Variable File With Deployed Contract

**File:** `.env`

```toml
CONTRACT_ADDRESS="0x4eeA7fB8f39E28D5cEDB2f0661E8BE3b4d40131F"
```

### Mint NFTs

**NOTE:** Or you could mint them individually via [https://web3uploader.xyz](https://web3uploader.xyz)

```bash
# FROM: ./zkevm-erc1155

npx hardhat run scripts/mint.ts --network zkevmTestnet;

# Expected Output:
# Minting...
#   {
#     tx: {
#       hash: '0xff7851ddcef0b9ba2432188e47ca8dacafd7e90f7ef16f81dc106d1ce1dc5533',
#       type: 0,
```

Verify transaction: [https://testnet-zkevm.polygonscan.com/tx/0xff7851ddcef0b9ba2432188e47ca8dacafd7e90f7ef16f81dc106d1ce1dc5533](https://testnet-zkevm.polygonscan.com/tx/0xff7851ddcef0b9ba2432188e47ca8dacafd7e90f7ef16f81dc106d1ce1dc5533)

### Read NFT

**NOTE:** Take a look at the previous transanction and see which tokenIDs were minted.

**File:** `./scripts/read.ts`

```typescript
// ...

const TOKEN_ID = 1; // tokenID - modify if ID not minted

// ...
```

Run the script to read from the contract:

```bash
# FROM: ./zkevm-erc1155

npx hardhat run scripts/read.ts --network zkevmTestnet;

# Expected Output:
# Reading...
#   { TOKEN_ID: 1 }
#   {
#     tx: 'https://s7jmani4s2wohduco2b2zyn4icqfc3yuzv73tddyanyo7tls4g5q.arweave.net/l9LANRyWrOOOgnaDrOG8QKBRbxTNf7mMeANw781y4bs/1.json'
#   }
```

---

## Verified Contract

If you want to see a verified contract, see [https://explorer.public.zkevm-test.net/address/0x4eeA7fB8f39E28D5cEDB2f0661E8BE3b4d40131F/contracts#address-tabs](https://explorer.public.zkevm-test.net/address/0x4eeA7fB8f39E28D5cEDB2f0661E8BE3b4d40131F/contracts#address-tabs)

---

by [@codingwithmanny](https://twitter.com/codingwithmanny)