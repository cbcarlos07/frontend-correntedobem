const socket = io(host)


socket.on('quem', msg => {  
	searchData()
})

socket.on('tema', msg => {  
	theme()
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
        url: `${host}/site/quem-somos`,
        type: 'get',
        dataType: 'json'
    }).then(response => {
        let dados = response[0]
        
        $('.description').html( `${dados.description}` ).css({'padding-top': '20px'})
        
        
        if( dados.image ){
            $('#mobile-nav-toggle').html('')
            $('.img').html(`<img src="${host}/foto/${dados.image}" class="img-fluid" width="100">`)

        }
        
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