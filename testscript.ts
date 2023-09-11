const { exec } = require('child_process');
const { remote } = require('webdriverio');

const viteServer = exec('npx vite', { cwd: './path-to-your-project' });
setTimeout(async () => {
  const browser = await remote();
  await browser.url('/'); 
  await browser.deleteSession();
  viteServer.kill('SIGINT');
}, 10000); 
