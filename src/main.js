import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router"
import Child from "./components/child.vue"
import Panel from "./components/panel.vue"
import TitleBar from "./components/titleBar.vue"

const app = createApp(App)

app.use(router)

app.mount("#app")

app
.component("Child", Child)
.component("Panel", Panel)
.component("TitleBar", TitleBar)
