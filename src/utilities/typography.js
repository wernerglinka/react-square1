import Typography from 'typography';
import moragaTheme from 'typography-theme-moraga';

const typography = new Typography(moragaTheme);

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles();
}

export default typography;
export const rhythm = typography.rhythm;
export const scale = typography.scale;
