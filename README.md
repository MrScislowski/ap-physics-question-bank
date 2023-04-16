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