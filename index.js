'use strict';

const searchURL = 'https://api.github.com';

///users/:username/repos
function getRepo(username) {
    
    const queryString = `/users/${username}/repos`
    const url = searchURL + queryString;

    console.log(url);
/*
    const options = {
        headers: new Headers({
            "X-Api-Key": apiKey
        })
    };
*/
    fetch(url) //fetch(url, options
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });
}

function displayResults(responseJson) {
    console.log(responseJson);
    for (let i = 0; i < responseJson.length; i++) {
        $('.results-js').append(
        `<p class="result">${responseJson[i].name}</p>
        <a class="link result" href="${responseJson[i].html_url}">Go to repo!</a><br>`);
    }
    $('.results').removeClass('hidden');
}



function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const searchTerm = $('.name').val();
        getRepo(searchTerm);
        $('.results-js').html('');
    });
}

$(function () {
    console.log('App loaded! Waiting for submit!');
    watchForm();
});