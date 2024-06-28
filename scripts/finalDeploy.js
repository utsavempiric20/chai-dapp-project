const hre = require("hardhat");

async function main() {
  const chai = await hre.ethers.getContractFactory("Chai");
  const contract = await chai.deploy();

  console.log(contract.target);
}

main().catch((error) => {
  console.log(error);
  process.exitCode = 1;
});
