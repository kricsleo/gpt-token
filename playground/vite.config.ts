import path from 'node:path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import { comlink } from 'vite-plugin-comlink'

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    Vue({
      script: {
        defineModel: true
      }
    }),
    comlink(),
    // https://github.com/antfu/unocss => unocss.config.ts
    Unocss(),
  ],
  worker: {
    plugins: [
      comlink()
    ]
  }
})
