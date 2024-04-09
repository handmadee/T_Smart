const config = {
    screens: {
        Homescreen: {
            path: 'Home'
        }
    },
}

const linking = {
    prefices: ['notification'],
    config
}

export default linking;

// adb shell am start -W -a android.intent.action.VIEW -d "tSmart" com.t_smart

