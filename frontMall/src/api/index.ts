import { request } from "@/utils/request"

export const testApi = () => {
  return request({
    url: "/api",
    method: "get",
  })
}