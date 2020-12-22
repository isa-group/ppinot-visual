import Modeling from 'bpmn-js/lib/features/modeling/Modeling';
import {is} from "bpmn-js/lib/util/ModelUtil";
import { isAny } from 'bpmn-js/lib/features/modeling/util/ModelingUtil';

import {label} from "./Types";

import PPINOTUpdateLabelHandler from "./handlers/PPINOTUpdateLabelHandler";
import PPINOTCreateConnectionHandler from "./handlers/PPINOTCreateConnectionHandler";
import CreateConnectionHandler from "diagram-js/lib/features/modeling/cmd/CreateConnectionHandler";


// This module is used to update labels
export default class PPINOTModeling extends Modeling {
    constructor(eventBus, elementFactory, commandStack,
                bpmnRules) {
        super(eventBus, elementFactory, commandStack, bpmnRules);
    }

    getHandlers() {
        let handlers = super.getHandlers();
        handlers['element.PPINOTUpdateLabel'] = PPINOTUpdateLabelHandler;
        // handlers['connection.create'] = PPINOTCreateConnectionHandler;


        return handlers;
    }

    updateLabel(element, newLabel, newBounds, hints) {
        let command = 'element.updateLabel'
        if(isAny(element, label) || element.type === 'label')
            command = 'element.PPINOTUpdateLabel'

        this._commandStack.execute(command, {
            element: element,
            newLabel: newLabel,
            newBounds: newBounds,
            hints: hints || {}
        });
    }

};

PPINOTModeling.$inject = [
    'eventBus',
    'elementFactory',
    'commandStack',
    'bpmnRules'
];