import { Effect } from 'dva';
import { Reducer } from 'redux';


export interface TestModelType {
  namespace: string;
  state: {
      num:number,
  };
  effects: {
    fetch?: Effect;
    addNum:Effect;
    addNum2:Effect
  };
  reducers: {
    addNumber: Reducer;
  };
}


function waitsome(){
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      resolve()
    },1000)
  })
  
}

function waitsome2(){
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      resolve()
    },2000)
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
    },
    *addNum2(_,{call,put}){
      yield call(waitsome2)
      yield put({
        type: 'addNumber',
        payload:Math.random()
      })
    },
   

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
