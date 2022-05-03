import React, { lazy } from 'react';
import { cloneDeep } from 'lodash-es';

/**
 *
 * interface IBase {
  meta: {
    icon?: ReactNode;
    name: string;
    key?: string;
  };
  path?: string;
  component?: ComponentType<any> | LazyExoticComponent<any>;
  menuType?: 'subMenu' | 'menuItem';
  children?: Array<IBase>;
  authority?: Array<string>;
}
 */

/**
 *
 *
 * export interface IConfigItem extends IBase {
  id: number;
  levelPath: Array<{ subMenuId?: number; name: string; path?: string }>;
}
 */

const config = [
  {
    path: '/video',
    menuType: 'subMenu',
    meta: { name: '物料库', icon: '' },
    children: [
      {
        path: '/segment/material',
        menuType: 'menuItem',
        component: lazy(() => import('pages/SegmentMaterial')),
        meta: { name: '片段素材库', icon: '', key: 'FRAGMENT_MANAGE' },
        children: [
          {
            path: '/segment/material/create',
            component: lazy(() => import('pages/SegmentMaterial/Detail')),
            meta: { name: '创建片段素材' }
          }
        ]
      }
    ]
  },
  {
    path: '/questionTools/AdVideoProcess',
    menuType: 'subMenu',
    meta: { name: '视频巡检', icon: '' },
    children: [
      {
        path: '/questionTools/AdVideoProcess',
        menuType: 'menuItem',
        component: lazy(() => import('pages/QuestionTools/AdVideoProcess')),
        meta: { name: '创意通投模板巡检', icon: '', key: 'FRAGMENT_MANAGE' },
        children: []
      },
      {
        path: '/questionTools/dpaFilmFiction',
        menuType: 'menuItem',
        component: lazy(() => import('pages/QuestionTools/DpaFilmFiction')),
        meta: { name: 'DPA模板巡检', icon: '', key: 'FRAGMENT_MANAGE' },
        children: []
      }
    ]
  }
];

const configFactory = (config) => {
  let id = 1;
  //深度优先打id, 记录节点path
  const helper = (cfg, levelPath = []) => {
    if (!cfg || typeof cfg !== 'object') {
      return cfg;
    }
    let result = {};
    let inArr = Array.isArray(cfg);

    if (inArr) {
      result = [];
    } else {
      if (!cfg.menuType) {
        levelPath.push({
          path: cfg.path,
          name: cfg.meta.name
        });
        result = {
          id,
          levelPath: levelPath.slice()
        };
      } else {
        levelPath.push({
          path: cfg.path || null,
          subMenuId: id,
          name: cfg.meta.name
        });
        result = {
          id,
          subMenuId: id,
          levelPath: levelPath.slice()
        };
      }
      id++;
    }
    for (let key in cfg) {
      if (key === 'component' || key === 'meta') {
        result[key] = cfg[key];
      } else {
        result[key] = helper(cfg[key], levelPath);
      }
    }
    if (!inArr) {
      levelPath.pop();
    }
    return result;
  };
  return helper(config);
};

const generateRoutes = (config) => {
  let result = [];
  if (config.length === 0) {
    return result;
  }
  for (let i = 0; i < config.length; i++) {
    let item = config[i];
    if (item.path && item.component) {
      result.push(item);
    }
    if (item.children && item.children.length !== 0) {
      result = result.concat(generateRoutes(item.children));
    }
    delete item.children;
  }
  return result;
};

const completedConfig = configFactory(config); // return IConfigItem[] 类型数据

console.log(completedConfig, 'completedConfig');

const routeList = generateRoutes(cloneDeep(completedConfig));

console.log(routeList, 'routeList');

export { routeList, completedConfig as config };
