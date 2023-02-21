# Mantle Emissions

Our team created a project called Mantle Emissions, which makes it easy for users of our carpool application to mint their CO2 savings as NFTs on the Mantle blockchain. Here are the steps we took to create the project:

## Minting Tokens
The first step was to create a smart contract to mint tokens on the Mantle network. We used a standard token contract called ERC721, which is based on the OpenZeppelin library. We also added some custom functions to the contract to track the tokens owned by a given address and the total number of tokens minted.

## Frontend Development
Next, we developed a frontend for the project using ReactJS and Web3JS. The frontend includes a form where users can see their CO2 savings that they've earned by carpooling in the app. This information is pre-filled in the form, so that users can't change it before submitting it to the Mantle network.

We used Web3JS to interact with the Mantle network and mint new tokens based on the information entered by users. The frontend also includes a section where users can view all the tokens they own.

## Uploading Files to IPFS
To store the images uploaded by users, we used the InterPlanetary File System (IPFS). We used a Pinata API to upload the files to IPFS, which allows us to pin them to the network and make them accessible to users. We used two endpoints provided by Pinata: pinFileToIPFS and pinJSONToIPFS.

Their docs are available on:
https://docs.pinata.cloud/pinata-api/

## Retrieving Files from IPFS
Finally, we used a public gateway API to retrieve the files stored on IPFS. This allows us to display the images uploaded by users in the frontend. We used a gateway provided by Cloudflare, which allows us to retrieve the files using their IPFS CID. 

More at https://cloudflare-ipfs.com/ipfs/.

### Notes
In the frontend, don't forget to set the environment variable VITE_APP_JWT_PINATA. When deploying the smart contract, make sure to set the private key with enough BIT coins to deploy the smart contract in the hardhat.config.js file. To deploy the smart contract, use the command:

bash
Copy code
npx hardhat run scripts/deploy.js

If you deploy a new contract, don't forget to change the contract address variable in frontend/nft_project/src/App.tsx.
