import { observable, action } from 'mobx';

class Test {
  @observable onOff = false;
  @action changeOnOff() {
    this.onOff = !this.onOff;
  }
}

const test = new Test();

export default test;
