/*
 * @Author: YTian
 * @Date: 2025-04-17 23:02:20
 * @LastEditTime: 2025-04-18 09:29:15
 * @Description: 获取必应搜索建议
 * @FilePath: \home\app\routes\api.get-bing-sug.tsx
 */
import superagent from 'superagent'
import type { ActionFunctionArgs } from 'react-router'

import { globalError } from '~/.server/error'

/**
 * @description: 获取必应搜索建议
 * @param {LoaderFunctionArgs} param
 * @return {Promise<string[]>}
 */
export const action = async ({ request }: ActionFunctionArgs) => {
    /**
     * 1. 解析url
     * 2. 获取关键词
     * 3. 发送请求
     * 4. 处理返回的数据
     * 5. 根据 4 的数据进行提取
     * 6. 返回提取的数据
     */

    try {
        const { keyword } = await request.json()

        if (!keyword) return []

        const res = await superagent
            .get('https://api.bing.com/qsonhs.aspx?type=cb')
            .query({
                q: keyword,
            })

        const sugString: string = res.body.toString()

        if (!sugString) return []

        const sugObj: {
            Suggests: {
                Txt: string
            }[]
        }[] = JSON.parse(
            sugString
                .replace("if(typeof  == 'function') (", '')
                .replace('/* pageview_candidate */);', ''),
        ).AS.Results

        const sugArr = sugObj.flatMap((result) =>
            result.Suggests.map((suggest) => suggest.Txt),
        )

        return sugArr
    } catch (error: any) {
        globalError.addLog(error.toString())
        return []
    }
}
