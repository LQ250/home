import { type ActionFunctionArgs } from 'react-router'
import { getIconUrl } from '~/.server/getIconURL'

export const action = async ({ request }: ActionFunctionArgs) => {
    const { url } = await request.json()

    if (!url) return '/404.png'

    const iconUrl = await getIconUrl(url).catch(() => '/404.png')
    return iconUrl
}
