import { useState, useEffect, useRef } from "react";
import SocialLogin from "@biconomy/web3-auth";
import { ChainId } from "@biconomy/core-types";
import { ethers } from "ethers";
import SmartAccount from "@biconomy/smart-account";
import { IBalances } from "@biconomy/node-client";
import { css } from "@emotion/css";
import list from "../biconomy.tokenlist.json";
import { BalancesDto } from "@biconomy/node-client";

const tokens = [
  {
    address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
    decimals: 6,
    symbol: "USDC",
  },
  {
    address: "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
    decimals: 6,
    symbol: "USDT",
  },
  {
    address: "0x0000000000000000000000000000000000001010",
    decimals: 18,
    symbol: "MATIC",
  },
];

export default function Home() {
  const [smartAccount, setSmartAccount] = useState<SmartAccount | null>(null);
  const sdkRef = useRef<SocialLogin | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [ball, setbal] = useState<IBalances[]>([]);
  const [name, setName] = useState<string>("");
  const [interval, enableInterval] = useState<boolean>(false);
  const [link, setLink] = useState<string>("");
  const [recepientAddress, setRecepientAddress] = useState<string>("");
  const [choice, setChoice] = useState(tokens[0]);
  const [amount, setAmount] = useState<string>("");
  const [tx, senttx] = useState<Number>(0);
  const [log, setLogin] = useState<Number>(0);

  let balances;
  // useEffect(() => {
  //   let configureLogin: string | number | NodeJS.Timer | undefined;
  //   if (interval) {
  //     configureLogin = setInterval(() => {
  //       if (smartAccount) {
  //         getBalance(smartAccount);
  //       }
  //       if (!!sdkRef.current?.provider) {
  //         setupSmartAccount();
  //         clearInterval(configureLogin);
  //       }
  //     }, 10000);
  //   }
  // }, [interval]);
  useEffect(() => {
    const interval = setInterval(() => {
      if (smartAccount) getBalance(smartAccount);
    }, 10000);
    // return () => clearInterval(interval);
  }, []);
  async function login() {
    if (!sdkRef.current) {
      const socialLoginSDK = new SocialLogin();

      await socialLoginSDK.init({
        chainId: ethers.utils.hexValue(ChainId.POLYGON_MUMBAI),
      });
      sdkRef.current = socialLoginSDK;
    }

    if (!sdkRef.current.provider) {
      sdkRef.current.showWallet();
      enableInterval(true);
    } else {
      setupSmartAccount();
    }
    // setLogin(true);
  }

  async function setupSmartAccount() {
    if (!sdkRef?.current?.provider) return;

    setLoading(true);
    const web3Provider = new ethers.providers.Web3Provider(
      sdkRef.current.provider
    );
    try {
      const smartAccount = new SmartAccount(web3Provider, {
        activeNetworkId: ChainId.POLYGON_MUMBAI,
        supportedNetworksIds: [ChainId.POLYGON_MUMBAI],
        networkConfig: [
          {
            chainId: ChainId.POLYGON_MUMBAI,
            dappAPIKey: "Yw5ZS2-19.12f12d89-1ffc-437e-8713-d68ee187ef59",
          },
        ],
      });
      await smartAccount.init();
      const tx = await smartAccount.deployWalletUsingPaymaster();
      setSmartAccount(smartAccount);
      setLoading(false);
      getBalance(smartAccount);
      setLink("https://mumbai.polygonscan.com/address/" + smartAccount.address);
    } catch (e) {
      console.log(`error ${e}`);
    }
  }
  async function getBalance(smartAccount: SmartAccount) {
    if (!smartAccount) return;
    const balanceParams: BalancesDto = {
      chainId: ChainId.POLYGON_MUMBAI,
      eoaAddress: smartAccount.address,
      tokenAddresses: [list.tokens[6].address],
    };
    const bal = await smartAccount.getAlltokenBalances(balanceParams);
    balances = bal.data[0].balance;
    balances = balances * 1e-18;
    console.log(balances);
    setbal(bal.data);
  }

  const logout = async () => {
    if (!sdkRef.current) {
      console.error("Web3Modal not initialized.");
      return;
    }
    await sdkRef.current.logout();
    sdkRef.current.hideWallet();
    setSmartAccount(null);
    enableInterval(false);
    setbal([]);
    // setLogin(false);
  };
  async function sendTx() {
    if (!smartAccount) return;
    let tx;
    if (choice.symbol === "MATIC") {
      tx = {
        to: recepientAddress,
        value: ethers.utils.parseEther(amount),
      };
    } else {
      /* if the selected to send is not a native token (i.e. not MATIC), then configure a custom transaction */
      const erc20Interface = new ethers.utils.Interface([
        "function transfer(address _to, uint256 _value)",
      ]);
      const data = erc20Interface.encodeFunctionData("transfer", [
        recepientAddress,
        ethers.utils.parseUnits(amount, choice.decimals),
      ]);
      tx = {
        to: choice.address,
        data: data,
      };
    }
    senttx(1);
    const txResponse = await smartAccount.sendTransaction({ transaction: tx });
    console.log("userOp hash", txResponse.hash);
    const txReciept = await txResponse.wait();
    console.log("Tx hash", txReciept.transactionHash);
    getBalance(smartAccount);
    senttx(2);
  }

  return (
    <>
      {!smartAccount && (
        <>
          <div className="contain">
            <div className="loginBox">
              {" "}
              <img
                className="user"
                src="https://i.ibb.co/yVGxFPR/2.png"
                height="100px"
                width="100px"
              ></img>
              <h3 className="top">PIXIE PURSE</h3>
              {!smartAccount && !loading && (
                <>
                  <div id="inputBox">
                    <input
                      className="uname"
                      type="text"
                      placeholder="name"
                      value={name}
                      required
                      onChange={(event) => setName(event.target.value)}
                    />
                  </div>
                  <input
                    type="submit"
                    name=""
                    value="Login"
                    onClick={login}
                  ></input>
                </>
              )}
              {loading && <a className="back">Loading account details...</a>}
            </div>
          </div>
        </>
      )}
      {smartAccount && (
        <>
          <header className="hero">
            <div className="cont">
              <div className="row">
                <div className="col-md-6 col-md-offset-6 col-xs-12">
                  <div className="hero-text">
                    <h1 className="two">
                      <span>Hello, </span>
                      <br></br>
                      {name}
                    </h1>
                    <h2>
                      Welcome to <span className="one">#1</span> trusted wallet
                      for AA related Transactions.
                    </h2>
                    <h2 className="two">Smart account address: </h2>
                    <h2>{smartAccount.address}</h2>

                    <a
                      target="_blank"
                      href={link}
                      className="btn btn-lg btn-primary"
                    >
                      View Contract On PolygonScan
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </header>
          <button className="btn btn-lg btn-primary logout" onClick={logout}>
            Logout
          </button>
          <div className="bal">
            <div>
              {ball.map((balance, index) => {
                return (
                  <div key={index}>
                    <p>
                      {balance.contract_ticker_symbol} -{" "}
                      {balance.balance * 1e-18}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="transfer">
              <input
                value={recepientAddress}
                placeholder="recipient's address"
                type="text"
                onChange={(e) => setRecepientAddress(e.target.value)}
              />
              <input
                value={amount}
                placeholder="amount"
                type="text"
                onChange={(e) => setAmount(e.target.value)}
              />
              <p>Choose which token you'd like to send</p>
              <select
                name="tokens"
                id="tokens"
                onChange={(e) => setChoice(tokens[Number(e.target.value)])}
              >
                {tokens.map((token, index) => (
                  <option key={index} value={index}>
                    {token.symbol}
                  </option>
                ))}
              </select>
              <br></br>
              <br></br>
              <button className="btn btn-lg btn-primary" onClick={sendTx}>
                sendTokens
              </button>
            </div>
            {tx == 1 && <p>Your transaction is under process.....</p>}
            {tx == 2 && <p>Transaction sent</p>}
          </div>
        </>
      )}
    </>
  );
}
