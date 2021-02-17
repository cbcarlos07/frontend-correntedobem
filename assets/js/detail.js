const socket = io(host)


socket.on('posts', msg => {  
	searchData()
})
socket.on('equipe', msg => {  
	searchData()
})
socket.on('foto', msg => {  
	loadPicture()
})

socket.on('tema', msg => {  
	theme()
})

const searchParams = new URLSearchParams(window.location.search)
let param = searchParams.get( 'id' )
$(()=>{
    searchData()
    loadMenu()
    loadPicture()
    sizeScreen()
    theme()
})
const searchData = () => {
    
    
    $.ajax({
        url: `${host}/site/area/${param}`,
        type: 'get',
        dataType: 'json'
    }).then(response => {
    
        $('.title').html( `${response.title}` )
        
        $('.description').html( `${response.description}` ).css({'padding-top': '20px'})
        
        if( response.logo )
            $('.img').html(`<img src="${host}/foto/${response.logo}" class="img-fluid" width="200">`)
        team( response.id )
    })
}

const team = id => {
    $.ajax({
        url: `${host}/site/equipe/${id}`,
        type: 'get',
        dataType: 'json'
    }).then(response => {
        
        let item = ''
        response.forEach(element => {
            let team = ''
            

            if( element.team ){
                
                
                element.team.forEach(t => {
                    team += `
                        <li>${t.name}</li>
                    `
                })
                
                item += `<li>
                            <strong>${element.name}</strong>
                            <ul style="list-style-type:none;">
                               ${team}
                            </ul>
                        </li>`
            }else{
                item += `<li>${element.name}</li>`
            }
            
        });
        if( response.length > 0 ){
            $('.line').addClass('v1')
            $('.equipe').html('<strong>Equipe</strong>')
            $('.equipe').append( item )
        }
    })
}

const loadMenu = () =>{
    $('#mobile-nav').html(
        `<ul class style="touch-action: pan-y;" id>
            <li class="menu-active"><a href="/">Voltar</a></li>
        </ul>`
    )
}

const loadPicture = () => {
    $.ajax({
        url: `${host}/site/foto/${param}`,
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
                        <div class="pic">
                            <img class="img img-fluid" src="${host}/foto/${e.foto}" alt="" width="650">
                        </div>
                        <h4>${e.title}</h4>
                        <span>${e.subtitle}</span>                        
                    </div>
                </div>`
            })
        }
        fotos.html( items )
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

const sizeScreen = () => {
    var w = document.documentElement.clientWidth;
    var h = document.documentElement.clientHeight;
    //575 323
    //console.log("Your screen resolution is: " + w + "x" + h);
    if( (w < 575) || (w == 375) ){
        $('.vertical-line').css({display: 'none'})
        $('#mobile-nav-toggle').html('')
    }else{
        $('.vertical-line').css({display: 'block'})
    }    
    
}

window.onresize = sizeScreen