import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from "path";

export default defineConfig({
  plugins: [react()],
  resolve:{
    alias:{
      '@':path.resolve(__dirname,'./src')
    }
  },
  base:'./',
  server:{
    host:'localhost',
    open:true,
    port:3000,
    proxy:{
      "/api":{
        target:"http://127.0.0.1:5000",
        changeOrigin:true,
        rewrite:path=>path.replace(/^\/api/, '')
      }
    }
  }
})
