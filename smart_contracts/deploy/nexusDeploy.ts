import { DeployFunction } from "hardhat-deploy/types"
import { HardhatRuntimeEnvironment } from "hardhat/types"
import fs from "fs";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
	const { deployer, owner } = await hre.getNamedAccounts()

	const tx = await hre.deployments.deploy("Nexus", {
		from: deployer,
		args: [],
		log: true,
	})

    fs.writeFileSync(
        "src/nexusAddress.js",
        `export const nexusAddress = "${tx.address}"`
      );
      console.log("-------------------------------------------------");
      console.log(
        `minter deployed with address ${tx.address}, and written to src/nexusAddress.js!`
      );
}
export default func
func.tags = ["nexus"]
