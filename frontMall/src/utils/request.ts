import axios, { type AxiosRequestConfig } from "axios"
import { ElLoading } from "element-plus"
import { nextTick } from "vue"

const api = axios.create({
  headers: {
    "Content-Type": "application/json"
  }
})
// 请求拦截器
api.interceptors.request.use(
  (config) => {
    // 请求成功
    return Promise.resolve(config)
  },
  (error) => {
    // 请求失败
    return Promise.reject(error)
  }
)

// 响应拦截器
api.interceptors.response.use(
  (response) => {
    // 响应成功
    return Promise.resolve(response.data)
  },
  (error) => {
    // 响应失败
    return Promise.reject(error)
  }
)

// 暴露出请求方法
interface MallAxiosRequestConfig extends AxiosRequestConfig {
  isMock?: boolean, // 是否mock模式
  enableLoading?: boolean // 是否在接口请求开启全局loading
}

export function request<T = any>(config: MallAxiosRequestConfig): Promise<T> {
  let instance: any = null
  if (!config.enableLoading) {
    instance = ElLoading.service({
      text: "数据加载中...",
      background: "rgba(0, 0, 0, 0.0)"
    })
  }

  return new Promise((resolve, reject) => {
    if (config.isMock) {
      config.url =
        "https://mock.apifox.com/m1/3543981-0-default" +
        config.url!.replace(/\/cem/, "")
    }
    api(config)
      .then((res: any) => {
        if (res.isSuccess) {
          // 正常返回：处理成功的处理
          resolve(res.data)
        } else {
          // 正常返回：处理失败的处理
          reject(res.resultMsg)
        }
      })
      .catch((error) => {
        switch (error.response.status) {
          case 401:   
            // 未认证/认证失败
            return reject("认证失败")
          case 404:
            return reject("要访问的文件迷路了～")
          default:
            return reject(error.response?.data?.resultMsg || "响应错误")
        }
      })
      .finally(() => {
        nextTick(() => {
          instance?.close()
        })
      })
  })
}