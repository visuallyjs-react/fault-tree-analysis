import {useState} from 'react';
import {useVisuallyJsUpdate} from "@visuallyjs/browser-ui-react";
import {type VisuallyJsModel} from "@visuallyjs/browser-ui";
import type { FTANode } from "./definitions";
import {computeCutSets} from "./cut-sets.ts";

const MinimalCutSets: React.FC = () => {
    const [minimalCutSets, setMinimalCutSets] = useState<Array<Array<FTANode>>>([]);

    useVisuallyJsUpdate((model: VisuallyJsModel) => {
        setMinimalCutSets(computeCutSets(model));
    })

    return (
        <div className="minimal-cut-sets">
            {minimalCutSets.length === 0 ? (
                <p className="vjs-fta-inspector-empty">No cut sets found.</p>
            ) : (
                <div className="vjs-fta-cut-sets-list">
                    {minimalCutSets.map((set, i) => (
                        <div key={i} className="vjs-fta-cut-set">
                            <div className="vjs-fta-cut-set-index">#{i + 1}</div>
                            <div className="vjs-fta-cut-set-events">
                                {set.map(be => (
                                    <span key={be.id} className="vjs-fta-cut-set-event">
                                        {be.label || be.id}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <p className="vjs-fta-cut-sets-note"><i>Note: This is a static, combinatorial analysis. It does not account for event sequence or timing.</i></p>
        </div>
    );
};

export default MinimalCutSets;
