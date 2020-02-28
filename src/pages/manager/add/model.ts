import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { fetchTableList} from './server'

export interface StateType {
  status?: 'ok' | 'error';
  currentAuthority?: 'user' | 'guest' | 'admin';
  tableData:Array<Object>

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
      getList:Effect

    };
    reducers: {
      save: Reducer;
      clear: Reducer;
      tableData:Reducer<any>;

    };
  }


const Model:ModelType = {
    namespace: 'managerModel',
    state: {
      tableData:[]
    },
    
    effects: {
      *fetch(_, { call, put }) {
        const response = yield call();
        yield put({
          type: 'save',
          payload: response,
        });
      },
      *getList(_,{call,put}){
        const data = yield call(fetchTableList)
        console.log(data)
        yield put({
          type: 'tableData',
          payload:data
        })
      }
    },
    reducers: {
      tableData(state,action){
        return {
          ...state,
          tableData: action.payload || {},
        };
      },
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