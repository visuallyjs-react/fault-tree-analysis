import React, {useState} from 'react';
import {ColumnChartComponent, useVisuallyJsUpdate} from "@visuallyjs/browser-ui-react";
import type {FTANode} from "./definitions.ts";
import {computeCutSets} from "./cut-sets.ts";

const RiskContributionChart: React.FC = () => {

    const [chartData, setChartData] = useState<Array<{label:string, value:number}>>([])

    useVisuallyJsUpdate((model) => {

        const minimalCutSets = computeCutSets(model)

        // Fussell-Vesely Importance Calculation
        const mcsWithProbs = minimalCutSets.map(mcs => {
            const prob = mcs.reduce((p, event) => p * (event.probability || 0), 1);
            return { events: mcs, probability: prob };
        });

        const topEventProbability = mcsWithProbs.reduce((sum, mcs) => sum + mcs.probability, 0);

        if (topEventProbability === 0) {
            setChartData([]);
            return;
        }

        const basicEvents = model.getNodes().filter(n => n.type === 'basic-event').map(n => n.data as FTANode);

        const fvData = basicEvents.map(be => {
            const relevantMcs = mcsWithProbs.filter(mcs => mcs.events.some(event => event.id === be.id));
            const sumProb = relevantMcs.reduce((sum, mcs) => sum + mcs.probability, 0);
            const fvImportance = sumProb / topEventProbability;
            return {
                label: be.label || be.id,
                value: fvImportance
            };
        });

        setChartData(fvData);
    })

    if (chartData.length === 0) {
        return (
            <div className="vjs-fta-risk-contribution">
                <p className="vjs-fta-inspector-empty">No Basic Events with probabilities found.</p>
            </div>
        );
    }

    return (
        <div className="vjs-fta-risk-contribution">
            <div>
                <ColumnChartComponent style={{ height: '300px', width: '100%' }}
                    data={chartData}
                    options={{
                        series:[
                            {
                                valueField:"value",
                                label:"Importance"
                            }
                        ],
                        valueAxis: {
                            labelFormatter: (value) => {
                                return `${value.toFixed(1)}`;
                            }
                        },
                        categoryAxis: {
                            title: {
                                text: "Basic Events"
                            },
                            labelField:"label"
                        }
                    }}
                />
            </div>
        </div>
    );
};

export default RiskContributionChart;
