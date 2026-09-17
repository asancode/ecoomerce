import React from 'react'
import { Link } from 'react-router-dom'

const BannerBox = (props) => {
  return (
    <>
    <div className='box bannerBox overflow-hidden rounded-lg group'>
        <Link to='/'>
    <img src={props.img} className='w-full group-hover:scale-110 transition-all duration-150 h-full'/>
    </Link>
    </div>
     <div
        className={`info absolute p-5 top-0 ${
          props.info === "left" ? "left-0" : "right-0"
        } w-[50%] h-[100%] z-50 flex items-center justify-center flex-col`}
      >
        <h2 className="text-[22px] font-[700]">{props.item.title}</h2>
        <span className="text-[25px] font-[600] text-blue-600 w-full">AED {props.item.price}</span>
        <div className="w-full">
        <Link to="/" className="text-[16px] font-[700] hover:text-gray-600 hover:underline ">SHOP NOW</Link>
        </div>
      </div>
    </>
  )
}

export default BannerBox
