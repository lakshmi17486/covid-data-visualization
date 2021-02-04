module.exports = {
    devServer: {
          proxy: {
              "/api": {
                  target: 'https://covidtracking.com',
                  "pathRewrite": { '^/api': ''},
                  changeOrigin:true,
                  "secure": false
              }
          } 
      },
  }