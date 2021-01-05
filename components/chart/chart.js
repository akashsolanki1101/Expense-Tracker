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

export const Chart = ({data,transparent,withInnerLines,listenThemeChange,height,backgroundGradientFrom,backgroundGradientTo})=>{
    const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0, visible: false, value: 0 })
    const [graphData,setGraphData] = useState({labels:["M","T","W","T","F","S","S"],data:[10,60,200,50,100,70,200]})
    const styles = useStyles()
    const theme = useTheme()

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
            fontSize:listenThemeChange?12:13,
            fontWeight:listenThemeChange?'normal':'bold',
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
        console.log(data.value);
        
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

    const toolTip = ()=>{
        return tooltipPos.visible ? <View>
            <Svg>
                <Rect 
                    x={tooltipPos.x - 15} 
                    y={tooltipPos.y + 10} 
                    width="40" 
                    height="30"
                    fill="white" 
                />
                <TextSVG
                    x={tooltipPos.x + 5}
                    y={tooltipPos.y + 30}
                    fill="black"
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
                    labels: graphData.labels,
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
            />
        </View>
    )
}

