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

async function renderizarTodosOsPosts() {
    const local = localStorage.getItem('categoria')
    const localParse = JSON.parse(local)
    const posts = await pegarDadosDaAPI()
    const mainPost = document.querySelector('.main-posts')

    if (localParse == null || localParse == "Todos") {

        posts.forEach((objeto) => {
            mainPost.insertAdjacentHTML('beforeend', `
            <div class="post" >
                <img src=${objeto.image} alt="post" class="img-post">
                <div class="textos-post">
                    <h2 class="texto-post-principal">${objeto.title}</h2>
                    <p class="texto-post-secundario">${objeto.description}</p>
                    <button type="button" id="${objeto.id}" class="acessar-conteudo">Acessar conteúdo</button>
                </div>
            </div>
            `)
        })
        acessarConteudo()

    } else {


        const postsSelecionados = posts.filter((post) => {
            return post.category == localParse
        })
        console.log(postsSelecionados)

        mainPost.innerHTML = ""
        postsSelecionados.forEach((objeto) => {
            mainPost.insertAdjacentHTML('beforeend', `
            <div class="post" >
                <img src=${objeto.image} alt="post" class="img-post">
                <div class="textos-post">
                    <h2 class="texto-post-principal">${objeto.title}</h2>
                    <p class="texto-post-secundario">${objeto.description}</p>
                    <button type="button" id="${objeto.id}" class="acessar-conteudo">Acessar conteúdo</button>
                </div>
            </div>
            `)
        })

        const acessarConteudoBotao = document.querySelectorAll('.acessar-conteudo')
        console.log(acessarConteudoBotao)
        acessarConteudoBotao.forEach((botao) => {
            botao.addEventListener('click', async function () {

                const post = postsSelecionados.find((post) => post.id == botao.id)
                const postString = JSON.stringify(post)
                localStorage.setItem('post', postString)
                window.location.href = "/livingbase/pages/post/index.html"
            })
        })

    }




}
renderizarTodosOsPosts()

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



}
renderizarCategorias()


async function eventoNoBotaoCategoria() {
    const posts = await pegarDadosDaAPI()
    const botaoCategoria = document.querySelectorAll('.button-grey.nav')
    console.log(botaoCategoria)
    console.log(posts)

    botaoCategoria.forEach((botao) => {

        botao.addEventListener('click', async function () {
            const mainPost = document.querySelector('.main-posts')

            if (botao.id == 'Todos') {
                botao.classList.toggle('button-green')
                const categoria2 = botao.id
                const categoriaJSON2 = JSON.stringify(categoria2)
                localStorage.setItem('categoria', categoriaJSON2)
                mainPost.innerHTML = ""
                renderizarTodosOsPosts()
                acessarConteudo()
            }
            else {
                botao.classList.toggle('button-green')
                const categoria = botao.id
                const categoriaJSON = JSON.stringify(categoria)
                localStorage.setItem('categoria', categoriaJSON)

                const postsSelecionados = posts.filter((post) => {
                    return post.category == botao.id
                })
                console.log(postsSelecionados)

                mainPost.innerHTML = ""
                postsSelecionados.forEach((objeto) => {
                    mainPost.insertAdjacentHTML('beforeend', `
                    <div class="post" >
                        <img src=${objeto.image} alt="post" class="img-post">
                        <div class="textos-post">
                            <h2 class="texto-post-principal">${objeto.title}</h2>
                            <p class="texto-post-secundario">${objeto.description}</p>
                            <button type="button" id="${objeto.id}" class="acessar-conteudo">Acessar conteúdo</button>
                        </div>
                    </div>
                    `)
                })
                const acessarConteudoBotao = document.querySelectorAll('.acessar-conteudo')
                console.log(acessarConteudoBotao)
                acessarConteudoBotao.forEach((botao) => {
                    botao.addEventListener('click', async function () {
        
                        const post = postsSelecionados.find((post) => post.id == botao.id)
                        console.log(post)
                        const postString = JSON.stringify(post)
                        localStorage.setItem('post', postString)
                        window.location.href = "/livingbase/pages/post/index.html"
                    })
                })
            }
        })
    })

}
eventoNoBotaoCategoria()
async function acessarConteudo() {
    const posts = await pegarDadosDaAPI()
    const acessarConteudoBotao = document.querySelectorAll('.acessar-conteudo')
    console.log(acessarConteudoBotao)
    acessarConteudoBotao.forEach((botao) => {
        botao.addEventListener('click', async function () {

            const post = posts.find((post) => post.id == botao.id)
            const postString = JSON.stringify(post)
            localStorage.setItem('post', postString)
            window.location.href = "/livingbase/pages/post/index.html"
        })
    })
}
acessarConteudo()  