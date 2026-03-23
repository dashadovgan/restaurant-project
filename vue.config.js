const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/restaurant-project/'  // <-- обязательно имя репозитория
})
