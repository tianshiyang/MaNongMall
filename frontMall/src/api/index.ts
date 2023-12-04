import { request } from "@/utils/request"

export const testApi = () => {
  return request({
    url: "/cem/api/v1/teamLifecycle/getStatisticInfo",
    method: "get",
    isMock: true
  })
}