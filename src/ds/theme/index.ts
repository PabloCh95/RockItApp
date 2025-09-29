import { colors } from './colors';
import { borderRadius, spacing } from './spacing';
import { typography } from './typography';

export { colors, ColorToken } from './colors';
export { borderRadius, BorderRadiusToken, spacing, SpacingToken } from './spacing';
export { typography, TypographyToken } from './typography';

export const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
} as const;

export type Theme = typeof theme;