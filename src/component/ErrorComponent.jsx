import React from 'react'
import { MdError } from "react-icons/md";
import { IoIosCloudDone } from "react-icons/io";

const ErrorComponent = ({data}) => {
  const {status,from,to,conversion_rate,conversion_result} = data;
  let icon = ''
  let resultColorResponse = 'p-2 text-center font-medium'
  let borderColorResponse = 'm-5 p-2'
  
  switch(status){
    case 'success':
        icon = <IoIosCloudDone className='text-2xl'/>;
        resultColorResponse += ' bg-violet-200 text-green-600';
        borderColorResponse += ' bg-green-400';
        break;
    case 'error':
        icon = <MdError className='text-2xl' />;
        resultColorResponse += ' bg-red-200 text-red-400';
        borderColorResponse += ' bg-red-400';
        break;
    default:
        break;
  }

  return (
    <>
        <div className={borderColorResponse}>
            <div className={resultColorResponse}>
                <div className='flex justify-center items-center'>
                    {icon}
                    <span className='ms-2'>{status}</span>
                </div>
                <p>From : {from}</p>
                <p>To : {to}</p>
                <p>Conversion Rate : {conversion_rate}</p>
                <p>Conversion Result : {conversion_result}</p>
            </div>
        </div>
    </>
  )
}

export default ErrorComponent