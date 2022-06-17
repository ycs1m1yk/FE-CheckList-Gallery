import 'styled-components';

declare module 'styled-components'{
    export interface DefaultTheme {
        palette:{
            triconblack: string,
            africanviolet: string,
            daydream: string,
            lobelia: string,
            extrawhite: string,
        }
        devices: {
            desktop: string,
            mobile: string
        }
    }
}
