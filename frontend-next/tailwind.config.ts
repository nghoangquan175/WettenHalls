
export default {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        screens: {
            // sm: '640px',
            // md: '768px',
            // lg: '1024px',
            // xl: '1280px',
            '1280': '1280px',
            '1024': '1024px',
            '768': '768px',
            '600': '600px',
            '390': '390px',
            '400': '400px',
            '410': '410px',
            '430': '430px',
            '1440': '1440px',
        },
        extend: {
            // fontFamily: {
            //   primary: ['Inter', ...defaultTheme.fontFamily.sans],
            // },
            colors: {
                primary: {
                    // Customize it on globals.css :root
                },

                baseIron00: '#FFFFFF',
                baseIron50: '#F7F8F8',
                baseIron100: '#EEF0F0',
                baseIron200: '#D6DCDC',
                baseIron300: '#B7C2C2',
                baseIron400: '#90A0A0',
                baseIron500: '#728584',
                baseIron600: '#5C6D6D',
                baseIron700: '#4B5959',
                baseIron800: '#414B4B',
                baseIron900: '#394141',
                baseIron950: '#262B2B',
                baseIron1000: '#060707',

                coreRed50: '#FEF4F2',
                coreRed100: '#FEE6E5',
                coreRed200: '#FCD0CF',
                coreRed300: '#FAA8A7',
                coreRed400: '#F67679',
                coreRed500: '#ED464D',
                coreRed600: '#DA2435',
                coreRed700: '#B8182B',
                coreRed800: '#A6192E',
                coreRed900: '#84172B',
                coreRed950: '#490812',

                accentAmber50: '#FFF9ED',
                accentAmber100: '#FFF1D4',
                accentAmber200: '#FFDEA9',
                accentAmber300: '#FFC672',
                accentAmber400: '#FEA239',
                accentAmber500: '#FD8B1C',
                accentAmber600: '#EE6A08',
                accentAmber700: '#C55009',
                accentAmber800: '#9C3F10',
                accentAmber900: '#7E3510',
                accentAmber950: '#441806',

                error100: '#FFF1F2',
                error500: '#FF2E37',

                neutral400: '#B0B0B0',
            },
            keyframes: {
                flicker: {
                    '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': {
                        opacity: '0.99',
                        filter: 'drop-shadow(0 0 1px rgba(252, 211, 77)) drop-shadow(0 0 15px rgba(245, 158, 11)) drop-shadow(0 0 1px rgba(252, 211, 77))',
                    },
                    '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': {
                        opacity: '0.4',
                        filter: 'none',
                    },
                },
                shimmer: {
                    '0%': {
                        backgroundPosition: '-700px 0',
                    },
                    '100%': {
                        backgroundPosition: '700px 0',
                    },
                },
            },
            animation: {
                flicker: 'flicker 3s linear infinite',
                shimmer: 'shimmer 1.3s linear infinite',
            },
        },
    },
    plugins: [require('@tailwindcss/forms')],
};
