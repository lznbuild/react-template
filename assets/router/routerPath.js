const paths = {
  modTypes: 'user',
  app: {
    root: '/',
    login: '/login'
  },
  modules: [
    {
      title: '项目模块1',
      path: '/mod1',
      name: 'mod1',
      children: [
        {
          title: '子模块1',
          path: '/mod1/sub1',
          name: 'sub1',
          icon: 'home'
        },
        {
          title: '子模块2',
          path: '/mod1/sub2',
          name: 'sub2',
          icon: 'area-chart'
        }
      ]
    },
    {
      title: '项目模块2',
      path: '/mod2',
      name: 'mod2',
      children: [
        {
          title: '子模块1',
          path: '/mod2/sub1',
          icon: 'home',
          children: [
            {
              title: '子子模块1',
              path: '/mod2/sub1/1',
              icon: 'home'
            },
            {
              title: '子子模块2',
              path: '/mod2/sub1/2',
              icon: 'home',
              children: [
                {
                  title: '子子模块11',
                  path: '/mod2/sub1/2/1',
                  icon: 'home'
                },
                {
                  title: '子子模块12',
                  path: '/mod2/sub1/2/2',
                  icon: 'home'
                }
              ]
            },
            {
              title: '子子模块3',
              path: '/mod2/sub1/3',
              icon: 'home'
            },
            {
              title: '子子模块4',
              path: '/mod2/sub1/4',
              icon: 'home'
            }
          ]
        },
        {
          title: '子模块2',
          path: '/mod2/sub2',
          icon: 'home'
        },
        {
          title: '子模块3',
          path: '/mod2/sub3',
          icon: 'home'
        }
      ]
    },
    {
      title: '项目模块3',
      path: '/mod3',
      name: 'mod3',
      icon: 'home'
    },
    {
      title: '项目模块4',
      path: '/mod4',
      name: 'mod4',
      icon: 'home'
    }
  ]
};

let routerPrefix = process.env.APP_PREFIX;
routerPrefix = routerPrefix.substring(0, routerPrefix.length - 1);

const initAppPaths = function(obj) {
  for (let key in obj) {
    if (obj[key] instanceof Object) {
      initAppPaths(obj[key]);
    } else {
      obj[key] = routerPrefix + obj[key];
    }
  }
};

const initModulesPaths = (obj) => {
  for (let key in obj) {
    if (obj[key] instanceof Object) {
      initModulesPaths(obj[key]);
    }
    if (obj[key].path) {
      obj[key].path = routerPrefix + obj[key].path;
    }
  }
};

const initPaths = (obj) => {
  initAppPaths(obj['app']);
  initModulesPaths(obj['modules']);
};

initPaths(paths);

export default paths;
