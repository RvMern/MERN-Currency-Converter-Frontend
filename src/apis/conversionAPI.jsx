import axios from 'axios';


const conversionAPI = async(conversionData) => {
    const response = await axios.post('https://mern-currency-converter-backend.onrender.com/api/v1/converter/currency-converter',conversionData,{
        headers:{
            'Content-Type':'application/json'
        }
    });
    return response.data
};


export default conversionAPI;