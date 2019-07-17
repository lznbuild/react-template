import routerPath from '../router/routerPath';
import dataJson from './json';
const authUtils = (function () {
  const tokenIdField = 'tokenId';
  let userInfo;
  let moduleRoles;
  return {
    setUserInfo: (data) => {
      sessionStorage.setItem(tokenIdField, data.tokenId);
      userInfo = data.userInfo;
    },
    getUserInfo: () => {
      return userInfo;
    },
    getTokenId: () => {
      return sessionStorage.getItem(tokenIdField);
    },
    setModuleRoles: (data) => {
      moduleRoles = data;
    },
    getModuleRoles: () => {
      return moduleRoles;
    },
    getModules: () => {
      //TODO
      if (moduleRoles) {

      }
      return null;
    },
    getChildren: () => {
      return null;
    }
  }
})();

export default authUtils;
