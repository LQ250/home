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
} /* =========| 工具函数 |========= */
export const OPEN_URL = (url: string, isBlank = false) => {
    if (isBlank) {
        window.open(url)
        return
    }

    window.open(url)
}
