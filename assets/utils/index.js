export const utils = {
  //处理menuList数据
  handleMenuList: (menuList) => {
    let menuListData = [];
    if (menuList) {
      for (let i = 0; i < menuList.length; i++) {
        let item = {
          key: menuList[i].meta.icon,
          item: menuList[i].modTitle
        }
        menuListData.push(item);
      }
    }
    return menuListData;
  },
  //默认展开部门树选中的第一项
  openFirstTree: (data) => {
    let group = {
      grpname: "",
      grpno: ""
    }
    if (data[0].children.length) {
      if (data[0].children[0].children.length) {
        if (data[0].children[0].children[0].length) {
          group.grpname = data[0].children[0].children[0].children[0].grpname;
          group.grpno = data[0].children[0].children[0].children[0].grpno;
        } else {
          group.grpname = data[0].children[0].children[0] ? data[0].children[0].children[0].grpname : '';
          group.grpno = data[0].children[0].children[0] ? data[0].children[0].children[0].grpno : '';
        }
      } else {
        group.grpname = data[0].children[0].grpname;
        group.grpno = data[0].children[0].grpno;
      }
    } else {
      group.grpname = data[0].grpname;
      group.grpno = data[0].grpno;
    }
    return group;
  },

  getQueryString: (search, name) => {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = search.substr(1).match(reg);
    if (r != null) {
      return decodeURI(r[2]);
    }
    return null;
  }
}
