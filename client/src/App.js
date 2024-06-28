import { useState, useEffect } from "react";
import "./App.css";
import abi from "./contract/Chai.json";
import { ethers } from "ethers";
import Buy from "./components/Buy";
import Memos from "./components/Memos";

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [account, setAccount] = useState("None");

  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0x024C101F8F9540eA8be9ec6722Fb01b479FD15CF";
      const contractABI = abi.abi;
      try {
        const { ethereum } = window;
        if (ethereum) {
          const account = await ethereum.request({
            method: "eth_requestAccounts",
          });

          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );
          setAccount(account);
          setState({ provider, signer, contract });
        } else {
          alert("Please Install Metamask.");
        }
      } catch (error) {
        console.log(error);
      }
    };

    window.ethereum.on("accountsChanged", (account) => {
      // setAccount(account[0]);
      window.location.reload();
    });

    connectWallet();
  }, [state]);

  return (
    <div style={{ height: "100vh" }}>
      <p style={{ textAlign: "center", marginTop: "20px", color: "red" }}>
        Connected Account : {account}
      </p>
      <div className="container">
        <Buy state={state} />
        <Memos state={state} />
      </div>
    </div>
  );
}

export default App;
