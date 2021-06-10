/*Issua             dd/mm/yy  Technical approach

*BZ0002            032521     Install next-images  for project
*BZ0003            032521     Install SASS  for project

***************************************************/
/* Begin BZ0002*/
const withImage = require('next-images');
module.exports=withImage();
/* END BZ0002*/
const path = require('path');

/* Begin BZ0003*/
module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}
/* END BZ0003*/
module.exports = {
    pageExtensions: ['mdx', 'jsx', 'js', 'ts', 'tsx'],
  }
  module.exports = {
    // Uncomment the line below to enable basePath, pages and
    // redirects will then have a path prefix (`/app` in this case)
    //
    // basePath: '/app',
  
    async redirects() {
      return [
        {
          source: '/adminPages',
          destination: '/components/homePages/adminPages',
          permanent: false,
        },
        {
          source: '/index',
          destination: '/',
          permanent: true,
        },
      ]
    },
  }
  