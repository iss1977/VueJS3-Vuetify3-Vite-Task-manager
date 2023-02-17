import { createApp } from 'vue'
import App from './App.vue'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  icons: {
      defaultSet: 'mdi',
  },
  components,
  directives,
})

import router from './router'



const app = createApp(App)

app.use(vuetify)

app.use(router)

app.mount('#app')
