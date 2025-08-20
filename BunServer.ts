const server = Bun.serve({
    routes: {
        '/api/sug/:keyword': async (req: { params: { keyword: any } }) => {
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
    },
})

console.log(`Listening on http://localhost:${server.port}`)
