import { API } from '../backend';

export const signup = user =>{
    console.log(user)
    return fetch(`${API}/signup`,{
        method:"POST",
        headers:{
            Accept: 'application/json',
            "Content-Type" : 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        return response.json(); 
    })
    .catch(err => console.log(err))
}

export const signin = user =>{
    console.log(user)
    return fetch(`${API}/signin`,{
        method:"POST",
        headers:{
            Accept: 'application/json',
            "Content-Type" : 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        console.log(response)
        return response.json(); 
    })
    .catch(err => console.log(err))
}

export const editUser = user =>{
    console.log(user)
    return fetch(`${API}/edit/user/${user.collegeId}`,{
        method:"PUT",
        headers:{
            Accept: 'application/json',
            "Content-Type" : 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        console.log(response)
        return response.json(); 
    })
    .catch(err => console.log(err))
}

