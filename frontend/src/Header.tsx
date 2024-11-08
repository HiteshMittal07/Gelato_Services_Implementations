import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { Button, Navbar } from "flowbite-react";
const Header = () => {
  const [account, setAccount] = useState<string>("");

  const truncateWalletAddress = async (address: string, length = 4) => {
    if (!address) return "";
    const start = address.substring(0, length);
    const end = address.substring(address.length - length);
    setAccount(`${start}...${end}`);
  };

  const connectWallet = async () => {
    if (!(window as any).ethereum) {
      window.alert("first install the metamask");
      window.location.href = "https://metamask.io/download/";
      return;
    }
    try {
      await switchNetwork("11155111"); // As i am using sepolia in this case.
      const provider = getWeb3Provider();
      const address = await requestAccounts(provider);
      localStorage.setItem("address", address);
      truncateWalletAddress(address);
    } catch (error) {
      alert(error);
    }
  };

  async function switchNetwork(selectedValue: string) {
    await (window as any).ethereum
      .request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x${Number(selectedValue).toString(16)}` }],
      })
      .then(() => {
        console.log("Chain ID is added in MetaMask");
      })
      .catch((error: any) => {
        if (error.code === 4902) {
          console.log("Chain ID is not added in MetaMask");
        } else {
          console.error(error);
        }
      });
  }

  function getWeb3Provider() {
    const provider = new ethers.BrowserProvider((window as any).ethereum);
    return provider;
  }

  async function requestAccounts(provider: any) {
    const accounts = await provider.send("eth_requestAccounts", []);
    return accounts[0];
  }

  useEffect(() => {
    const connect = async () => {
      await switchNetwork("11155111");
      const provider = getWeb3Provider();
      const address = await requestAccounts(provider);
      truncateWalletAddress(address);
    };
    if (localStorage.getItem("address")) {
      connect();
    }
  }, []);

  return (
    <Navbar fluid rounded className="bg-black shadow-lg text-white">
      <Navbar.Brand href="/" className="ml-28">
        <span className="self-center whitespace-nowrap text-xl font-semibold text-white">
          Gelato Implementations
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2 mr-20">
        {!account ? (
          <Button color="light" onClick={connectWallet}>
            Connect Wallet
          </Button>
        ) : (
          <Button color="light">{account}</Button>
        )}
        <Navbar.Toggle />
      </div>
    </Navbar>
  );
};

export default Header;
