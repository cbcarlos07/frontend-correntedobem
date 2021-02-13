const socket = io(host)


socket.on('quem', msg => {  
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
        url: `${host}/site/quem-somos`,
        type: 'get',
        dataType: 'json'
    }).then(response => {
        let dados = response[0]
        
        $('.description').html( `${dados.description}` )
        
        
        if( dados.image ){
            $('#mobile-nav-toggle').html('')
            $('.img').html(`<img src="${host}/foto/${dados.image}" class="img-fluid" width="360">`)

        }
        
    })
}
