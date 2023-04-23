import { createTheme, ThemeProvider as MuiProvider, useMediaQuery } from "@mui/material";
import { useMemo, useState } from "react";

export function ThemeProvider({ children }: { children: any }) {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const [mode, setMode] = useState<'dark' | 'light'>(prefersDarkMode ? 'dark' : 'light')

    const createThemeLocal = (themeMode: 'dark' | 'light') => {
        return createTheme({
            palette: {
                mode: 'light',
                text: {
                    //primary: "#0a1a10",
                },
                primary: {
                    main: '#9b00ff',
                },
                secondary: {
                    main: '#e1d778',
                },
            },
            typography: {
                fontFamily: ['"Kumbh Sans"', 'sans-serif'].join(','),
                fontSize: 12
            }
        });
    }

    const theme = useMemo(() => {
        //setMode(prefersDarkMode ? 'dark' : 'light')
        return createThemeLocal(mode)
    }, [prefersDarkMode, mode])
    return (
        <MuiProvider theme={theme}>
            {children}
        </MuiProvider>
    )
}