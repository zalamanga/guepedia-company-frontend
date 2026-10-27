import Echo from 'laravel-echo'
window.Pusher = require('pusher-js')

window.Echo = new Echo({
  authEndpoint: (process.env.VUE_APP_API_BASE_URL || 'http://localhost:8000') + '/broadcasting/auth',
  broadcaster: 'pusher',
  key: process.env.VUE_APP_PUSHER_KEY || '',
  cluster: process.env.VUE_APP_PUSHER_CLUSTER || '',
  forceTLS: false,
  encypted: true,
  auth: {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('admin_access_token'),
    },
  },
})

window.Echo.connector.pusher.config.auth.headers['Authorization'] = 'Bearer ' + localStorage.getItem('admin_access_token');
