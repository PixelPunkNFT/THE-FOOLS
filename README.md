# The Fools NFT  
Welcome to the official repository of *The Fools*, an innovative NFT project.  

## What is The Fools?  
The Fools is an exciting new NFT project, launching with a collection of 10,000 unique NFTs. Our mission is to make a lasting impact in the NFT space by challenging conventions and striving to become game-changers in the industry.  

## What will you find in this repository?  
We strongly believe in open-source principles. This repository will host all the source code for our applications and smart contracts as they are developed and released.  

### Why open source?  
Here’s why we’ve chosen to make our work open source:  
- **Transparency**: To foster trust by openly showcasing how our systems work.  
- **Education**: To provide a resource for learning and exploration within the NFT and blockchain space.  
- **Inspiration**: To encourage other developers to draw ideas from our work and build even better applications for the community.  


# Run the application
Follow this steps to run the application on your local environment.
You need to have NodeJS installed on your local machine.

- Clone the repository.
- On the root folder run the command **npm install** to install dependencies.
- Run the application with command **npm start**.
- Open your browser to **localhost:3000**.

# Config the application
We insered a little config file for define some global configurations on the application, you have to modify it with your own parameters.
Inside the folder **src** you will find a file named **config.js**.

```
export const SMART_CONTRACT = "0xE2f767C3c1050123bfDbb0AE732E37b6d369EC4F";
export const CHAIN_ID = "137"; // POLYGON MAINNET
export const COST = 15;
```

- **SMART_CONTRACT** Address of the Smart Cotract to interat with.
- **CHAIN_ID** Chain ID where the Smart Contract is deployed.
- **COST** Cost for minting.
# we
