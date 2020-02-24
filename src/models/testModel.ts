import { Effect } from 'dva';
import { Reducer } from 'redux';


export interface TestModelType {
  namespace: string;
  state: {
      num:number
  };
  effects: {
    fetch?: Effect;
  };
  reducers: {
    addNumber: Reducer<any>;
  };
}

const UserModel: TestModelType = {
  namespace: 'testModel',
  state: {
    num: 223,
  },

  effects: {
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
