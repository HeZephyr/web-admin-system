// 查询所有公告
import request from '@/utils/request'
import { getToken } from '@/utils/auth'

export function queryAllMessages() {
  return request({
    url: '/message/get/messages',
    method: 'post',
  })
}
export function queryAllNotReviewMessages() {
  return request({
    url: '/message/get/not/review/messages',
    method: 'post',
  })
}
export function handleMessage(id, review) {
  const data = {
    id,
    review
  }
  return request({
    url: '/message/review/message',
    method: 'post',
    data: data,
  })
}