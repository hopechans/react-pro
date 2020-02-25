import { Effect } from 'dva';
import { Reducer } from 'redux';


export interface TestModelType {
  namespace: string;
  state: {
      num:number
  };
  effects: {
    fetch?: Effect;
    addNum:Effect
  };
  reducers: {
    addNumber: Reducer<any>;
  };
}


function waitsome(){
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      resolve()
    },1000)
  })
  
}

const UserModel: TestModelType = {
  namespace: 'testModel',
  state: {
    num: 223,
  },

  effects: {
    *addNum(_,{call,put}){

      yield call(waitsome)

      yield put({
        type: 'addNumber',
        payload:Math.random()
      })
    }
    

  },

  reducers: {
    addNumber(state, action) {
      return {
        ...state,
        num: action.payload || {},
      };
    },

  },
};

export default UserModel;
