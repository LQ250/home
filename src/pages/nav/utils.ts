/**
 * 将数组按照指定大小分片
 * @param array 要分片的数组
 * @param size 每个分片的大小
 * @returns 分片后的二维数组
 */
export function chunkArray<T>(array: T[], size: number): T[][] {
    // 处理边界情况
    if (size <= 0) {
        throw new Error('Size must be greater than 0')
    }

    const result: T[][] = []
    for (let i = 0; i < array.length; i += size) {
        // 使用 slice 方法获取子数组
        const chunk = array.slice(i, i + size)
        result.push(chunk)
    }
    return result
}

/* =========| 工具函数 |========= */
export const OPEN_URL = (url: string, isBlank = false) => {
    if (isBlank) {
        window.open(url, '_blank')
    } else {
        window.open(url, '_self')
    }
}

export function isSvgUrl(url: string): boolean {
    if (!url) return false

    // 检查是否是内联 SVG
    if (url.trim().startsWith('<svg')) {
        return true
    }

    // 检查 URL 是否以 .svg 结尾（忽略查询参数）
    const urlWithoutParams = url.split('?')[0].split('#')[0] // 同时移除片段标识符
    return urlWithoutParams.toLowerCase().endsWith('.svg')
}
