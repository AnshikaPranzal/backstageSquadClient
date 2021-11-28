import { API } from '../backend';

export const getAllSpeakerList = () =>{
    return fetch(`${API}/all/speaker`,{
        mode:'cors',
        method:"GET"
    })
    .then(response => {
    return response.json(); 
    })
    .catch(err => console.log(err))
}

export const getAllVenueList = () =>{
    return fetch(`${API}/all/venue`,{
        mode:'cors',
        method:"GET"
    })
    .then(response => {
    return response.json(); 
    })
    .catch(err => console.log(err))
}

export const getAllEventList = () =>{
    return fetch(`${API}/all/event`,{
        mode:'cors',
        method:"GET"
    })
    .then(response => {
    return response.json(); 
    })
    .catch(err => console.log(err))
}

export const getEventById = (eventId) =>{
    return fetch(`${API}/event/${eventId}`,{
        mode:'cors',
        method:"GET"
    })
    .then(response => {
    return response.json(); 
    })
    .catch(err => console.log(err))
}

export const getSpeakerById = (speakerId) =>{
    return fetch(`${API}/speaker/${speakerId}`,{
        mode:'cors',
        method:"GET"
    })
    .then(response => {
    return response.json(); 
    })
    .catch(err => console.log(err))
}

export const getEventPoster = (eventId) =>{
    return fetch(`${API}/event/poster/${eventId}`,{
        mode:'cors',
        method:"GET"
    })
    .then(response => {
        console.log(eventId," received")
    return response; 
    })
    .catch(err => console.log(err))
}

export const search = searchReq => {
    console.log('SearchReq:',searchReq);
    return fetch(`${API}/search`, {
        method: "POST",
        mode: "cors",
        headers:{
            Accept: 'application/json',
            "Content-Type" : 'application/json'
        },
        body: JSON.stringify(searchReq)
    })
    .then(response => {
        console.log('Response:',response);
        return response.json(); 
    })
    .catch(err => console.log(err));
}

export const createEvent = event => {
    console.log("here:")
    console.log(event.entries())
    for (var pair of event.entries()) {
        console.log(pair[0]+ ', ' + pair[1]); 
    }
    return fetch(`${API}/create/event`, {
        method: "POST",
        headers:{
            Accept: 'application/json'
        },
        body: event
    })
    .then(response => {
        console.log('Response:',response);
        return response.json(); 
    })
    .catch(err => console.log(err));
}

export const createIdea = (idea,userId) => {
    return fetch(`${API}/create/idea/${userId}`, {
        method: "POST",
        headers:{
            Accept: 'application/json',
            "Content-Type" : 'application/json'
        },
        body: JSON.stringify(idea)
    })
    .then(response => {
        console.log('Response:',response);
        return response.json(); 
    })
    .catch(err => console.log(err));
}

export const giveRating = (userId,ideaId,rate) => {
    return fetch(`${API}/rate/${ideaId}/${userId}`, {
        mode:'cors',
        method: "PUT",
        headers:{
            Accept: 'application/json',
            "Content-Type" : 'application/json'
        },
        body: rate
    })
    .then(response => response.json())
    .catch(err => console.log(err));
}

export const getBestIdea = () => {
    return fetch(`${API}/idea/best`,{
        mode:'cors',
        method:"GET"
    })
    .then(response => {
        return response.json(); 
    })
    .catch(err => console.log(err))
}

export const getAllIdea = () => {
    return fetch(`${API}/all/idea`,{
        mode:'cors',
        method:"GET"
    })
    .then(response => {
        return response.json(); 
    })
    .catch(err => console.log(err))
}

export const createVenue = venue => {
    return fetch(`${API}/create/venue`, {
        method: "POST",
        headers:{
            Accept: 'application/json',
            "Content-Type" : 'application/json'
        },
        body: JSON.stringify(venue)
    })
    .then(response => {
        return response.json(); 
    })
    .catch(err => console.log(err));
}

export const createSpeaker = speaker => {
    console.log("here atleast")
    console.log(speaker.entries())
    for (var pair of speaker.entries()) {
        console.log(pair[0]+ ', ' + pair[1]); 
    }
    return fetch(`${API}/create/speaker`, {
        method: "POST",
        mode: "cors", 
        headers:{
            Accept: 'application/json'
        },
        body: speaker
    })
    .then(response => {
        return response.json(); 
    })
    .catch(err => console.log(err));
}

export const getSpeakerPicture = speakerId =>{
    return fetch(`${API}/speaker/picture/${speakerId}`,{
        mode:'cors',
        method:"GET"
    })
    .then(response => {
        console.log(speakerId," received")
        return response; 
    })
    .catch(err => console.log(err))
}

export const getUserById = (userId) =>{
    return fetch(`${API}/user/${userId}`,{
        mode:'cors',
        method:"GET"
    })
    .then(response => {
    return response.json(); 
    })
    .catch(err => console.log(err))
}

export const editEvent = (event,id) => {
    for (var pair of event.entries()) {
        console.log(pair[0]+ ', ' + pair[1]); 
    }
    return fetch(`${API}/event/${id}`, {
        method: "PUT",
        headers:{
            Accept: 'application/json'
        },
        body: event
    })
    .then(response => {
        console.log('Response:',response);
        return response.json(); 
    })
    .catch(err => console.log(err));
}

export const editSpeaker = (speaker,id) => {
    console.log("here atleast")
    console.log(speaker.entries())
    for (var pair of speaker.entries()) {
        console.log(pair[0]+ ', ' + pair[1]); 
    }
    return fetch(`${API}/speaker/${id}`, {
        method: "PUT",
        mode: "cors", 
        headers:{
            Accept: 'application/json'
        },
        body: speaker
    })
    .then(response => {
        return response.json(); 
    })
    .catch(err => console.log(err));
}