import { observable, action, configure,runInAction } from 'mobx';
import loginApi from '../api/login';
configure({ enforceActions: 'observed' });

class MenuList {
  // 左侧展示隐藏
  @observable menuList = {};

  @action async getMenuList() {
        if(JSON.stringify(this.menuList) == '{}'){
          let params = {'modtypes':config.navRoutePath};
          let menuList = await loginApi.getModuleRoles(params)
            .then(res => {
              let data = res.data.data;
              let navData = {};
              for(let i =0;i<data.length;i++){
                navData[data[i].modType] = data[i].children;
              }
              if(data[0]){
                return navData;
              }else{
                return {};
              }
            });
          runInAction(() => {
            this.menuList = menuList;
          });
        }

  }
  @observable pages = ''
  @action changePages (params) {
    this.pages = params;
  }
}

const menuList = new MenuList();

export default menuList;
