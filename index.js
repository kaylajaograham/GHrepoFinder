'use strict'

// watch the form for submissions -> get repositories
function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        getRepos();
    });
}

/* to get repos... clear existing search results 
grab user's input value and enter that within GH endpoint

fetch user's api endpoint -> if okay return in JSON, if not throw error
*/

function getRepos() {
    $('#search-results').empty();
    const userInput = $('.js-user').val();
    const baseUrl = 'https://api.github.com/users/';
    const url = baseUrl + userInput + '/repos';
    console.log(url);
    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error();
        })
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
            $('.error-message').text(`Something went wrong.Try again.`);
        });
}

/* after we have the repos from the user's api endpoint, show the results
loop through user's repos
append html to search-results section to display user repo title and link to repo
make link clickable in new tab
show the hidden class and call watchform
*/

function displayResults(responseJson) {
    $('#search-results').empty();
    const userInput = $('.js-user').val();

    for (let i = 0; i < responseJson.length; i++) {
        $('#search-results').append(
            `<h3>${responseJson[i].name}</h3>
      <a href='${responseJson[i].html_url}' target='_blank'>${responseJson[i].html_url}</a>`
        )
    };
    $('#search-results').removeClass('hidden');
};

$(watchForm);