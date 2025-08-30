export type RightClickData = {
    uuid: string
    text: string
    url: string
}

export type shortcutData = {
    id: string | number
    icon: string
    text: string
    url: string
    padding: number
    bgColor: string
    RightClickData: RightClickData[]
}
