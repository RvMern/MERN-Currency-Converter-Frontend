import { useState } from 'react'
import {useMutation} from '@tanstack/react-query';
import './App.css'
import conversionAPI from './apis/conversionAPI';
import ErrorComponent from './component/ErrorComponent';

function App() {
  const currencyOptions = [
    'INR', 'USD', 'EUR', 'CAD',
    'EGP', 'HKD', 'IDR', 'JOD',
    'JPY', 'KRW', 'LKR', 'MXN',
    'NPR', 'NZD', 'PHP', 'PKR',
    'RUB', 'SGD', 'THB', 'TWD',
    'VND', 'XCD', 'ZAR', 'ZWL'
  ]
  const [conversion,setConversion] = useState({
    curr1:'',
    curr2:'',
    amount:''
  });

  const mutation = useMutation({mutationFn:conversionAPI,mutationKey:['currencyConversion']});

  

  const handleChange = (e) => {
    const {value,name} = e.target;
    setConversion({
      ...conversion,
      [name]:value
    });
  };

  const handleReset = () => {
    window.location.href = '/'
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(conversion.curr1 === '' || conversion.curr2 === '' || conversion.amount === ''){
      return alert('enter all details');
    }
    if(conversion.curr1 === conversion.curr2){
      return alert('Please! Don\'t Select Same Currency Conversion')
    }
    mutation.mutate(conversion);

  };

  return (
    <>
      <section className='min-h-screen bg-slate-900 flex flex-col
      justify-center items-center p-12 lg:px-80'>
        <form onSubmit={handleSubmit} className='w-full rounded-lg bg-gray-200'>
          <h1 className='text-2xl font-bold text-center bg-violet-500 py-4 mb-4 rounded-lg text-indigo-200'>Currency Converter</h1>
          <div className='bg-slate-300 p-2 my-4 flex flex-col justify-center items-center'>
            <label className='font-medium' htmlFor="">Amount</label>
            <input value={conversion?.amount} onChange={handleChange} className='p-2 font-medium rounded-lg my-1 text-center
            focus:outline-none ' type="number" name='amount' id='amount' placeholder='Enter Amount...' />
          </div>
          <div className='flex flex-col justify-center items-center bg-white
          md:flex-row
          md:justify-between'>
            <div className='bg-violet-300 p-2 w-60 m-4 flex justify-around rounded-lg shadow-2xl'>
              <label className='font-medium' htmlFor="">From :</label>
              <select name='curr1' onChange={handleChange} className='py-1 focus:outline-none cursor-pointer
              mx-2 rounded-md font-medium text-center px-2'>
              <option value="" selected disabled>Currency 1</option>
                {
                  currencyOptions.map((currencyOption)=>{
                    return <option key={currencyOption} value={currencyOption}>{currencyOption}</option>
                  })
                }
              </select>
            </div>
            <div className='bg-violet-400 p-2 w-60 m-4 flex justify-around rounded-lg shadow-2xl'>
              <label className='font-medium' htmlFor="">To : </label>
              <select name='curr2' onChange={handleChange} className='py-1 focus:outline-none cursor-pointer
              mx-2 rounded-md font-medium text-center px-2'>
              <option value="" disabled selected>Currency 2</option>
                {
                  currencyOptions.map((currencyOption)=>{
                    return <option key={currencyOption} value={currencyOption}>{currencyOption}</option>
                  })
                }
              </select>
            </div>
          </div>
          {
            mutation?.isSuccess && <ErrorComponent data={mutation?.data}/>
          }
          {
            mutation?.isError && <ErrorComponent data={mutation?.error?.response?.data}/>
          }
          {
            mutation?.isPending && <div className='m-5 p-2 bg-black'>
                <p className='p-2 text-center font-medium bg-violet-200'>isLoading...</p>
            </div>
          }
          <div className='p-2 my-4 flex flex-col justify-center items-center'>
            <button className='bg-slate-900 text-white font-medium p-2 w-60
            my-2 rounded-lg
            transition-all hover:bg-purple-500 hover:transform
            hover:-translate-y-1 hover:shadow-xl' type='submit'>Submit</button>
            <button onClick={handleReset} type='reset' className='bg-slate-900 text-white font-medium p-2 w-60
            my-2 rounded-lg
            transition-all hover:bg-red-500 hover:transform
            hover:-translate-y-1 hover:shadow-xl'>Clear</button>
          </div>

          {

          }
        </form>
      </section>
    </>
  )
}

export default App
