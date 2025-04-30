import { writeFileSync, stat, appendFileSync } from 'fs'

class GlobalError {
    #path: string
    constructor(path: string) {
        this.#path = path
        this.initLogTxt()
    }

    initLogTxt = () => {
        stat(this.#path, (err) => {
            if (err) {
                writeFileSync(this.#path, '')
            }
        })
    }

    addLog = (message: string) => {
        const time = new Date()
        appendFileSync(this.#path, `${time.toLocaleString()} - ${message}\n`)
    }
}

const globalError = new GlobalError('./global-error.log')

export { globalError }
