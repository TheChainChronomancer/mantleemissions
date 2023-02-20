import React, { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'


import { Displaynfts } from './components';

import Web3 from 'web3';
import axios from 'axios';



function App() {
  
  const [isMinting, setIsMinting] = useState(false)
  const [tokensOwned, setTokensOwned] = useState([])
  const [account, setAccount] = useState()
  const [contract, setContract] = useState<any>()
  const [image, setImage] = useState<any>();
  const [form, setForm] = useState({
    username: '',
    mintdate: new Date().toISOString().slice(0, 10),
    value: '',
    geo: '',
  })
  var nfttobemintedcid = '';
  var imgCid = '';


  const contractAddress = "0x8f2A3A01D06c93c5b84eE367391E487a32D669FA"
  const contractAbi = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "approved",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "ApprovalForAll",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "getApproved",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "getTokensByOwner",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getTotalTokens",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      }
    ],
    "name": "isApprovedForAll",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "player",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "tokenURI",
        "type": "string"
      }
    ],
    "name": "mintCO2savings",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "ownerOf",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "setApprovalForAll",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes4",
        "name": "interfaceId",
        "type": "bytes4"
      }
    ],
    "name": "supportsInterface",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "tokenURI",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

  const connect = async () =>{

    if(window.ethereum){
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x1389' }],
        })
       } catch (switchError: any) {
        if (switchError.code === 4902) {
          try{
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                { 
                  chainId: '0x1389',
                  chainName: 'Mantle testnet',
                  nativeCurrency: {
                    symbol: 'BIT',
                    decimals: 18,
                  },
                  rpcUrls: ['https://rpc.testnet.mantle.xyz']
                }
              ]
            })
          } catch (err) {
            alert('Error while switching chain')
            console.log(err)
          }
        }

        }

      await window.ethereum.request({
        method: 'eth_requestAccounts'
      });
      window.web3 = new Web3(window.ethereum);

      window.web3.eth.getAccounts().then((accounts: any) => {
        setAccount(accounts[0]);
        setContract(new window.web3.eth.Contract(contractAbi, contractAddress))
      })
    } else {
      alert('Metamask not detected')
      return;
    }
  }

  

  const uploadMetadata = async() => {
    if(imgCid != ''){
      
      const content = JSON.stringify({ pinataContent: {...form, imgdata: imgCid} })
      try{
        const res = await axios.post("https://api.pinata.cloud/pinning/pinJSONToIPFS", content, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_APP_JWT_PINATA}`
          }
        })
        nfttobemintedcid  = res.data.IpfsHash
        return 'uploaded'
      }catch(err){
        console.log(err)
      }
    }
  }

  const uploadImage = async () => {
    
    const formData = new FormData();
    formData.append('file', image)

    try{
      const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData,{
        headers: {
          'Content-Type': `multipart/form-data`,
          'Authorization': `Bearer ${import.meta.env.VITE_APP_JWT_PINATA}`
        }
      });
      imgCid = res.data.IpfsHash
      return 'uploaded'
    } catch (error) {
      console.log(error);
    }

  }

  const handleChange = (e: any) => {
    setForm({...form, [e.target.name]: e.target.value})
  }

  const handleMint = async (e: any) => {
    e.preventDefault();
    setIsMinting(true)
    
    if(account && contract){
        const uploadingimage = await uploadImage();
        const uploadingmeta = await uploadMetadata();
        if(uploadingimage === 'uploaded' && uploadingmeta === 'uploaded'){
        contract.methods.mintCO2savings(account, nfttobemintedcid).send({ from: account })
          .on('receipt', (receipt: any) => {
            console.log('New nft minted', receipt)
          })
          .on('error', (error: any) => {
            console.log('Error while minting nft', error)
          })
          .finally(() => {
            setForm({
              username: '',
              mintdate: new Date().toISOString().slice(0, 10),
              value: '',
              geo: '',
            })
            imgCid = '';
            nfttobemintedcid = ''
            setIsMinting(false);
          })
      } 
    }else{
      alert("please fill the form to mint your nft")
      setIsMinting(false)
    }
  }

  const handleImageUpload = (e: any) => {
    const uploadedImage = e.target.files[0];
    setImage(uploadedImage);
  }

  
    useEffect(() => {
      fetchTokensOwned();
    }, [contract])
    

  const fetchTokensOwned =  async () => {
    const arr = [];
    let promisses = [];
    if(contract){
      try {
        const result = await contract.methods.getTokensByOwner(account).call();
        for(let i = 0; i < result.length; i++) {
          promisses.push(await new Promise(async(resolve, reject) => {
            const res = await contract.methods.tokenURI(result[i]).call();
            axios.get(`https://cloudflare-ipfs.com/ipfs/${res}`).then((res2) => {
            arr.push(res2.data);
          }).catch((err) => console.log(err))
          resolve();
        }
        ))
        }
        await Promise.all(promisses);
        setTokensOwned(arr);
      } catch (error) {
        console.log(error)
      }
    }
  }


  

  return (
    <div>
      <div className="bg-[#aaa] p-3 flex items-center justify-between">
        <h1>
          Mint your CO2 tokens
        </h1>
        {account ? (
          <h1>Your connected wallet address is {account}</h1>  
        ) : (
          <button type="button" onClick={connect} className="bg-green-600 py-3 px-2 drop-shadow-md border-2 border-black rounded-md text-[15px]">
          Connect Wallet
          </button>
        )}
        
      </div>
      <form className="m-[2vw]" onSubmit={handleMint}>
        <div className="flex flex-col gap-5">
          <label className="block text-sm font-medium text-gray-900" htmlFor="username">User:</label>
          <input type="text" value={form.username} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block w-full p-3" onChange={handleChange} id="username" name="username">
          </input>
          <label className="block text-sm font-medium text-gray-900" htmlFor="mintdate">Mint date</label>
          <input type="date" value={form.mintdate} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block w-full p-3" id="mintdate" name="mintdate" disabled>
          </input>
          <label className="block text-sm font-medium text-gray-900" htmlFor="value">Value:</label>
          <input type="text" value={form.value} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block w-full p-3" onChange={handleChange} id="value" name="value">
          </input>
          <label className="block text-sm font-medium text-gray-900" htmlFor="geo">Geo:</label>
          <input type="text" value={form.geo} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block w-full p-3" onChange={handleChange} id="geo" name="geo">
          </input>
          <label className="block text-sm font-medium text-gray-900" htmlFor="imgcid">Image:</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block w-full p-3" id="imgcid" name="geo">
          </input>
          <button type='submit' className="p-2 bg-[#333] text-white rounded-lg" onClick={handleMint} disabled={isMinting}>
            Mint NFT
          </button>
        </div>
      </form>
      {tokensOwned.length > 1 && <Displaynfts tokens={tokensOwned}/>}
    </div>
  )
}

export default App