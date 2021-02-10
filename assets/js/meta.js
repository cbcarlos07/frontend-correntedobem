const socket = io('http://localhost:3006')


socket.on('meta', msg => {  
	searchData()
})


$(()=>{
    searchData()
    loadMenu()
})

const loadMenu = () =>{
    $('#mobile-nav').html(
        `<ul class style="touch-action: pan-y;" id>
            <li class="menu-active"><a href="/">Voltar</a></li>
        </ul>`
    )
}
const searchData = () => {
    
    $.ajax({
        url: `${host}/site/meta`,
        type: 'get',
        dataType: 'json'
    }).then(response => {
        let dados = response[0]
        
        $('.description').html( `${dados.description}` )
        
        if( dados.logo )
            $('.logo').html(`<img src="${host}/foto/${dados.logo}" class="img-fluid">`)
        if( dados.image )
            $('.img').html(`<img src="${host}/foto/${dados.image}" class="img-fluid">`)
        
    })
}
