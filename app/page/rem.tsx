import { useEffect, type ReactNode } from 'react'

function setRem() {
    //  PC端
    // 基准大小
    let baseSize = 100
    let basePc = baseSize / 1920 // 表示1920的设计图,使用100PX的默认值
    let vW = window.innerWidth // 当前窗口的宽度
    let vH = window.innerHeight // 当前窗口的高度
    // 非正常屏幕下的尺寸换算
    let dueH = (vW * 1080) / 1920
    if (vH < dueH) {
        vW = (vH * 1920) / 1080
    }
    let rem = vW * basePc
    document.body.style.fontSize = (rem / 1.72 < 40 ? 45 : rem / 1.72) + 'px'
}
