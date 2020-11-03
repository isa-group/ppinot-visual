import Modeling from 'bpmn-js/lib/features/modeling/Modeling';
import {is} from "bpmn-js/lib/util/ModelUtil";
import { isAny } from 'bpmn-js/lib/features/modeling/util/ModelingUtil';

import {label} from "./Types";

import CustomUpdateLabelHandler from "./handlers/CustomUpdateLabelHandler";
import CustomCreateConnectionHandler from "./handlers/CustomCreateConnectionHandler";
import CreateConnectionHandler from "diagram-js/lib/features/modeling/cmd/CreateConnectionHandler";

export default class CustomModeling extends Modeling {
    constructor(eventBus, elementFactory, commandStack,
                bpmnRules) {
        super(eventBus, elementFactory, commandStack, bpmnRules);
    }

    getHandlers() {
        let handlers = super.getHandlers();
        handlers['element.customUpdateLabel'] = CustomUpdateLabelHandler;
        // handlers['connection.create'] = CustomCreateConnectionHandler;


        return handlers;
    }

    updateLabel(element, newLabel, newBounds, hints) {
        let command = 'element.updateLabel'
        if(isAny(element, label) || element.type === 'label')
            command = 'element.customUpdateLabel'

        this._commandStack.execute(command, {
            element: element,
            newLabel: newLabel,
            newBounds: newBounds,
            hints: hints || {}
        });
    }

    // createShape(shape, position, target, parentIndex, hints) {
    //     //se shape !== custom chiama super, altrimenti...
    //     let val = super.createShape(shape, position, target, parentIndex, hints)
    //     console.log(val)
    //     return val
    // }

    // createConnection(source, target, parentIndex, connection, parent, hints) {
    //
    //     if (typeof parentIndex === 'object') {
    //         hints = parent;
    //         parent = connection;
    //         connection = parentIndex;
    //         parentIndex = undefined;
    //     }
    //
    //     console.log(connection)
    //
    //     connection = this._create('connection', connection);
    //
    //     var context = {
    //         source: source,
    //         target: target,
    //         parent: parent,
    //         parentIndex: parentIndex,
    //         connection: connection,
    //         hints: hints
    //     };
    //
    //     this._commandStack.execute('connection.create', context);
    //
    //     return context.connection;
    // };
    //
    // connect(source, target, attrs, hints) {
    //     return this.createConnection(source, target,attrs || {}, source.parent, hints);
    // };
};

CustomModeling.$inject = [
    'eventBus',
    'elementFactory',
    'commandStack',
    'bpmnRules'
];