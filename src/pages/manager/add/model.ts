import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';


export interface StateType {
  status?: 'ok' | 'error';
  currentAuthority?: 'user' | 'guest' | 'admin';
}


export type Effect = (
    action: AnyAction,
    effects: EffectsCommandMap ,
  ) => void;
  
  export interface ModelType {
    namespace: string;
    state: any;
    effects: {
      fetch: Effect;
    };
    reducers: {
      save: Reducer;
      clear: Reducer;
    };
  }


const Model:ModelType = {
    namespace: 'managerModel',
    state: [],
    effects: {
      *fetch(_, { call, put }) {
        const response = yield call();
        yield put({
          type: 'save',
          payload: response,
        });
      },
    },
    reducers: {
      save(state, { payload }) {
        return {
          ...state,
          ...payload,
        };
      },
      clear() {
        return '';
      },
    },
  };
  
  export default Model;