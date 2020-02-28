import request from '@/utils/request';

export async function fetchTableList() {
  return request('/workflow/personal_work_order/?key=&page=1&pageSize=10');
}


