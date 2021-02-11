const socket = io(host)


socket.on('posts', msg => {  
	searchData()
})
socket.on('equipe', msg => {  
	searchData()
})


const searchParams = new URLSearchParams(window.location.search)

$(()=>{
    searchData()
    loadMenu()
})
const searchData = () => {
    let param = searchParams.get( 'id' )
    
    $.ajax({
        url: `${host}/site/area/${param}`,
        type: 'get',
        dataType: 'json'
    }).then(response => {
    
        $('.title').html( `${response.title}` )
        
        $('.description').html( `${response.description}` )
        
        if( response.logo )
            $('.img').html(`<img src="${host}/foto/${response.logo}" class="img-fluid">`)
        team( response.id )
    })
}

const team = id => {
    $.ajax({
        url: `${host}/ste/equipe/${id}`,
        type: 'get',
        dataType: 'json'
    }).then(response => {
        
        let item = ''
        response.forEach(element => {
            let team = ''
            if(element.team){
                
                element.team.forEach(t => {
                    team += `
                        <li>${t.name}</li>
                    `
                })
            }

            if( element.team ){
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