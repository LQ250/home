import type { ReactNode } from 'react'
import { useState } from 'react'

/* =========| components |========= */
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '~/components/ui/sheet'
import { Button } from '~/components/ui/button'
import { InputContainer, InputClose, Input } from '~/page/input'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'

/* =========| icon |========= */
import { GoGear } from 'react-icons/go'

/* =========| zustand |========= */
import { useUserStore, useShallow } from '~/hook/zustand'

export const Config = (): ReactNode => {
    const { bgUrl, setBgUrl } = useUserStore(
        useShallow((e) => ({
            bgUrl: e.bgUrl,
            setBgUrl: e.setBgUrl,
        })),
    )

    const [value, setValue] = useState<string>(bgUrl)

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    variant="outline"
                    size={'icon'}
                    className="fixed z-10 bottom-10 right-10 not-hover:opacity-60"
                >
                    <GoGear />
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Config</SheetTitle>
                    <SheetDescription></SheetDescription>

                    <Card className="gap-y-0">
                        <CardHeader>
                            <CardTitle>背景</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <label className="relative">
                                <span className="text-sm text-muted-foreground leading-none">
                                    链接
                                </span>
                                <InputContainer
                                    className="relative"
                                    onSubmit={(e) => {
                                        e.stopPropagation()
                                        setBgUrl(value)
                                    }}
                                >
                                    <Input
                                        value={value}
                                        onChange={(e) => {
                                            setValue(e.currentTarget.value)
                                        }}
                                    />
                                    <InputClose />
                                </InputContainer>
                            </label>
                        </CardContent>
                    </Card>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}
