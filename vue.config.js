module.exports = {
  parallel: false,
  devServer: {
    host: '127.0.0.1',
    proxy: {
      '/api': {
        target: process.env.API_PROXY_TARGET || 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
};
