import { createApp } from 'vue'
import App from './App.vue'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const myCustomLightTheme = {
  dark: false,
  colors: {
    background: '#FFFFFF',
    surface: '#FFFFFF',
    primary: '#345c99',
    'primary-darken-1': '#213c66',
    secondary: '#258f85',
    'secondary-darken-1': '#134d47',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  }
}


const vuetify = createVuetify({
  icons: {
      defaultSet: 'mdi',
  },
  components,
  directives,
  theme: {
    defaultTheme: 'myCustomLightTheme',
    themes: {
      myCustomLightTheme,
    }
  }
})


import router from './router'



const app = createApp(App)

app.use(vuetify)

app.use(router)

app.mount('#app')
