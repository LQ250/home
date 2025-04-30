/**
 * @description: 计算最大网格数
 * @return {number} 最大的数量
 */
export const calcGridMaxBox = (
    gridSize: number,
    totalLength: number,
    gridSpacing: number,
): number => {
    const maxGridItems = Math.floor(gridSize / totalLength)

    for (let i = maxGridItems; i > 0; i--) {
        if ((i - 1) * gridSpacing + i * totalLength <= gridSize) {
            return i
        }
    }

    return maxGridItems
}
