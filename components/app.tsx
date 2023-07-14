import { useState, useEffect, useRef } from 'react'
import SocialLogin from '@biconomy/web3-auth'
import { ChainId } from '@biconomy/core-types'
import { ethers } from 'ethers'
import SmartAccount from '@biconomy/smart-account'
import { IBalances } from '@biconomy/node-client'
import { css } from '@emotion/css'
import list from "../biconomy.tokenlist.json"
import {BalancesDto } from '@biconomy/node-client'

const tokens = [
  {
    address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
    decimals: 6,
    symbol: 'USDC'
  },
  {
    address: '0xc2132d05d31c914a87c6611c10748aeb04b58e8f',
    decimals: 6,
    symbol: 'USDT'
  },
  {
    address: '0x0000000000000000000000000000000000001010',
    decimals: 18,
    symbol: 'MATIC',
  }]

export default function Home() {
  const [smartAccount, setSmartAccount] = useState<SmartAccount | null>(null)
  const sdkRef = useRef<SocialLogin | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [ball,setbal]=useState<IBalances[]>([])
  const [name,setName]=useState<string>("")
  const [link,setLink]=useState<string>("")
  const[recepientAddress,setRecepientAddress]=useState<string>("")
  const [choice,setChoice]=useState(tokens[0])
const [amount,setAmount]=useState<string>('')
const [tx,senttx]=useState<boolean>(false)

  let balances;

  async function login() {
    if (!sdkRef.current) {
      const socialLoginSDK = new SocialLogin()
     
      await socialLoginSDK.init({
        chainId: ethers.utils.hexValue(ChainId.POLYGON_MUMBAI),
      
      })
      sdkRef.current = socialLoginSDK
      
    }

    if (!sdkRef.current.provider) {
    
      sdkRef.current.showWallet()
      
    } else {
      setupSmartAccount()
    }
  }

  async function setupSmartAccount() {
    if (!sdkRef?.current?.provider) return
    
    setLoading(true)
    const web3Provider = new ethers.providers.Web3Provider(
      sdkRef.current.provider
    )
    try {
      const smartAccount = new SmartAccount(web3Provider, {
        activeNetworkId: ChainId.POLYGON_MUMBAI,
        supportedNetworksIds: [ChainId.POLYGON_MUMBAI],
        networkConfig: [
          {
          chainId: ChainId.POLYGON_MUMBAI,
          dappAPIKey: 'Yw5ZS2-19.12f12d89-1ffc-437e-8713-d68ee187ef59',
        }
      ]
      })
      await smartAccount.init()
      const tx = await smartAccount.deployWalletUsingPaymaster();
      setSmartAccount(smartAccount)
      setLoading(false)
      getBalance(smartAccount)
      setLink("https://mumbai.polygonscan.com/address/"+smartAccount.address)
    } catch (e) {
      console.log(`error ${e}`)
    }
  }
  async function getBalance(smartAccount: SmartAccount){
    if (!smartAccount) 
    return
    const balanceParams: BalancesDto ={chainId: ChainId.POLYGON_MUMBAI,
    eoaAddress: smartAccount.address,
    tokenAddresses: [list.tokens[6].address], 
  };
  const bal= await smartAccount.getAlltokenBalances(balanceParams);
  balances=bal.data[0].balance
  balances=balances*1e-18
  console.log(balances)
  setbal(bal.data)
  }

  const logout = async () => {
    if (!sdkRef.current) {
      console.error('Web3Modal not initialized.')
      return
    }
    await sdkRef.current.logout()
    sdkRef.current.hideWallet()
    setSmartAccount(null)
    setbal([])
   
  }
  async function sendTx(){
    if (!smartAccount) 
    return
    let tx
    if (choice.symbol === 'MATIC') {
      tx = {
        to: recepientAddress,
        value: ethers.utils.parseEther(amount)
      }
    } else {
     /* if the selected to send is not a native token (i.e. not MATIC), then configure a custom transaction */
     const erc20Interface = new ethers.utils.Interface([
        'function transfer(address _to, uint256 _value)'
      ])
      const data = erc20Interface.encodeFunctionData(
        'transfer', [recepientAddress, ethers.utils.parseUnits(amount, choice.decimals)]
      )
      tx = {
        to: choice.address,
        data: data
      }
    }

    const txResponse = await smartAccount.sendTransaction({ transaction: tx });
console.log('userOp hash', txResponse.hash);
const txReciept = await txResponse.wait();
console.log('Tx hash', txReciept.transactionHash);
getBalance(smartAccount)
  }
  

  return (
    <div className={containerStyle}>
      <h1 className={headerStyle}>PIXIE PURSE</h1>
      {
        
        !smartAccount && !loading && (
          <><input placeholder='name' value={name} required onChange={(event) => setName(event.target.value)} /><button className={buttonStyle} onClick={login}>Login</button></>)
      }
      {
        loading && <p>Loading account details...</p>
      }
      {
        smartAccount && (
          <><div className={detailsContainerStyle}>
            <h2>Hello {name}</h2>
            <h3>Smart account address:</h3>
            <p>{smartAccount.address}</p>
            <a target="_blank" href={link}>Contract On PolygonScan</a>
            
          </div><div >
              {ball.map((balance, index) => {
                return (
                  <div key={index}>
                    <p>{balance.contract_ticker_symbol} - {balance.balance*(1e-18)}</p>
                  </div>
                )
              })}
            </div>
            <button className={buttonStyle} onClick={logout}>Logout</button>
            <div >
            <input
              value={recepientAddress}
              placeholder="recipient's address"
              onChange={e => setRecepientAddress(e.target.value)}
              
            />
            <input
              value={amount}
              placeholder='amount'
              onChange={e => setAmount(e.target.value)}
              
            />
            <p>Choose which token you'd like to send</p>
              <select name='tokens' id='tokens' onChange={e=>setChoice(tokens[e.target.value])}>
                {
                  tokens.map((token, index) => (
                    <option
                      key={index}
                      value={index}
                    >{token.symbol}</option>
                  ))
                }
              </select><>
              </>
              <button className={buttonStyle} onClick={sendTx}>sendTokens</button>
            </div>
            </>
        )
      }
      
      
    </div>
  )
    }

const detailsContainerStyle = css`
  margin-top: 10px;
`

const buttonStyle = css`
  padding: 14px;
  width: 300px;
  border: none;
  cursor: pointer;
  border-radius: 999px;
  outline: none;
  margin-top: 20px;
  transition: all .25s;
  &:hover {
    background-color: rgba(0, 0, 0, .2); 
  }
`

const headerStyle = css`
  font-size: 44px;
`

const containerStyle = css`
  width: 900px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 100px;
`