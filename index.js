'use strict';

const searchURL = 'https://api.github.com';

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

function getRepo(query) {
    const params = {
        q: query,
        language: "en",
    };
    const queryString = formatQueryParams(params)
    const url = searchURL + '?' + queryString;

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
    //replace the existing image with the new one
    if (responseJson.status == 'success') {
        $('.results-img').replaceWith(
            `<img src="${responseJson.message}" class="results-img">`)
    }
    else if (responseJson.status == 'error') {
        console.log('Invalid breed.');
        $('.results-img').replaceWith(
            `<p class='results-img' >Invalid breed! Please try again.</p>`)
    }
    else {
        console.log('Unkown error');
        $('.results-img').replaceWith(
            `<p class='results-img' >Unknown error! Please try again.</p>`)
    }

    //display the results section
    $('.results').removeClass('hidden');
}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const searchTerm = $('.name').val();
        getRepo(searchTerm);
    });
}

$(function () {
    console.log('App loaded! Waiting for submit!');
    watchForm();
});