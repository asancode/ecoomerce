import axios from "axios"
const apiUrl = import.meta.env.VITE_API_URL
export const postData = async(url,formData)=>{
    try {
        const response = await fetch(apiUrl+url,{
            method:'POST',
            headers:{
                'Content-Type':'applocation/json',
                'Authorization': `Bearer ${localStorage.getItem("token") || ""}`,
            },
            body:JSON.stringify(formData)
        })
        if (response.ok) {
            const data = await response.json()
            return data
        }else{
            const errorData = await response.json()
            return errorData
        }
    } catch (error) {
        console.error('Error:',error)
    }
}

export const fetchDataFromApi = async(url)=>{
    try {
       const {data} = await axios.get(apiUrl+url,{
        
            'Authorization':`Bearer ${localStorage.getItem('accesstoken')}`,
            'Content-Type':"application/json",
        }
)
return data 
    } catch (error) {
        console.log(error)
        return error
    }
}

export const editData = async(url,formData)=>{
    const params = {
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${localStorage.getItem('accessToken')}`,
        },
    }
    const {res} = await axios.put(apiUrl+url,formData,params)
    return res
}
export const deleteData = async (url)=>{
    const params={
        headers:{
            "Authorization":`Bearer ${localStorage.getItem('accessToken')}`,
            "Content-Type":"application/json",
        }
    }
    const {res}=await axios.delete(apiUrl+url,params)
    return res
}