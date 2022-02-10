const { build } = require('esbuild');
const { execSync } = require("child_process");
const notifier = require('node-notifier');

const inProd = process.env.NODE_ENV == 'production'

let typeCheckPlugin = {
  name: 'type checker',
  setup(build) {
    build.onStart(() => {
      try {
        execSync('tsc')
      } catch (err){
        const msg = `${err.message.trim()}: ${err.stdout.toString()}`;
        notifier.notify(msg);
      }
    })
  },
}

const plugins = inProd ? [] : [typeCheckPlugin]

const promises = []
const components = ['rss-embed']

for (const component of components) {
  const input = `./src/components/${component}/index.js`
  const output = `./dist/${component}.js`
  promises.push(build({
    plugins: plugins,
    entryPoints: [input],
    outfile: output,
    bundle: true,
    logLevel: 'info',
    sourcemap: inProd,
    minify: inProd,
    watch: !inProd 
  }))
}

Promise.all(promises).catch(() => process.exit(1));
