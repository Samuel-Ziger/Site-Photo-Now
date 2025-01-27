import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    specPattern: 'cypress/e2e/**/*.{cy,e2e}.{js,jsx,ts,tsx}',
    baseUrl: 'http://localhost:5174',
  },
  component: {
    specPattern: 'src/**/__tests__/*.{cy,e2e}.{js,ts,jsx,tsx}',
    devServer: {
      framework: 'vue',
      bundler: 'vite',
    },
  },
})
