module.exports = {
  apps : [{
    script: 'main.js',
    watch: '.'
  }],

  deploy : {
    production : {
      user : 'root',
      port : '22',
      host : '8.129.21.56',
      ref  : 'origin/master',
      repo : 'git@github.com:aaaaaaaaaaaahaohao/vuePress-blog.git',
      path : '/blog',
      'post-deploy' : 'npm install && npm run build && pm2 startOrRestart ecosystem.config.js --env production && git pull'
    }
  }
};
