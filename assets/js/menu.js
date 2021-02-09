

const loadMenu = () => {
	$.ajax({
		url: `${host}/site/menu`,
		type: 'get',
		dataType: 'json'
	}).then(response => {
		$('.nav-menu').html('')
		const item = response.map( m =>{
			return $('<li>')
			.append( $('<a>').attr('href',m.url).append( m.name ) )
		} )
		
		$('.nav-menu').html( item )
	})
	
}