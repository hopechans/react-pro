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
      tableData1:Reducer<any>;

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
      *getList({payload},{call,put}){
        console.log(payload)
        const data = yield call(()=>fetchTableList(payload))
        console.log(data)
        yield put({
          type: 'tableData1',
          payload:data.data.results
        })
      }
    },
    reducers: {
      tableData1(state,action){
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