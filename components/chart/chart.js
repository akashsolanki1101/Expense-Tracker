import React,{useState} from 'react'

import {View,StyleSheet,Dimensions} from 'react-native'
import {LineChart} from 'react-native-chart-kit'
import { Rect, Text as TextSVG, Svg } from "react-native-svg"

import {useTheme} from '../ui/themeContext/themeContext'

const useStyles = ()=>{
    // const theme = useTheme()
    return(
        StyleSheet.create({
            container:{
            },
        })
    )
}

export const Chart = ({data,transparent,withInnerLines,listenThemeChange,height,backgroundGradientFrom,backgroundGradientTo,toolTipTextColor,periodType})=>{
    const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0, visible: false, value: 0 })
    const styles = useStyles()
    const theme = useTheme()

    const labels = {
        week:['M','T','W','T','F','S','S'],
        year:['J','F','M','A','M','J','J','A','S','O','N','D']
    }
    
    const chartConfig= {
        backgroundGradientFrom: backgroundGradientFrom,
        backgroundGradientTo: backgroundGradientTo,
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(255, 255, 255,.5)`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, 1)`,
        fillShadowGradientOpacity:.6,
        useShadowColorFromDataset:true,
        propsForDots: {
            r: "4",
            strokeWidth: "5",
            stroke: listenThemeChange?theme.theme.primaryText:'white',
        },
        propsForBackgroundLines:{
            strokeDasharray:"",
            stroke: listenThemeChange?theme.theme.secondaryText:'white',
        },
        propsForLabels:{
            fontSize:12,
            stroke: listenThemeChange?theme.theme.primaryText:'white',
        },
    }

    const hideToolTip = ()=>{
        setTimeout(()=>{
            setTooltipPos(previousState=>{
                return{
                    ...previousState,
                    visible:false
                }
            })
        },2000)
    }

    const handleClickOnDataPoint = (data)=>{
        const isSamePoint = (tooltipPos.x === data.x && tooltipPos.y === data.y)
        hideToolTip()
        
        isSamePoint?
        setTooltipPos((previousState) => {
            return { 
                ...previousState,
                value: data.value,
                visible: !previousState.visible
            }
        })
        : 
        setTooltipPos({ x: data.x, value: data.value, y: data.y, visible: true });
    }

    const changeYlabel = (string)=>{
        const length = string.length
        const num  = Number(string)
        let modifiedLabel = string

        if(length>3 && length<6)    
        {  
            modifiedLabel = (num / 1000).toFixed(2);
            modifiedLabel = `${modifiedLabel}k`
        }
        
        else if(length>5 && length<8)    
        {  
            modifiedLabel = (num / 100000).toFixed(2);
            modifiedLabel = `${modifiedLabel}L`
        }

        else if(length>7 && length<10)    
        {  
            modifiedLabel = (num / 10000000).toFixed(2);
            modifiedLabel = `${modifiedLabel}cr`
        }

        else if(length>9 && length<12)    
        {  
            modifiedLabel = (num/ 1000000000).toFixed(2);
            modifiedLabel = `${modifiedLabel}ar`
        }

        else if(length>11 && length<14)    
        {  
            modifiedLabel = (num / 100000000000).toFixed(2);
            modifiedLabel = `${modifiedLabel}kh`
        }

        else if(length>13 && length<16)    
        {  
            modifiedLabel = (num / 10000000000000).toFixed(2);
            modifiedLabel = `${modifiedLabel}nl`
        }

        else if(length>15)    
        {  
            modifiedLabel = (num / 1000000000000000).toFixed(2);
            modifiedLabel = `${modifiedLabel}pm`
        }


        return modifiedLabel
    }

    const toolTip = ()=>{
        return tooltipPos.visible ? <View>
            <Svg>
                <Rect 
                    x={tooltipPos.x - 15} 
                    y={tooltipPos.y + 10} 
                    width="40"
                    height="30"
                />
                <TextSVG
                    x={tooltipPos.x + 5}
                    y={tooltipPos.y + 30}
                    fill={toolTipTextColor}
                    fontSize="16"
                    fontWeight="bold"
                    textAnchor="middle">
                    {tooltipPos.value}
                </TextSVG>
            </Svg>
        </View> : null
    }

    return(
        <View style={styles.container}>
            <LineChart
                data={{
                    labels: labels[periodType],
                    datasets: data
                }}
                width={Dimensions.get("window").width-36} 
                height={height}
                yAxisLabel="₹ "
                yAxisInterval={1}
                fromZero={true}
                chartConfig={chartConfig}
                withInnerLines={withInnerLines}
                withOuterLines={false}
                withVerticalLines={false}
                bezier
                yLabelsOffset={20}
                xLabelsOffset={5}
                transparent={transparent}
                style={{
                    borderRadius: 12,
                    padding:0
                }}
                decorator={toolTip}
                onDataPointClick={handleClickOnDataPoint}
                segments={5}
                formatYLabel={changeYlabel}
            />
        </View>
    )
}

