import axios from 'axios';


const conversionAPI = async(conversionData) => {
    const response = await axios.post('http://127.0.0.1:5000/api/v1/converter/currency-converter',conversionData,{
        headers:{
            'Content-Type':'application/json'
        }
    });
    return response.data
};


export default conversionAPI;