import React,{useState} from 'react'

import {View,StyleSheet,Dimensions} from 'react-native'
import {LineChart} from 'react-native-chart-kit'
import { Rect, Text as TextSVG, Svg } from "react-native-svg"

const useStyles = ()=>{
    // const theme = useTheme()
    return(
        StyleSheet.create({
            container:{
                flex:1,
            },
        })
    )
}

export const Chart = ()=>{
    const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0, visible: false, value: 0 })
    const [graphData,setGraphData] = useState({labels:["M","T","W","T","F","S","S"],data:[10,100,200,50,100,70,200]})
    const styles = useStyles()

    const chartConfig={
        backgroundColor: "#e26a00",
        backgroundGradientFrom: "rgba(80,0,255,1)",
        backgroundGradientTo: "rgba(0,220,240,1)",
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(255, 255, 255,.5)`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, 1)`,
        fillShadowGradient:"rgb(255,255,255)",
        fillShadowGradientOpacity:0.4,
        propsForDots: {
            r: "6",
            strokeWidth: "5",
            stroke: "rgba(100,255,240,1)"
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
                    datasets: [{
                        data: graphData.data,
                        strokeWidth:4,
                        color:(opacity=1)=>`rgba(255,255,255,.8)`,
                    }]
                }}
                width={Dimensions.get("window").width-40} 
                height={230}
                yAxisLabel="₹ "
                yAxisInterval={1}
                fromZero={true}
                chartConfig={chartConfig}
                bezier
                style={{
                    borderRadius: 10,
                }}
                decorator={toolTip}
                onDataPointClick={handleClickOnDataPoint}
                
            />

        </View>
    )
}

