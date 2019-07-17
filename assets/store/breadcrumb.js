import { action, computed, configure, observable } from 'mobx'

configure({ enforceActions: "observed" })

class Breadcrumb {
  //面包屑的数据
  @observable values = []

  @action setValue = (index, value) => {
    if(index===0){
      this.values.length = 0;
    }
    if (this.values.length === 0) {
      this.values[0] = value;
    } else if (this.values.length <= index) {
      this.values.push(value);
    } else {
      this.values[index] = value;
    }

  }

  @computed get getValues() {
    return this.values.slice();
  }
}

const breadcrumb = new Breadcrumb();

export default breadcrumb;
