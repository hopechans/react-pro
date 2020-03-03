import request from '@/utils/request';

export async function fetchTableList(params:object) {
  return request('/workflow/master_order/?query_type=summary&key=',{params});
}


