import axios from 'axios';
import React from 'react';
/*
Missing playlist api and create/update for beats and playlist.
Map will be changed to local storage for accessing jwt tokens.
need to export functions and possibly change callback onCompletion
*/
var tokenMap = new Map();

const url = 'https://brain-beats-server-docker.azurewebsites.net';


let onCompletion = (response, data = null) => {

    var status = (response.status == 200) ? 'success' : 'failure'

    ResultStatus = {
        status: status,
        statusCode: response.status,
        message: response.statusText
    }

    if (status == 'success') {
        console.log(`Printing Success Data`);
        console.log(data);
    }

    console.dir(ResultStatus, { depth: null });
}

function RequestLogin(userInfo) {
    axios.post(`${url}/api/user/login_user`,
        {
            email: userInfo.email,
            password: userInfo.password
        })
        .then((res) => {
            tokenMap.set('access_token', res.data.access_token);
            console.log(`access_data: ${res.data.access_token}`)
            onCompletion(res);
        })
        .catch(error => {
            onCompletion(error.response);
        })
}

// Requires JWT Access Token!!!
function ReadUser(userInfo) {
    axios.post(`${url}/api/user/read_user`,
        {
            email: userInfo.email
        },
        {
            headers: {
                'Authorization': `Bearer ${tokenMap.get('access_token')}`
            }
        })
        .then((res) => {
            onCompletion(res);
        })
        .catch(error => {
            onCompletion(error.response);
        })
}

/** Beat Api */
function GetAllBeats(userInfo) {
    axios.post(`${url}/api/beat/get_all_beats`,
        {
            email: userInfo.email
        },
        {
            headers: {
                'Authorization': `Bearer ${tokenMap.get('access_token')}`
            }
        })
        .then((res) => {
            var beats = [];
            res.data.forEach(vertex => {
                beats.push({
                    "email": userInfo.email,
                    "id": vertex.id,
                    "isPrivate": vertex.properties.isPrivate[0].value,
                    "instrumentList": vertex.properties.instrumentList[0].value,
                    "attributes": vertex.properties.attributes[0].value,
                    "duration": vertex.properties.duration[0].value,
                    "name": vertex.properties.name[0].value,
                    "image": vertex.properties.image[0].value,
                    "audio": vertex.properties.audio[0].value
                });
            })
            onCompletion(res, beats);
        })
        .catch(error => {
            onCompletion(error.response);
        })
}


function ReadBeat(userInfo, beatId) {
    axios.post(`${url}/api/beat/read_beat`,
        {
            email: userInfo.email,
            id: beatId
        },
        {
            headers: {
                'Authorization': `Bearer ${tokenMap.get('access_token')}`
            }
        })
        .then((res) => {
            let beat = null;
            res.data.forEach(vertex => {
                beat = {
                    "email": userInfo.email,
                    "id": vertex.id,
                    "isPrivate": vertex.properties.isPrivate[0].value,
                    "instrumentList": vertex.properties.instrumentList[0].value,
                    "attributes": vertex.properties.attributes[0].value,
                    "duration": vertex.properties.duration[0].value,
                    "name": vertex.properties.name[0].value,
                    "image": vertex.properties.image[0].value,
                    "audio": vertex.properties.audio[0].value
                }
            })
            onCompletion(res, beat);
        })
        .catch(error => {
            onCompletion(error.response);
        })
}

function SearchBeat(userInfo, query) {
    axios.post(`${url}/api/beat/search_beat`,
        {
            email: userInfo.email,
            name: query
        },
        {
            headers: {
                Authorization: `Bearer ${tokenMap.get('access_token')}`
            }
        })
        .then((res) => {
            let beats = [];
            res.data.forEach(vertex => {
                beats.push({
                    "email": userInfo.email,
                    "id": vertex.id,
                    "isPrivate": vertex.properties.isPrivate[0].value,
                    "instrumentList": vertex.properties.instrumentList[0].value,
                    "attributes": vertex.properties.attributes[0].value,
                    "duration": vertex.properties.duration[0].value,
                    "name": vertex.properties.name[0].value,
                    "image": vertex.properties.image[0].value,
                    "audio": vertex.properties.audio[0].value
                });
            })
            onCompletion(res, beats);
        })
        .catch(error => {
            onCompletion(error.response);
        })
}

function DeleteBeat(userInfo, beatId) {
    axios.post(`${url}/api/beat/delete_beat`,
        {
            email: userInfo.email,
            beatId: beatId
        },
        {
            headers: {
                'Authorization': `Bearer ${tokenMap.get('access_token')}`
            }
        })
        .then((res) => {
            onCompletion(res);
        })
        .catch(error => {
            onCompletion(error.response);
        })
}

/** Sample Api */
function ReadSample(userInfo, sampleId) {
    axios.post(`${url}/api/sample/read_sample`,
        {
            email: userInfo.email,
            id: sampleId
        },
        {
            headers: {
                'Authorization': `Bearer  ${tokenMap.get('access_token')}`
            }
        })
        .then((res) => {
            let sample = null;
            res.data.forEach(vertex => {
                sample = {
                    "email": userInfo.email,
                    "id": vertex.id,
                    "isPrivate": vertex.properties.isPrivate[0].value,
                    "attributes": vertex.properties.attributes[0].value,
                    "name": vertex.properties.name[0].value,
                    "image": vertex.properties.image[0].value,
                    "audio": vertex.properties.audio[0].value
                }
            })
            onCompletion(res, sample);
        })
        .catch(error => {
            onCompletion(error.response);
        })
}

function SearchSample(userInfo, query) {
    axios.post(`${url}/api/sample/search_sample`,
        {
            email: userInfo.email,
            name: query
        },
        {
            headers: {
                'Authorization': `Bearer  ${tokenMap.get('access_token')}`
            }
        })
        .then((res) => {

        })
        .catch(error => {
            onCompletion(error.response);
        })
}

function GetAllSamples(userInfo) {
    axios.post(`${url}/api/sample/get_all_samples`,
        {
            'email': userInfo.email
        },
        {
            headers: {
                'Authorization': `Bearer  ${tokenMap.get('access_token')}`
            }
        })
        .then((res) => {
            let samples = [];
            res.data.forEach(vertex => {
                samples.push({
                    "email": userInfo.email,
                    "id": vertex.id,
                    "isPrivate": vertex.properties.isPrivate[0].value,
                    "attributes": vertex.properties.attributes[0].value,
                    "name": vertex.properties.name[0].value,
                    "image": vertex.properties.image[0].value,
                    "audio": vertex.properties.audio[0].value
                });
            });
            onCompletion(res, samples);
        })
        .catch(error => {
            onCompletion(error.response);
        })
}

function DeleteSample(userInfo, sampleId) {
    axios.post(`${url}/api/sample/delete_sample`,
        {
            email: userInfo.email,
            id: sampleId
        },
        {
            headers: {
                'Authorization': `Bearer  ${tokenMap.get('access_token')}`
            }
        })
        .then((res) => {
            onCompletion(res)
        })
        .catch(error => {
            onCompletion(error.response);
        })
}

/**PlayList Api */
function ReadPlaylist(userInfo, playlistId){
    axios.post(`${url}/api/playlist/read_playlist`,
    {
        email: userInfo.email,
        id: playlistId
    },
    {
        headers: {
            'Authorization': `Bearer  ${tokenMap.get('access_token')}`
        }
    })
    .then((res) => {
        let playlist = null;
        res.data.forEach(vertex => {
            playlistId = {
                "id" : vertex.id,
                "name": vertex.properties.name[0].value,
                "image" : vertex.properties.image[0].value,
                "isPrivate" : vertex.properties.isPrivate[0].value
            }
        })
        onCompletion(res)
    })
    .catch(error => {
        onCompletion(error.response);
    })
}