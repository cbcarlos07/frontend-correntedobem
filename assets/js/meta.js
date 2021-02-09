const socket = io('http://localhost:3006')


socket.on('meta', msg => {  
	searchData()
})





$(()=>{
    searchData()
})
const searchData = () => {
    
    $.ajax({
        url: `${host}/site/meta`,
        type: 'get',
        dataType: 'json'
    }).then(response => {
        let dados = response[0]
        
        $('.description').html( `${dados.description}` )
        
        if( dados.logo )
            $('.logo').html(`<img src="${host}/foto/${dados.logo}">`)
        if( dados.image )
            $('.img').html(`<img src="${host}/foto/${dados.image}">`)
        
    })
}
