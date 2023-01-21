/**
 * @type {import('@remix-run/dev/config').AppConfig}
 */
module.exports = {
  appDirectory: 'app',
  assetsBuildDirectory: 'public/build',
  publicPath: '/build/',
  serverBuildDirectory: 'build',
  devServerPort: 8002,
  ignoredRouteFiles: ['.*'],
  serverDependenciesToBundle: [
    /^rehype.*/,
    /^remark.*/,
    /^mdast.*/,
    /^hast.*/,
    /^unist.*/,
    /^micromark.*/,
    'mdx-bundler',
    'p-queue',
    'p-timeout',
    'lowlight',
    'fault',
    'ccount',
    'markdown-table'
  ],
}
