const searchForm= document.getElementById('github-form')
let userSection = document.getElementById('user-list')
let container = document.getElementById('github-container')
let repoSearchList = document.getElementById('repo-list')

searchForm.addEventListener('submit', function(e){
    console.log(e.submitter.value)
    e.preventDefault()
    if(e.submitter.value == "Search For Repo"){
        let input = e.target.elements[0].value.toLowerCase().split(" ").join("+")
        fetch(`https://api.github.com/search/repositories?q=${input}`).then(function(resp){
            return resp.json()
        }).then(function(json){
            let repos = json.items
            repos.forEach(function(repo){
                repoSearchList.innerHTML += `<br><li><a href="${repo.url}">${repo.name}</a><br></li><br>`
            })
        })
    }else {
    fetch(`https://api.github.com/search/users?q=${e.target.elements[0].value}`).then(function(resp){
       return resp.json()
    }).then(function(json){
        let searchResults = json.items
        searchResults.forEach(function(user){
            userSection.innerHTML += `<li>
            <img data-user="${user.login}" src="${user.avatar_url}" alt="Profile pic" width="100" height="100">
            <h3>Username: ${user.login}</h3>
            <a href="${user.html_url}">Profile</a>
            <div id="${user.login}-repos">
            </div>
            </li>`
        })
    })
}
})

container.addEventListener('click', function(e){
    fetch(`https://api.github.com/users/${e.target.dataset.user}/repos`).then(function(resp){
       return resp.json()
    }).then(function(json){
        let repos = json
        let div = document.getElementById(`${repos[0].owner.login}-repos`)
        json.forEach(function(repo){
            div.innerHTML += `<li>
            <h5>${repo.name}</h5>
            <p>Last Updated ${repo.updated_at}</p>
            <a href="${repo.html_url}">Take a look</a>
            </li>`
        

        })
    })
})

