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
                    labels: ["January", "February", "March", "April", "May", "June"],
                    datasets: [
                        {
                        data: [
                            Math.random() * 100,
                            Math.random() * 100,
                            Math.random() * 100,
                            Math.random() * 100,
                            Math.random() * 100,
                            Math.random() * 100
                        ]
                        }
                    ]
                }}
                width={Dimensions.get("window").width} 
                height={220}
                yAxisLabel="$"
                yAxisSuffix="k"
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                    backgroundColor: "#e26a00",
                    backgroundGradientFrom: "#fb8c00",
                    backgroundGradientTo: "#ffa726",
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16
                    },
                    propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: "#ffa726"
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

