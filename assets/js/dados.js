const socket = io(host)


socket.on('posts', msg => {  
	loadPosts()
})
socket.on('menu', msg => {  
	loadMenu()
})
socket.on('tema', msg => {  
	theme()
})

socket.on('contato', msg => {  
	dadosContato()
})

socket.on('acoes', msg => {  
	acoes()
})

socket.on('acoes-item', msg => {  
	listaDeAcoes()
})
socket.on('parceiros', msg => {  
	parceiros()
})



$(()=>{
	theme()
	loadMenu()
	loadPosts()
	dadosContato()
	sizeScreen()
})




const loadPosts = () => {
	$.ajax({
		url: `${host}/site/area`,
		type: 'get',
		dataType: 'json'
	}).then(response => {
		let item = ''
		
		$('#main').html('')
		response.forEach(element => {
			let subarea = ''
			let logo = ''
			if( element.logo ){
				logo = `
				<div class="row">
					<div class="col-12">
						<div class="text-center">
							<img class="img img-fluid" src="${host}/foto/${element.logo}">
						</div>
					</div>
				</div>
				`
			}
			if( element.subarea ) {
				element.subarea.forEach(el => {
					let desc = el.short_text || `${el.description.slice(0,120)}...`
					subarea += `
					<div class="col-lg-4 col-md-6" data-aos="zoom-in">
						<div class="box">
							<div class="icon"><a href="detalhe.html?id=${el.id}"> 
								<img style="border-radius: 150%" src="${host}/foto/${el.icon}" width="50"> </a>
							</div>
							<h4 class="title"><a href="detalhe.html?id=${el.id}">${el.title}</a></h4>
							<p class="description">${desc}</p>
						</div>
					</div>`
					
				});
			}
			item += `
			<section id="${element.url}">
				<div class="container" data-aos="fade-up">
					<div class="row about-container">
						<div class="col-lg-12 content order-lg-1 order-2">
							<div class="section-header">
								<h3 class="section-title">${element.title}</h3>              
								<p class="section-description">${element.description}</p>
							</div>
							${logo}
							<div class="row">
								${subarea}
							</div>
						</div> 
						
						
					</div>
				
				</div>
			</section>
			`
		});

		item += `
		<section id="facts">
			<div class="container actions" data-aos="fade-up"></div>
		</section>
		`
		
		item += `
		<section id="facts">
			<div class="container values" data-aos="fade-up"></div>
		</section>
		`
		
		item += `
		<section id="contact">
			<div class="container">
				<div class="section-header">
					<h3 class="section-title">Contato</h3>
				</div>
			</div>
		
			<!-- Uncomment below if you wan to use dynamic maps -->
		
		
			<div class="container mt-5">
				<div class="row justify-content-center">
		
					<div class="col-lg-3 col-md-4">
		
						<div class="info">
							<div>
								<i class="fa fa-map-marker"></i>
								<p cl>A108 Adam Street<br>New York, NY 535022</p>
							</div>
		
							<div>
								<i class="fa fa-envelope"></i>
								<p>info@example.com</p>
							</div>
		
							<div>
								<i class="fa fa-phone"></i>
								<p>+1 5589 55488 55s</p>
							</div>
						</div>
		
						<div class="social-links">
							<a href="#" class="twitter"><i class="fa fa-twitter"></i></a>
							<a href="#" class="facebook"><i class="fa fa-facebook"></i></a>
							<a href="#" class="instagram"><i class="fa fa-instagram"></i></a>
							<a href="#" class="google-plus"><i class="fa fa-google-plus"></i></a>
							<a href="#" class="linkedin"><i class="fa fa-linkedin"></i></a>
						</div>
		
					</div>
		
					<div class="col-lg-5 col-md-8">
						<div class="form">
							<form  method="post" role="form" class="php-email-form" onsubmit="return sendMessage(event);">
								<div class="form-group">
									<input type="text" name="name" class="form-control" id="name" placeholder="Seu nome" data-rule="minlen:4" data-msg="Please enter at least 4 chars" />
									<div class="validate"></div>
									<span class="erroNome text-danger"></span>
								</div>

								<div class="form-group">
									<input type="email" class="form-control" name="email" id="email" placeholder="Seu Email" data-rule="email" data-msg="Please enter a valid email" />
									<div class="validate"></div>
									<span class="erroEmail text-danger"></span>
								</div>
					
								<div class="form-group">
									<textarea class="form-control" id="message" name="message" rows="5" data-rule="required" data-msg="Please write something for us" placeholder="Mensagem"></textarea>
									<div class="validate"></div>
									<span class="erroMessage text-danger"></span>
								</div>

								<div class="mb-3">
									<div class="loading">Loading</div>
									<div class="error-message"></div>
									<div class="sent-message text-red">Your message has been sent. Thank you!</div>
								</div>

								<div class="text-center"><button type="submit">Enviar mensagem</button></div>

							</form>
						</div>
					</div>
		
				</div>
		
			</div>
		</section>`

		item += `
		<section id="team" class="parceiro">
			<div class="container" data-aos="fade-up">
				<div class="section-header">
					<h3 class="section-title">Parceiros</h3>				
				</div>
				<div class="row parceiros">
					
				</div>	


			</div>
		</section><!-- End Team Section -->
		`
		
		$('#main').html( item )
		valores()
		redesSociais()
		dadosContato()
		acoes()
		parceiros()
	})
	
}

const parceiros = () => {
	$.ajax({
		url: `${host}/site/parceiros`,
		type: 'get',
		dataType: 'json'
	}).then(response => {
		let items = ''
		if( response.length > 0 ){
			$('.parceiro').css({display: 'block'})
			response.forEach(r => {
				items += `
				<div class="col-lg-3 col-md-6 col-xs-12 col-sm-12 ">
					<div class="member" data-aos="fade-up" data-aos-delay="100">
	
						<div class="pic"><img src="${host}/foto/${r.image}" alt="" width="150"></div>

					</div>
				</div>
				`
			})

		}else{
			$('.parceiro').css({display: 'none'})
		}

		$('.parceiros').html(items)
		
	})
}

const sendMessage = (e) => {
	e.preventDefault()
	const name = $('#name').val()
	const email = $('#email').val()
	const message = $('#message').val()
	
	if( name == '' || email ==  '' || !validationEmail(email) || message == ''){
		if( name == '' ){
			$('.erroNome').html('<strong>Por favor informe seu nome</strong>')
		}
		if( email == '' ){
			$('.erroEmail').html('<strong>Por favor informe seu e-amil</strong>')
		}
		if( !validationEmail( email ) ){
			$('.erroEmail').html('<strong>Por favor informe um e-amil válido</strong>')
		}

		if( message == '' ){
			$('.erroMessage').html('<strong>Por favor digite uma mensagem</strong>')
		}
	}else{
		$('.erroNome').html('')
		$('.erroEmail').html('')
		$('.erroMessage').html('')
		let param = {
			name,
			email,
			message
		}
		$.ajax({
			url: `${host}/site/email`,
			type: 'post',
			dataType: 'json',
			data: param
		}).then(response => {
			
			alert( 'Agradecemos seu contato' )
			$('#name').val('')
			$('#email').val('')
			$('#message').val('')
		})

	}
	
}

const validationEmail = email =>{
	const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const redesSociais = () => {
	$('.social-links').html('')
	$.ajax({
		url: `${host}/site/redes`,
		type: 'get',
		dataType: 'json'
	}).then(response=>{
		//<a href="#" class="twitter"><i class="fa fa-twitter"></i></a>
		$('.social-links').append('')
		let links = response.map( r =>{
			return $('<a>')
			.attr('href', r.url)
			.addClass( r.rede )
			.append( $('<i>').addClass(`fa fa-${r.rede}`) )
		})
		
		$('.social-links').append( links )
	})
}

const acoes = () => {

	const actions = $('.actions')
	actions.append('')
	$.ajax({
		url: `${host}/site/acoes`,
		dataType: 'json'
	}).then(response => {

		let dados = `
		<div class="section-header">
			<h3 class="section-title">${response[0].title}</h3>
			<p class="section-description">${response[0].description}</p>
		</div>

		<div class="row counters action-list">
		
		</div>
		`
		
		actions.html( dados )
		listaDeAcoes()
	})

}

const listaDeAcoes = () => {
	$.ajax({
		url: `${host}/site/acoes-item`,
		type: 'get',
		dataType: 'json'
	}).then(response => {
		let items = ''
		response.forEach(r => {
			items += `
				<div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 col-12 text-center">
					<span data-toggle="counter-up">${ r.value }</span>
					<p>${r.description}</p>
				</div>			
			`
		})
		$('.action-list').html( items )
	})
}

const dadosContato = () => {
	$.ajax({
		url: `${host}/site/contato`,
		type: 'get',
		dataType: 'json'
	}).then(response => {
		let data = response[0]		
		let dados = `
		<div>
			<i class="fa fa-map-marker"></i>
			<p>${data.endereco}</p>
		</div>

		<div>
			<i class="fa fa-envelope"></i>
			<p>${data.email}</p>
		</div>

		<div>
			<i class="fa fa-phone"></i>
			<p>${data.telefone}</p>
		</div>
		`
		$('.info').html('')
		$('.info').html( dados )
	})
}

const valores = () => {
	const values = $('.values')
	values.append('')
	$.ajax({
		url: `${host}/site/arrecadacao`,
		dataType: 'json'
	}).then(response => {
		let dados = `
		<div class="section-header">
			<h3 class="section-title">Transparência</h3>
			<p class="section-description">${response[0].description}</p>
		</div>

		<div class="row counters">
			<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 col-12 text-center">
				<span data-toggle="counter-up">R$ ${formatPrice( String( response[0].value ) )}</span>
				<p>Arrecadado</p>
			</div>
		
			<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 col-12 text-center">
				<span data-toggle="counter-up">R$ ${formatPrice( String( response[0].spent ) )}</span>
				<p>Despesa</p>
			</div>
		
		
		</div>
		`
		
		values.html( dados )
	})
}

const formatPrice = value =>{
	const val = Number(value.replace(",", "."));
	if (!val) return '0,00';
	const valueString = val.toFixed(2).replace(".", ",");
	return valueString.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

const theme = (option = 0) =>{
	$.ajax({
		url: `${host}/site/tema`,
		type: 'get',
		dataType: 'json'
	}).then(response => {
		let dados = response[0]
		
		$('.tema').text(dados.tema)
		$('.tema-description').text( dados.description )
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
    console.log("Your screen resolution is: " + w + "x" + h);
    if( (w < 575) || (w == 375) ){
        theme(1)
    }else{
        theme()
    }    
    
}

window.onresize = sizeScreen