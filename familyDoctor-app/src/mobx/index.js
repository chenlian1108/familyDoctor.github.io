





//  mobx 观察者模式  发布订阅 

// observable 可被观察的数据 数据改变 指向 订阅事件 
import {observable, action, computed, autorun} from "mobx";

class LoginState{
    @observable loginflag = "aaaaaa"; 
    
    @action changeMsg = nfevalue =>{
        this.loginflag = nfevalue;
    }


    /*
    @computed get newCount(){
        return this.count + 2000;
    }
    */
}

export default new LoginState();
