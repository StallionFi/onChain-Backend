import { ethers } from "hardhat";
import { load } from 'ts-dotenv';
import { factoryAbi } from "../AbiBasic";
import { Interface, InterfaceAbi } from "ethers";

const env = load({
  INFURA_API_KEY: String,
  INFURA_SECRET_KEY: String,
  WALLET_PRIVATE_KEY: String,
  ETHERSCAN_API_KEY: String
});

const FatcoryContract = "0xC425acD9E80949d859F519bfcE9C6441F9da9710";

async function main() {
   
    const provider = ethers.getDefaultProvider(`https://spicy-rpc.chiliz.com/`);
    const signer = new ethers.Wallet(env.WALLET_PRIVATE_KEY, provider);

    async function getContract(contractAddress: string, abi: Interface | InterfaceAbi){
        return new ethers.Contract(contractAddress, abi, signer);
    }

    const factory = await getContract(FatcoryContract, factoryAbi);

    const token = await factory.createToken("hi", "h", 100, { gasLimit: 20000000 });
    console.log(token)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


