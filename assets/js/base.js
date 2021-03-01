//const host = 'http://localhost:3006'
const host = 'https://immense-retreat-59380.herokuapp.com'
const api = `${host}/api/v1`
const aws = 'https://correntedobem.s3.amazonaws.com'
//const aws = 'https://correntedobem-dev.s3.amazonaws.com'

const userLang = navigator.language || navigator.userLanguage; 

const langArr = userLang.split('-')

const lang = langArr[0] == 'pt' ? '' : langArr[0]

console.log('lang',lang);


