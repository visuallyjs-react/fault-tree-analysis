import { InspectorComponent } from "@visuallyjs/browser-ui-react";
import { Node } from "@visuallyjs/browser-ui";

const Inspector: React.FC = () => {
    return (
        <InspectorComponent 
            className="inspector"
            renderEmptyContent={() => <div className="vjs-fta-inspector-empty">Select a node to edit its properties.</div>}
        >
            {(current) => {
                return (
                    <div className="vjs-fta-inspector-container">
                        
                        {current.objectType === Node.objectType && (
                            <>
                                <div className="vjs-fta-inspector-group">
                                    <label className="vjs-fta-inspector-label">Label: </label>
                                    <input 
                                        type="text" 
                                        className="vjs-fta-inspector-input"
                                        vjs-att="label"
                                        vjs-focus="true"
                                    />
                                </div>
                                
                                {current.type === 'basic-event' && (
                                    <div className="vjs-fta-inspector-group">
                                        <label className="vjs-fta-inspector-label">Probability (0-1): </label>
                                        <input 
                                            type="number" 
                                            className="vjs-fta-inspector-input"
                                            step="0.01" 
                                            min="0" 
                                            max="1" 
                                            vjs-att="probability"
                                            vjs-datatype="float"
                                        />
                                    </div>
                                )}
                            </>
                        )}
                        
                        <div className="vjs-fta-inspector-footer">
                            ID: {current.getFullId()}<br/>
                            Type: {current.type}
                        </div>
                    </div>
                );
            }}
        </InspectorComponent>
    );
};

export default Inspector;
