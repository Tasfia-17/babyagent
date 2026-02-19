const hre = require("hardhat");

async function main() {
  console.log("🎒 Deploying Agent Kindergarten contracts...\n");

  // Deploy BabyAgentFactory
  console.log("1️⃣ Deploying BabyAgentFactory...");
  const BabyAgentFactory = await hre.ethers.getContractFactory("BabyAgentFactory");
  const babyAgentFactory = await BabyAgentFactory.deploy();
  await babyAgentFactory.waitForDeployment();
  const factoryAddress = await babyAgentFactory.getAddress();
  console.log("✅ BabyAgentFactory deployed to:", factoryAddress);

  // Deploy KindergartenCurriculum
  console.log("\n2️⃣ Deploying KindergartenCurriculum...");
  const KindergartenCurriculum = await hre.ethers.getContractFactory("KindergartenCurriculum");
  const curriculum = await KindergartenCurriculum.deploy(factoryAddress);
  await curriculum.waitForDeployment();
  const curriculumAddress = await curriculum.getAddress();
  console.log("✅ KindergartenCurriculum deployed to:", curriculumAddress);

  // Deploy SkillExamVerifier
  console.log("\n3️⃣ Deploying SkillExamVerifier...");
  const SkillExamVerifier = await hre.ethers.getContractFactory("SkillExamVerifier");
  const examVerifier = await SkillExamVerifier.deploy(factoryAddress);
  await examVerifier.waitForDeployment();
  const examAddress = await examVerifier.getAddress();
  console.log("✅ SkillExamVerifier deployed to:", examAddress);

  // Deploy DiplomaNFT
  console.log("\n4️⃣ Deploying DiplomaNFT...");
  const DiplomaNFT = await hre.ethers.getContractFactory("DiplomaNFT");
  const diplomaNFT = await DiplomaNFT.deploy(examAddress);
  await diplomaNFT.waitForDeployment();
  const diplomaAddress = await diplomaNFT.getAddress();
  console.log("✅ DiplomaNFT deployed to:", diplomaAddress);

  // Deploy JobMatchingBoard
  console.log("\n5️⃣ Deploying JobMatchingBoard...");
  const JobMatchingBoard = await hre.ethers.getContractFactory("JobMatchingBoard");
  const jobBoard = await JobMatchingBoard.deploy(diplomaAddress);
  await jobBoard.waitForDeployment();
  const jobBoardAddress = await jobBoard.getAddress();
  console.log("✅ JobMatchingBoard deployed to:", jobBoardAddress);

  // Save deployment addresses
  const fs = require('fs');
  const deploymentInfo = {
    network: hre.network.name,
    chainId: hre.network.config.chainId,
    contracts: {
      BabyAgentFactory: factoryAddress,
      KindergartenCurriculum: curriculumAddress,
      SkillExamVerifier: examAddress,
      DiplomaNFT: diplomaAddress,
      JobMatchingBoard: jobBoardAddress
    },
    timestamp: new Date().toISOString()
  };

  fs.writeFileSync(
    `./deployments/${hre.network.name}.json`,
    JSON.stringify(deploymentInfo, null, 2)
  );

  console.log("\n🎓 All contracts deployed successfully!");
  console.log("\n📝 Deployment info saved to:", `./deployments/${hre.network.name}.json`);
  
  console.log("\n📋 Contract Addresses:");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("BabyAgentFactory:      ", factoryAddress);
  console.log("KindergartenCurriculum:", curriculumAddress);
  console.log("SkillExamVerifier:     ", examAddress);
  console.log("DiplomaNFT:            ", diplomaAddress);
  console.log("JobMatchingBoard:      ", jobBoardAddress);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
