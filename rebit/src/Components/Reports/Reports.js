
import React from 'react'
import CanvasJSReact from './canvasjs.react'
import {ChardDiv} from './styles'
import Header from '../Header/Header'
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
const Reports = ()=> {
    const [data, setData] = React.useState({})
    const [graphItem, setGraphItem] = React.useState(null);

    const graph =()=> {
    
            fetch('http://127.0.0.1:8082/api/spaceGraph', {
                method: "POST",
                headers: {
                  "Accept": "application/json",
                  "Content-Type": "application/json",
                }, 
                body: JSON.stringify({"email":localStorage.getItem('email')})
              }).then((result) => {
                result.json().then((resp) => {
                    const occupied= (resp.spaceOccupied/(resp.spaceOccupied+resp.spaceLeft))*100
                    const spaceRemaining= (resp.spaceLeft/(resp.spaceOccupied+resp.spaceLeft))*100
                    setData({spaceOccupied:occupied, spaceLeft:spaceRemaining})

                })
              })
            }
 
            const graph2 =()=> {
    
                fetch('http://127.0.0.1:8000/api/dashboard/filesForGraph?email="' + localStorage.getItem('email') + '" ', {
                    method: "POST",
                    headers: {
                      "Accept": "application/json",
                      "Content-Type": "application/json",
                    }, 
                  }).then((result) => {
                    result.json().then((resp) => {
                        setGraphItem(resp)
                    console.log("Report", resp)
                    })
                  })
                }
    
    React.useEffect(() => {
        graph()
      }, [])

    React.useEffect(() => {
        graph2()
      }, [])

    const chart=[]
    if(graphItem){
        console.log(graphItem)
    for(var i=0;i<graphItem.length;i++){
        chart.push({label: graphItem[i][0], y:graphItem[i][1]})
        
    }
}
    //console.log(graphItem[0])
    console.log("Chart Values" + chart)

    
    const options = {
        animationEnabled: true,
        title: {
            text: "Know Your Space Consumption"
        },
        data: [{
            type: "doughnut",
            startAngle: 75,
            toolTipContent: "<b>{label}</b>: {y}%",
            showInLegend: "true",
            legendText: "{label}",
            indexLabelFontSize: 16,
            indexLabel: "{label} - {y}%",
            dataPoints: [
                { y: data.spaceLeft, label: "Left" },
                { y: data.spaceOccupied, label: "Consumed" },
                
                // { y: occupied, label: "Consumed" },
                // { y: spaceRemaining, label: "Left" },
            ]
        }]
    }
 
    const column = {
        
        title: {
            text: "Where are your files at?"
        },
        data: [
        {
            
            type: "column",
            dataPoints: chart,
        }
        ]
    }


    return (
        <>
        <Header />
        <h1>Reports</h1>
        <ChardDiv>
            
 

            <CanvasJSChart options = {options}/>
				<CanvasJSChart options = {column}
				
			/>
			
        </ChardDiv>
        </>
    )
}

export default Reports
