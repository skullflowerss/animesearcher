const url = "https://api.jikan.moe/v3/search/anime?q="
const limit = "&limit="

//let anime = "Naruto"

const submit = document.querySelector('#submit');
const input = document.querySelector('#input')

submit.addEventListener('click',getInfo)

function getInfo(event){
    event.preventDefault();
    const anime = input.value
    const limit_y = document.getElementById('yes').checked
    let search ="";
    if(limit_y){
        const limitNum = document.getElementById('limit-search').value
        search = url + anime + limit + limitNum
    }else{
        search = url + anime
    }
    console.log(search)
    fetch(search)
    .then(res => res.json())
    .then(update)
    .catch(err => console.log(err))
}

function update(data){
    let results = data.results
    .reduce((acc, anime)=>{

        const {type} = anime;
        if(acc[type] === undefined) acc[type] = [];
        acc[type].push(anime);
        return acc;

    }, {});

    console.log(results)

    const displayResults = document.getElementById('results')

    displayResults.innerHTML = Object.keys(results).map(key=>{

            const animesHTML = results[key]
            .sort((a,b)=>a.episodes-b.episodes)
            .map(anime=>{
                return `
                    <div class="anime-card">
                        <div class="anime-image">
                        <a href="${anime.url}" target="_blank"><img src="${anime.image_url}"></a>
                        </div>
                        <div class="anime-content">
                            <h1 class="anime-title">${anime.title}</h1>
                            <p>${anime.synopsis}</p>
                        </div>
                        <div class="anime-action">
                            
                        </div>
                    </div>
                `
            }).join("");


            return `
                <div class="container">
                    <h3>${key.toUpperCase()}</h3>
                    <div class="cards">${animesHTML}</div>
                </div>
            `
        }).join("");
    

}




