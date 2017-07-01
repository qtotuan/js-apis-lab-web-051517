//define functions here
var createGist = function(file_name, content, description, token){
  let url = `https://api.github.com/gists`
  let data = {
    'public': true,
    'description': description,
    'files': {},
  }

  data['files'][file_name] = {
    'content': content
  }

  $.ajax({
    url: url,
    type: 'POST',
    dataType: 'JSON',
    headers: {
      Authorization: `token ${token}`
    },
    data: JSON.stringify(data)
  }).done( response => {
    myGists(response.owner.login, token)
  })
};


var myGists = function (username, token){
  let url = `https://api.github.com/users/${username}/gists`

  $.ajax({
    url: url,
    type: 'GET',
    dataType: 'JSONP',
    headers: {
      Authorization: `token ${token}`
    }
  }).done( results_object => {
    let count = 1
    results_object.data.forEach( gist => {
      let html = formatGists(gist, count)
      $(".results").append(html)
      count++
    })
  })
};

function formatGists(gist_hash, count) {
  let html = ""
  html += "<div>"
  html += `<h3>Gist #${count}: ${gist_hash.description}</h3>`
  html += `Created at: ${gist_hash.created_at}`
  html += `<p><a href="${gist_hash.html_url}">Show Gist</a></p></br>`
  html += "</div>"
  return html
}

var bindCreateButton = function() {
  // call functions here
  $("#button-show").on('click', e => {
    let filename = $("#filename").val()
    let content = $("#content").val()
    let description = $("#description").val()
    let token = $("#token").val()
    console.log(filename);
    console.log(content);
    console.log(description);
    console.log(token);
    createGist(filename, content, description, token)
  })
};

$(document).ready(function(){
  bindCreateButton()
});
