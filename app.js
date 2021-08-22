const url = "https://api.jikan.moe/v3/search/anime?q="

//let anime = "Naruto"

const submit = document.querySelector('#submit');
const input = document.querySelector('#input')

submit.addEventListener('click',getInfo)

function getInfo(event){
    event.preventDefault();
    const anime = input.value
    let search ="";
    search = url + anime

    fetch(search)
    .then(res => res.json())
    .then(update)
    .catch(err => console.log(err))
}

function update(data){
    console.log(data)
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
            const filtered = results[key].filter(anime =>{
                const title = anime.title.toLowerCase()
                const word = input.value.toLowerCase()
                return title.includes(word)
            })
            const animesHTML = filtered
            .sort((a,b)=>a.episodes-b.episodes)
            .map(anime=>{
                return `
                    <anime-card
                    img_src="${anime.image_url}"
                    title_anime="${anime.title}"
                    airing="${anime.start_date}"
                    scoring="${anime.score}"
                    link="${anime.url}"
                    description="${anime.synopsis}"
                   ></anime-card>
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




