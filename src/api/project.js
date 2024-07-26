import request from '@/utils/request'

export function page(DiaId, DiaName, DiaExpType, begin, end, page, pageSize) {
  return request({
    url: '/project/all?DiaId=' + DiaId + '&DiaName=' + DiaName + '&DiaExpType=' + DiaExpType + '&begin=' + begin + '&end=' + end + '&page=' + page + '&pageSize=' + pageSize,
    method: 'get'
  })
}

export function addPro(pro) {
  return request({
    url: '/project',
    method: 'post',
    data: pro
  })
}

export function update(pro) {
  return request({
    url: '/project',
    method: 'put',
    data: pro
  })
}

export function deleteByIds(ids) {
  return request({
    url: '/project/' + ids, // 直接使用传入的以逗号连接的id字符串
    method: 'delete'
  });
}

export function selectById(id) {
  return request({
    url: '/project/' + id,
    method: 'get'
  })
}

export function deleteById(id) {
  return request({
    url: '/project/single/' + id,
    method: 'delete'
  })
}

export function exportExcel() {
  return request({
    url: '/project/downloadExcel',
    responseType: 'blob' // 确保服务器返回的文件可以被正确处理
  })
}


