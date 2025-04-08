'use client'

import {createTheme, Chip, Button} from "@mantine/core";
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
    }
});