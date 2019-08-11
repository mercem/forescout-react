let baseURL = 'http://192.168.1.32:3000/'

if(process.env.NODE_ENV === 'production')
  baseURL = 'https://forescout-server.herokuapp.com/'

export {baseURL};