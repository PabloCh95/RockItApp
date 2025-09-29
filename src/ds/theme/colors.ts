export const colors = {

    primary: {
      50: '#E6F4FE',
      100: '#CCE9FD',
      500: '#007AFF',
      600: '#0056CC',
      700: '#003D99',
      900: '#001A4D',
    },
    
    neutral: {
      0: '#FFFFFF',
      50: '#F8F9FA',
      100: '#F1F3F4',
      200: '#E8EAED',
      300: '#DADCE0',
      400: '#BDC1C6',
      500: '#9AA0A6',
      600: '#80868B',
      700: '#5F6368',
      800: '#3C4043',
      900: '#202124',
    },
    
    success: {
      50: '#E8F5E8',
      500: '#34A853',
      700: '#137333',
    },
    
    error: {
      50: '#FCE8E6',
      500: '#EA4335',
      700: '#D93025',
    },
    
    warning: {
      50: '#FEF7E0',
      500: '#FBBC04',
      700: '#F9AB00',
    },
  } as const;
  
  export type ColorToken = typeof colors;