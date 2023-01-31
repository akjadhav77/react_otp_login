import axios from 'axios';

export const commonRequest = async(methods, url, body, header)=> { // we will call api only once and reuse it
    let config = {
        method: methods,
        url,
        headers: header ? header 
        : {
            'content-type': 'application/json'
        },
        data: body
    }
    
    // axios instance
    return axios(config).then((data)=> {
        return data
    }).catch((error)=> {
        return error
    })
} 