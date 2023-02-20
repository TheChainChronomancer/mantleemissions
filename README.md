# Mint tokens

## Steps

### Creation of smart contract
The smart contract created was the ERC721 openzeppelin standard token, as requested by Nick, I've also need to include functions to track the tokens owned by a given adress and the total of tokens minted

### Frontend development
The frontend was developed using reactjs and web3js to perform the blockchain interacions. The available form provides an username, a geo reference, a value reference and a image reference, also were added a render to display all owned tokens by the connected address.

### Uploading the files to IPFS
To upload files to IPFS was used Pinata API.
The endpoints used were:
https://api.pinata.cloud/pinning/pinFileToIPFS
https://api.pinata.cloud/pinning/pinJSONToIPFS
Their docs are available on:
https://docs.pinata.cloud/pinata-api/

### Retrieving files from IPFS to render it
I've used an public gateway API to retrieve the IPFS files https://cloudflare-ipfs.com/ipfs/.

## Notes
In the frontend don't forget to set the .env variable: VITE_APP_JWT_PINATA
When deploying the smart contract dont fortget to set on hardhat.config.js the private key with enough BIT coins to deploy the smart contract
Deployment command
```
npx hardhat run scripts/deploy.js
```
And if deployed a new contract dont forget to change the contract address variable in frontend/nft_project/src/App.tsx