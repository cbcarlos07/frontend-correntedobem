const socket = io(host)


socket.on('meta', msg => {  
	searchData()
})


$(()=>{
    searchData()
    loadMenu()
    theme()
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



const theme = (option = 0) =>{
	$.ajax({
		url: `${host}/site/tema`,
		type: 'get',
		dataType: 'json'
	}).then(response => {
		let dados = response[0]
		
		$('#logo').html(
			`
			<a href="/">
				<img src="${host}/foto/${dados.logo}" alt="">
			</a>
			`
		)
		if( option == 0 )
			$('#hero').css({background: `url(${host}/foto/${dados.image}) `})
		else{
			$('#hero').css({background: `url(${host}/foto/${dados.image_small}) `})
		}	
	})
}
