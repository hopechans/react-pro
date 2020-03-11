import request from '@/utils/request';

export async function fetchTableList(params:object) {
  return request('/departments/?key=',{params});
}


