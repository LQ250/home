/* =========| react |========= */
import type { FC, ReactNode, ComponentProps } from 'react'
import { useRef, useImperativeHandle } from 'react'

/* =========| components |========= */
import { Input as UIINPUT } from '~/components/ui/input'

/* =========| icons |========= */
import { IoMdClose } from 'react-icons/io'

export const InputContainer: FC<ComponentProps<'form'>> = ({
    ref,
    onSubmit,
    className,
    children,
    ...props
}): ReactNode => {
    const formRef = useRef<HTMLFormElement | null>(null)

    useImperativeHandle(ref, () => formRef.current!)

    return (
        <form
            ref={formRef}
            autoComplete="off"
            autoCorrect="off"
            onSubmit={(e) => {
                e.preventDefault()
                const submitter = (e.nativeEvent as SubmitEvent).submitter

                if (submitter?.getAttribute('data-slot') === 'input-close') {
                    e.currentTarget.reset()
                }

                onSubmit?.(e)
            }}
            className={`relative w-full ${className}`}
            {...props}
        >
            {children}
        </form>
    )
}

export const InputDefault: FC<ComponentProps<'input'>> = ({
    ...props
}): ReactNode => {
    return (
        <>
            <input
                autoComplete="off"
                autoCorrect="off"
                {...props}
            />
            <button
                hidden
                type="submit"
                data-slot="input-submit"
            ></button>
        </>
    )
}

export const Input: FC<ComponentProps<'input'>> = ({
    className,
    ...props
}): ReactNode => {
    return (
        <>
            <UIINPUT
                className={`relative w-full  pr-8 ${className}`}
                autoComplete="off"
                {...props}
            />
            <button
                hidden
                type="submit"
                data-slot="input-submit"
            ></button>
        </>
    )
}

export const InputClose: FC<ComponentProps<'button'>> = ({
    className,
    ...props
}): ReactNode => {
    return (
        <button
            type="submit"
            data-slot="input-close"
            className={`absolute hover:cursor-pointer right-3 top-1/2 -translate-y-1/2 ${className}`}
            {...props}
        >
            <IoMdClose />
        </button>
    )
}
