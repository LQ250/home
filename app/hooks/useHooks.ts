/**
 * @description: 移动数组中的元素
 * @param {T[]} arr
 * @param {number} fromIndex
 * @param {number} toIndex
 * @return {T[]}
 */
export const moveArrayItem = <T>(
    arr: T[],
    fromIndex: number,
    toIndex: number,
): T[] => {
    const newArr = [...arr]
    const item = newArr.splice(fromIndex, 1)[0]
    newArr.splice(toIndex, 0, item)
    return newArr
}

import { useState } from 'react'

/**
 * @description: 动态列表
 * @param {T} item
 * @return {*}
 */
export const useDynamicList = <T extends { uuid: string }>(
    initialList: T[] = [],
) => {
    const [list, setList] = useState<T[]>(initialList)

    const add = (item: Omit<T, 'uuid'>) => {
        setList([
            ...list,
            {
                ...item,
                uuid: crypto.randomUUID(),
            } as T,
        ])
    }

    const remove = (uuid: string) => {
        setList(list.filter((item) => item.uuid !== uuid))
    }

    const setItem = (uuid: string, newItem: Partial<Omit<T, 'uuid'>>) => {
        setList(
            list.map((item) => {
                if (item.uuid === uuid) {
                    return {
                        ...item,
                        ...newItem,
                    }
                }
                return item
            }),
        )
    }

    return {
        list,
        add,
        remove,
        setItem,
    }
}
