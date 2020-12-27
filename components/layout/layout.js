import React from 'react'

import {View,Text,Switch,StyleSheet,Dimensions} from 'react-native'
import {LineChart} from 'react-native-chart-kit'

import {useTheme} from '../../ui/themeContext/themeContext'
import {dark} from '../../ui/theme/darkTheme'
import {light} from '../../ui/theme/lightTheme'

const useStyles = ()=>{
    const theme = useTheme()
    return(
        StyleSheet.create({
            container:{
                flex:1,
                justifyContent:'center',
                alignItems:'flex-start',
                backgroundColor:theme.theme.background
            },
            text1:{
                color:theme.theme.primary,
                fontSize:25
            },
            text2:{
                color:theme.theme.secondary,
                fontWeight:'bold',
                fontSize:40
            }
        })
    )
}

export const Layout = ()=>{
    const styles = useStyles()
    const theme = useTheme()

    return(
        <View style={styles.container}>
            <Switch
                value={theme.mode==='dark'}
                onValueChange={value=>{
                    theme.setMode(value?'dark':'light')
                    theme.toggleTheme(value?dark.theme:light.theme)
                }}
            />
            <Text style={styles.text1}>Hello,</Text>
            <Text style={styles.text2}>Akash</Text>
            <LineChart
                data={{
                    labels: ["SUN","MON", "TUE", "WED", "THU", "FRI", "SAT"],
                    datasets: [
                        {
                        data: [
                            0,
                            100,
                            1000,
                            50,
                            100,
                            20,
                            10
                        ]
                        }
                    ]
                }}
                width={Dimensions.get("window").width} 
                height={250}
                yAxisLabel="₹ "
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                    backgroundColor: "#e26a00",
                    backgroundGradientFrom: "rgba(100,0,255,1)",
                    backgroundGradientTo: "rgba(0,255,240,1)",
                    decimalPlaces: 0, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, 1)`,

                    style: {
                        borderRadius: 10,
                        
                    },
                    propsForDots: {
                        r: "6",
                        strokeWidth: "5",
                        stroke: "rgba(100,255,240,1)"
                    }
                }}
                bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 16
                }}
            />
        </View>
    )
}

