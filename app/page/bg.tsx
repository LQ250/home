import type { ReactNode, FC } from 'react'

type Props = {
    src: string
}

export const BG: FC<Props> = ({ src }): ReactNode => {
    return (
        <div className="!fixed w-screen h-screen">
            <img
                src={src}
                draggable={false}
                className="object-cover z-0 w-full h-full"
                alt=""
            />
        </div>
    )
}
