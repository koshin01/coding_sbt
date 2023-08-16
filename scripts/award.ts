import fs from "fs";
import { ethers } from "hardhat";
import "dotenv/config";

async function main() {

    const contractAddress = getContractAddress();

    const abi = await getAbi();

    const [owner] = await ethers.getSigners();

    const entryPassContract = await new ethers.Contract(
        contractAddress,
        abi.abi,
        owner
    );

    const metaData = await getMetaData();

    try {
        await entryPassContract.award(owner.address, metaData);
        console.log("awarded !");
    } catch (e) {
        console.log(e);
    }

}

const getContractAddress = (): string => {

    if (typeof process.env.CONTRACT_ADDRESS === "undefined") {
        throw new TypeError("Add the contract address to the environment variable");
    } else {
        return process.env.CONTRACT_ADDRESS;
    }

}

const getAbi = async () => {

    const bufferData = await fs.readFileSync("artifacts/contracts/EntryPass.sol/EntryPass.json");
    const abi = JSON.parse(bufferData.toString());

    return abi;

}

const getMetaData = () => {

    const metaDataStr = {
        "name": process.env.METADATA_NAME,
        "description": process.env.METADATA_DESC,
        "image": process.env.METADATA_IMG,
    };

    const metaData = JSON.stringify(metaDataStr)
    
    return metaData;
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});