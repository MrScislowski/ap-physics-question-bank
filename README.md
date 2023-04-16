For environments using Node, the easiest way to handle this would be to install serve and let it handle the rest:
```
npm install -g serve
serve -s build
```
The last command shown above will serve your static site on the port 3000. Like many of serve’s internal settings, the port can be adjusted using the -l or --listen flags:
```
serve -s build -l 4000
```
Run this command to get a full list of the options available:
```
serve -h
```

Was following this guide to try to deploy: https://stackabuse.com/how-to-deploy-a-react-app-to-heroku/
* heroku create -a ap-physics-question-bank
* heroku git:remote -a ap-physics-question-bank
* heroku buildpacks:set mars/create-react-app
But this last command generated the following: 

  ```
  Error: Cannot find module '@heroku/buildpack-registry'
  Require stack:
  - C:/Users/13167/AppData/Roaming/npm/node_modules/heroku/node_modules/@heroku-cli/plugin-buildpacks/lib/buildpacks.js
  - C:/Users/13167/AppData/Roaming/npm/node_modules/heroku/node_modules/@heroku-cli/plugin-buildpacks/lib/commands/buildpacks/set.js
  - C:/Users/13167/AppData/Roaming/npm/node_modules/heroku/node_modules/@oclif/config/lib/plugin.js
  - C:/Users/13167/AppData/Roaming/npm/node_modules/heroku/node_modules/@oclif/config/lib/config.js
  - C:/Users/13167/AppData/Roaming/npm/node_modules/heroku/node_modules/@oclif/config/lib/index.js
  - C:/Users/13167/AppData/Roaming/npm/node_modules/heroku/node_modules/@oclif/command/lib/command.js
  - C:/Users/13167/AppData/Roaming/npm/node_modules/heroku/node_modules/@oclif/command/lib/index.js
  - C:/Users/13167/AppData/Roaming/npm/node_modules/heroku/bin/run
      at Function.Module._resolveFilename (node:internal/modules/cjs/loader:933:15)
      at Function.Module._load (node:internal/modules/cjs/loader:778:27)
      at Module.require (node:internal/modules/cjs/loader:1005:19)
      at require (node:internal/modules/cjs/helpers:102:18)
      at Object.<anonymous> (C:/Users/13167/AppData/Roaming/npm/node_modules/heroku/node_modules/@heroku-cli/plugin-buildpacks/lib/buildpacks.js:4:30)
      at Module._compile (node:internal/modules/cjs/loader:1101:14)
      at Object.Module._extensions..js (node:internal/modules/cjs/loader:1153:10)
      at Module.load (node:internal/modules/cjs/loader:981:32)
      at Function.Module._load (node:internal/modules/cjs/loader:822:12)
      at Module.require (node:internal/modules/cjs/loader:1005:19)
  ```

* npm update -g heroku
* heroku buildpacks:set mars/create-react-app
(worked this time... must've been outdated version of heroku)
* git push heroku main
Gave errors:
```
  remote: =====> Downloading Buildpack: https://github.com/mars/create-react-app-inner-buildpack.git#v9.0.0
  remote: =====> Detected Framework: React.js (create-react-app)
  remote:        Writing `static.json` to support create-react-app
  remote:        Enabling runtime environment variables
  remote: =====> Downloading Buildpack: https://github.com/heroku/heroku-buildpack-static.git#21c1f5175186b70cf247384fd0bf922504b419be
  remote: =====> Detected Framework: Static HTML
  remote: Stack heroku-22 is not supported!
  remote:  !     Push rejected, failed to compile React.js (create-react-app) multi app.
  remote:
  remote:  !     Push failed
  remote: Verifying deploy...
  remote:
  remote: !       Push rejected to ap-physics-question-bank.
  remote:
  To https://git.heroku.com/ap-physics-question-bank.git
  ! [remote rejected] main -> main (pre-receive hook declined)
  error: failed to push some refs to 'https://git.heroku.com/ap-physics-question-bank.git'
```

Trying this blog's solution: https://medium.com/captainme-ai/deploying-migrating-static-create-react-app-project-to-heroku-22-stack-b19a4255ea7c

* npm install express