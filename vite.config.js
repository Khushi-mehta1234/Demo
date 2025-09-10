// vite.config.js
export default {
  server: {
    proxy: {
      '/marksheet': {
        target: 'https://marksheet-harsh.onrender.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
};