const socket = io(host)


socket.on('quem', msg => {  
	searchData()
})

socket.on('tema', msg => {  
	theme()
})

socket.on('quemsomosfotos', msg => {  
	loadPicture()
})

$(()=>{
    searchData()
    loadMenu()
    theme()
	loadPicture()
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
            $('.img').html(`<img src="${aws}/${dados.image}" class="img-fluid" width="100">`)
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


const loadPicture = () => {
	console.log('loadPicture');
    $.ajax({
        url: `${host}/site/quem-somos-fotos`,
        type: 'get',
        dataType: 'json'
    }).then(response => {
        const fotos = $('.fotos')
        fotos.html('')
        let items = ''
        if(response.length > 0){
            response.forEach(e => {
                items += `
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div class="member" data-aos="fade-up" data-aos-delay="100">
                        <div class="pic text-center">
                            <img class="img img-fluid" src="${aws}/${e.photo}" alt="" style="max-height: 600px; max-width: 1000px;" >
                        </div>
                        <p class="text-center"><strong>${e.title}</strong></p>                        
                        <p class="text-center">${e.subtitle}</p>
                    </div>
                </div>`
            })
        }
        fotos.html( items )
    })

    
}
