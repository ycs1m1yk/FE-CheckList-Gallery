import { DefaultTheme } from 'styled-components';

const size = {
  mobile: '767px',
  desktop: '768px',
};

export const theme: DefaultTheme = {
  palette: {
    triconblack: '#2D2D2D',
    africanviolet: '#6C4F85',
    daydream: '#BFC1CE',
    lobelia: '#7D95C1',
    extrawhite: '#EFF0EB',
    africanruby: '#d63031',
  },
  devices: {
    desktop: `(min-width: ${size.desktop})`,
    mobile: `(max-width: ${size.mobile})`,
  },
};
