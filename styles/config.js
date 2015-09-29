import Color from 'color';

export const font = {
  family: 'PT Sans',
  size: 16,
  lineHeight: 1.5
};

const baseColor = Color('#c19546');
export const colors = {
  base: baseColor.hexString(),
  light: baseColor.lighten(0.8).hexString(),
  dark: baseColor.darken(0.8).hexString(),
  grey: '#999',
  white: '#FFF',
  black: '#222',
  shadow: Color('#222').clearer(0.5).rgbString()
};

export const container = {
  maxWidth: 480,
  padding: font.size * font.lineHeight
};

export const header = {
  fontSize: font.size * Math.pow(1.618, 2),
  margin: font.size * font.lineHeight,
  shadow: `0 1px 2px ${colors.shadow}`
};

export const card = {
  shadow: `0 3px 4px ${colors.shadow}`,
  radius: 3,
  padding: font.size * font.lineHeight / 2,
  margin: font.size * font.lineHeight / 2
};

export const section = {
  margin: font.size * font.lineHeight
};

export const rule = {
  border: `1px solid ${colors.base}`,
  margin: font.size * font.lineHeight / 2,
  shadow: `0 1px 2px ${colors.shadow}`
};

export const clock = {
  fontSize: font.size * 1.618
};

export const button = {
  bigFontSize: font.size * font.lineHeight,
  shadow: `0 1px 2px ${colors.shadow}`,
  hoverShadow: `0 3px 4px ${colors.shadow}`,
};

export const transitions = {
  time: '0.25s',
  duration: 250,
  longTime: '0.5s',
  longDuration: 500
};

export const textInput = {
  border: `1px solid ${colors.grey}`,
  height: font.size * font.lineHeight
};

export const slider = {
  height: 1,
  marginTop: font.size * font.lineHeight / 2,
  marginBottom: (font.size * font.lineHeight / 2) - 1,
  shadow: `0 1px 2px ${colors.shadow}`,
  hoverShadow: `0 3px 4px ${colors.shadow}`
};

export const spacer = {
  margin: font.size * font.lineHeight / 2
};
