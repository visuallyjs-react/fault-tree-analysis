import { 
    DiagramComponent, 
    DiagramPaletteComponent, 
    DiagramProvider,
    ControlsComponent
} from "@visuallyjs/browser-ui-react";
import diagramOptions from "./diagram-options"
import Inspector from "./Inspector";
import MinimalCutSets from "./MinimalCutSets";
import RiskContributionChart from "./RiskContributionChart";
import modelOptions from "./model-options.ts";

export interface FTAProps {
    url?:string
}

export default function App(props:FTAProps) {

    return (
        <DiagramProvider>
            <div className="vjs-fta-container">
                <div className="vjs-fta-left-palette">
                    <div style={{ padding: '15px', borderBottom: '1px solid #ccc', fontWeight: 'bold' }}>FTA Symbols</div>
                    <DiagramPaletteComponent allowDropOnEdge={true} showLabels={true} />
                </div>

                <div className="vjs-fta-center-canvas">
                    <DiagramComponent url={props.url} options={diagramOptions} modelOptions={modelOptions}>
                        <ControlsComponent />
                    </DiagramComponent>
                </div>

                <div className="vjs-fta-right-sidebar">
                    <div className="vjs-fta-sidebar-content">
                        <div className="vjs-fta-sidebar-section">
                            <div className="vjs-fta-sidebar-section-header">Inspector</div>
                            <Inspector />
                        </div>
                        <div className="vjs-fta-sidebar-section">
                            <div className="vjs-fta-sidebar-section-header">Cut Sets</div>
                            <MinimalCutSets />
                        </div>
                        <div className="vjs-fta-sidebar-section">
                            <div className="vjs-fta-sidebar-section-header">Risk (Fussell-Vesely)</div>
                            <RiskContributionChart />
                        </div>
                    </div>
                </div>
            </div>
        </DiagramProvider>
    );
}
