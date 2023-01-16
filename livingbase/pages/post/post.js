async function renderizarPaginaPost() {
    const post = localStorage.getItem('post')
    const postParse = JSON.parse(post)
    console.log(postParse)
    const divSubHeader = document.querySelector('.sub-header')
    divSubHeader.insertAdjacentHTML('beforeend', `
        <h1 class="title">${postParse.title}</h1>
        <p class="subtitle">${postParse.description}</p>
   `)

    const mainPost = document.querySelector('.post-main')
    mainPost.insertAdjacentHTML('beforeend', `
    <img src=${postParse.image} alt="" class="img-main">
    <p class="text-post">${postParse.content}</p>
    `)

}
renderizarPaginaPost()
async function pegarDadosDaAPI() {
    const data = await fetch('https://m2-api-living.herokuapp.com/news?page=0')
    const dataJson = await data.json()
    const data1 = await fetch('https://m2-api-living.herokuapp.com/news?page=1')
    const data1Json = await data1.json()
    const data2 = await fetch('https://m2-api-living.herokuapp.com/news?page=2')
    const data2Json = await data2.json()

    const todosOsPost = [...dataJson.news, ...data1Json.news, ...data2Json.news]

    return todosOsPost
}
pegarDadosDaAPI()

async function selecionarCategorias() {
    const posts = await pegarDadosDaAPI()
    const postsCategoria = []
    posts.forEach((objeto) => {

        postsCategoria.push(objeto.category)
    })
    let categorias = []
    postsCategoria.forEach((objeto) => {
        if (categorias.find(tipo => tipo == objeto) == undefined) {
            categorias.push(objeto)
        }
    })


    return categorias

}
async function renderizarCategorias() {
    const categorias = await selecionarCategorias()
    console.log(categorias)
    const nav = document.querySelector('#nav-bar-1')
    categorias.forEach((categoria) => {
        nav.insertAdjacentHTML('beforeend', `
        <button class="button-grey nav" id="${categoria}">${categoria}</button>
        `)
    })
    const botaoCategoria = document.querySelectorAll('.button-grey.nav')

    return botaoCategoria
}
renderizarCategorias()


async function eventoNoBotaoCategoria() {
    const posts = await pegarDadosDaAPI()
    const botaoCategoria = document.querySelectorAll('.button-grey.nav')
    console.log(botaoCategoria)
    console.log(posts)

    botaoCategoria.forEach((botao) => {
        botao.addEventListener('click', async function () {

            const categoria = botao.id
            const categoriaJSON = JSON.stringify(categoria)
            localStorage.setItem('categoria', categoriaJSON)

            botao.classList.toggle('button-green')


        })
    })
}
eventoNoBotaoCategoria()