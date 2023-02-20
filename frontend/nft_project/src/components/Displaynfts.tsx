import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import { Nftcard } from './index'

const Displaynfts = ({ tokens }) => {
    console.log('display', tokens)
  return (
    <>
    {tokens.length < 1 ? (<h1 className="text-center font-semibold">No NFT's to display</h1>) : (<h1 className="text-center font-semibold">Address owned nfts</h1>)}
    <div className="m-[2vw] flex flex-wrap justify-center gap-6">
        {tokens?.map((token) => (
            <Nftcard
            key={uuidv4()}
            username={token.username}
            geo={token.geo}
            mintdate={token.mintdate}
            value={token.value}
            imgdata={token.imgdata}
            />
            ))}
    </div>
    </>
  )
}

export default Displaynfts