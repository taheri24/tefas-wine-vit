import { createWebHashHistory } from 'vue-router';
import { ViteSSG } from 'vite-ssg'
import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'layouts-generated'
import App from './App.vue'
import './styles/main.module.scss'
  
const routes = setupLayouts(generatedRoutes)
// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(
  App,
  { routes ,history:createWebHashHistory()},
  (ctx) => {
    // install all modules under `modules/`
     Object.values(import.meta.globEager('./modules/*.ts')).map(i => i.install?.(ctx))
  },
)
