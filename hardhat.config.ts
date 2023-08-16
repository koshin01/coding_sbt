import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";

const getPrivateKey = (): string => {
  if (typeof process.env.PRIVATE_KEY === "undefined") {
    throw new TypeError("Add the private key to the environment variable");
  } else {
    return process.env.PRIVATE_KEY;
  }
}

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    mumbai: {
      url: process.env.MUMBAI_NODE,
      accounts: [getPrivateKey()],
    }
  },
};

export default config;