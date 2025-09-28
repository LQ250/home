import MAINHTML from './dist/index.html'

const server = Bun.serve({
    routes: {
        '/': MAINHTML,
        '/add.png': () => new Response(Bun.file('./dist/add.png')),
        '/config.png': () => new Response(Bun.file('./dist/config.png')),
        '/switch.png': () => new Response(Bun.file('./dist/switch.png')),
        '/bg.png': () => new Response(Bun.file('./dist/bg.png')),
        '/api/sug/:keyword': async (req: { params: { keyword: string } }) => {
            const { keyword } = req.params

            const res = await fetch(
                `https://api.bing.com/qsonhs.aspx?type=cb&q=${keyword}`
            ).then((res) => res.text())

            const sugObj: {
                Suggests: {
                    Txt: string
                }[]
            }[] = JSON.parse(
                res
                    .replace("if(typeof  == 'function') (", '')
                    .replace('/* pageview_candidate */);', '')
            ).AS.Results

            const sugArr = sugObj.flatMap((result) =>
                result.Suggests.map((suggest) => suggest.Txt)
            )

            return Response.json(sugArr, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
            })
        },
        '/api/get-icon': async (req: Bun.BunRequest<'/api/get-icon'>) => {
            const url = new URL(req.url)
            const urlParams = url.searchParams.get('url')

            if (!urlParams) {
                return Response.json(
                    {
                        error: 'Missing url parameter',
                    },
                    { status: 400 }
                )
            }

            try {
                // 确保URL有协议
                let websiteUrl = urlParams
                if (!websiteUrl.startsWith('http')) {
                    websiteUrl = `https://${websiteUrl}`
                }

                // 获取网站内容
                const response = await fetch(websiteUrl, {
                    headers: {
                        'User-Agent':
                            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                    },
                })

                if (!response.ok) {
                    throw new Error(
                        `Failed to fetch website: ${response.status} ${response.statusText}`
                    )
                }

                // 获取HTML内容
                const html = await response.text()

                // 使用正则表达式查找favicon
                const faviconRegex =
                    /<link[^>]*?rel=["'](?:icon|shortcut icon|apple-touch-icon)["'][^>]*?href=["']([^"']+)["'][^>]*?>/i
                const match = html.match(faviconRegex)

                let faviconUrl = match ? match[1] : null

                // 如果找到相对路径，转换为完整URL
                if (faviconUrl && !faviconUrl.startsWith('http')) {
                    const baseUrl = new URL(websiteUrl)
                    faviconUrl = new URL(faviconUrl, baseUrl.origin).toString()
                }

                // 如果没有找到，尝试默认的favicon.ico
                if (!faviconUrl) {
                    const baseUrl = new URL(websiteUrl)
                    faviconUrl = new URL(
                        '/favicon.ico',
                        baseUrl.origin
                    ).toString()
                }

                // 验证favicon URL是否有效
                const iconResponse = await fetch(faviconUrl, { method: 'HEAD' })
                if (!iconResponse.ok) {
                    throw new Error('Favicon not found')
                }

                // 返回favicon URL
                return Response.json({
                    url: faviconUrl,
                    status: 'success',
                    contentType:
                        iconResponse.headers.get('content-type') ||
                        'image/x-icon',
                })
            } catch (error) {
                console.error('Error:', error)
                return Response.json(
                    {
                        error:
                            error instanceof Error
                                ? error.message
                                : 'Failed to fetch favicon',
                        url: urlParams,
                    },
                    { status: 500 }
                )
            }
        },
    },
    port: 4041,
})

console.log(`Listening on http://127.0.0.1:${server.port}`)
