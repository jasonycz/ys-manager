const process = require('process')

module.exports = shipit => {
  require('shipit-deploy')(shipit)

  const user = process.env.SHIPIT_USER

  shipit.initConfig({
    office: {
      servers: `root@101.201.198.27`
    }
  })

  const localBuildPath = 'dist/'
  const deployPath = '/data/apps/ysProject/public/'

  shipit.task('deploy', () => {
    shipit.local('gulp build')
    .then(() => {
      shipit.remoteCopy(
        `./${localBuildPath}`,
         deployPath
      )
    })
    .then(() => {
      shipit.log('DEPLOY SUCCESS')
    })
  })
}
