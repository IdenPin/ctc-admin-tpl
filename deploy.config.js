module.exports = {
  projectName: 'ctc-admin-tpl',
  dev: {
    name: '正式环境',
    script: 'npm run build',
    host: '192.168.3.213',
    port: 22,
    username: 'root',
    password: '123.com',
    distPath: 'dist',
    webDir: '/home/applications/web/tomcat-web/webapps/test'
  },
  test: {
    name: '测试环境',
    script: 'npm run build',
    host: '192.168.3.213',
    port: 22,
    username: 'root',
    password: '123.com',
    distPath: 'dist',
    webDir: '/home/applications/web/tomcat-web/webapps/test'
  }
}
