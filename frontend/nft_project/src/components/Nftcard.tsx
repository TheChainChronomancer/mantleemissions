import React, { useState } from 'react'
import axios from 'axios'



const Nftcard = ({ username, geo, mintdate, value, imgdata}) => {
  return (
    <div className="w-[300px] rounded-[15px] bg-[#D3D3D3]">
        <img src={`https://cloudflare-ipfs.com/ipfs/${imgdata}`} alt="tokenimg" className="w-full h-[200px] object-cover rounded-t-[15px]"/>
        <div className="flex flex-col p-4">
            <div className="flex items-center justify-between">
                <h3>Username</h3>
                <p>{username}</p>
            </div>
            <div className="flex items-center justify-between">
                <h3>Geo</h3>
                <p>{geo}</p>
            </div>
            <div className="flex items-center justify-between">
                <h3>Mint date</h3>
                <p>{mintdate}</p>
            </div>
            <div className="flex items-center justify-between">
                <h3>Saving Value</h3>
                <p>{value} CO2</p>
            </div>
        </div>
    </div>
  )
}

export default Nftcard