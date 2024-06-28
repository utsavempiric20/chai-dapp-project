const hre = require("hardhat");

async function getBalances(address) {
  const balanceBigInt = await hre.ethers.provider.getBalance(address);
  return hre.ethers.formatEther(balanceBigInt);
}

async function consoleBalances(addresses) {
  let counter = 0;
  for (const address of addresses) {
    console.log(`Address ${counter} balance :`, await getBalances(address));
    counter++;
  }
}

async function consoleMemos(memos) {
  for (const memo of memos) {
    const name = memo.name;
    const message = memo.message;
    const timestamp = memo.timestamp;
    const from = memo.from;
    console.log(
      `Time: ${timestamp}, name: ${name}, message: ${message}, from: ${from}`
    );
  }
}

async function main() {
  const [owner, from1, from2, from3] = await hre.ethers.getSigners();

  const chai = await hre.ethers.getContractFactory("Chai");
  const contract = await chai.deploy(); //instance of contract

  console.log("Address of Contract : ", contract.target);
  console.log("Address owner : ", owner.address);

  const addresses = [
    owner.address,
    from1.address,
    from2.address,
    from3.address,
  ];
  console.log("Before buying chai");
  await consoleBalances(addresses);

  const amount = { value: await hre.ethers.parseEther("1") };
  await contract.connect(from1).buyChai("from1", "nice chai 1", amount);
  await contract.connect(from2).buyChai("from2", "nice chai 2", amount);
  await contract.connect(from3).buyChai("from3", "nice chai 3", amount);

  console.log("After buying chai");
  await consoleBalances(addresses);
}

main().catch((error) => {
  console.log(error);
  process.exitCode = 1;
});
