// 查询所有公告
import request from '@/utils/request'
import { getToken } from '@/utils/auth'

export function queryAllMessages() {
  return request({
    url: '/message/get/messages',
    method: 'post',
  })
}