'use client'

import {createTheme, Chip, Button, NativeSelect, Modal} from "@mantine/core";
import s from "./mantine.module.scss"

export const theme = createTheme({
    components: {
        Chip: Chip.extend({
            classNames: {
                iconWrapper: s.chip__iconWrapper,
                label: s.chip__label,
                root: s.chip__root
            }
        }),
        NativeSelect: NativeSelect.extend({
            classNames: {
                root: s.select__root
            }
        }),
        Modal: Modal.extend({
            classNames: {
                content: s.modal__content,
                body: s.modal__body
            }
        })
    }
});