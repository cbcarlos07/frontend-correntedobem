

const loadMenu = () => {
	$.ajax({
		url: `${host}/site/menu`,
		type: 'get',
		dataType: 'json'
	}).then(response => {
		$('.nav-menu').html('')
		var item = ''
		response.forEach( m =>{
			item += `<li>
						<a href="${m.url}">${m.name}</a>
			        </li>`
		} )
		console.log('item',item);
		
		$('.nav-menu').html( item )
		$('#mobile-nav').html(
			`<ul class style="touch-action: pan-y;" id>
				${item}
			</ul>`

		)
	})
	
}