import { JSDOM } from 'jsdom'

export const getIconUrl = async (pageUrl: string) => {
    try {
        const html = await fetch(pageUrl)
        const text = await html.text()

        const dom = new JSDOM(text)
        const links = dom.window.document.querySelectorAll('link[rel~="icon"]')

        return Promise.race(
            Array.from(links).map((link) =>
                fetch(link.getAttribute('href') || '').then(() =>
                    link.getAttribute('href'),
                ),
            ),
        )
    } catch (error) {
        return '/404.png'
    }
}
