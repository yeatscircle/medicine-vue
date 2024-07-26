import request from '@/utils/request'

export function getAll() {
  return request({
    url: '/exp/type',
    method: 'get'
  })
}
