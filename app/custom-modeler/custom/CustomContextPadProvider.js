import inherits from 'inherits';

import ContextPadProvider from 'bpmn-js/lib/features/context-pad/ContextPadProvider';

import {is} from "bpmn-js/lib/util/ModelUtil";

import {
  isAny
} from 'bpmn-js/lib/features/modeling/util/ModelingUtil';

import {
  assign,
  bind
} from 'min-dash';
import {isLabel} from "./utils/LabelUtil";

import {resourceArcElements, myConnectionElements, aggreagatedElements} from "./Types";
import { remove, replace } from 'tiny-svg';
import {
    isDifferentType
  } from "bpmn-js/lib/features/popup-menu/util/TypeUtil"; 



export default function CustomContextPadProvider(contextPad, popupMenu, canvas, config, injector, elementFactory, connect, modeling, create, translate) {

    injector.invoke(ContextPadProvider, this);

    this._contextPad = contextPad;
    this._popupMenu = popupMenu;
    this._canvas = canvas;
    

    contextPad.registerProvider(this);

    var cached = bind(this.getContextPadEntries, this);

    let autoPlace = config.autoPlace
    if (autoPlace !== false) {
        autoPlace = injector.get('autoPlace', false);
    }

    
    function appendAction(type, className, title, options) {
        if (typeof title !== 'string') {
            options = title;
            title = translate('Append {type}', { type: type.replace(/^bpmn:/, '') });
        }

        function appendStart(event, element) {
            var shape = elementFactory.createShape(assign({ type: type }, options));
            create.start(event, shape, {
                source: element
            });
        }

        function append(event, element) {
            var shape = elementFactory.createShape(assign({ type: type }, options));

            autoPlace.append(element, shape);
        }


        return {
            group: 'model',
            className: className,
            title: title,
            action: {
                dragstart: appendStart,
                click: autoPlace ? append : appendStart
            }
        };
    }
    

    // function replaceAction(type, className, title) {

    //     function replaceElement(element) {  
    //         console.log('prueba');
    //         var shape = elementFactory.createShape(assign({ type: type }));
    //         console.log(shape);
            
    //     }


    //     return {
    //         group: 'replace',
    //         className: className,
    //         title: title,
    //         action: {
    //             click: replaceElement
    //         }
    //     };
    // }

    function appendConnectAction(type, className, title) {
        if (typeof title !== 'string') {
            title = translate('Append {type}', { type: type.replace(/^custom:/, '') });
        }

        function connectStart(event, element, autoActivate) {
            connect.customStart(event, element, type, elementFactory, autoActivate);
        }


        return {
            group: 'connect',
            className: className,
            title: title,
            action: {
                dragstart: connectStart,
                click: connectStart
            }
        };
    }

    

    this.getContextPadEntries = function(element) {
    var actions = cached(element);
    var businessObject = element.businessObject;

    function startConnect(event, element, autoActivate) {
      connect.start(event, element, autoActivate);
    }

    function startConnectConsequence(event, element, autoActivate) {
      connect.customStart(event, element, 'custom:ConsequenceFlow', autoActivate);
    }

    function startConnectConsequenceTimed(event, element, autoActivate) {
      connect.customStart2(event, element, 'custom:ConsequenceTimedFlow', elementFactory, autoActivate);
    }

    function startConnectTimeDistance(event, element, autoActivate) {
        connect.customStart2(event, element, 'custom:ConsequenceTimedFlow', elementFactory, autoActivate);
    }

    if(isAny(businessObject, aggreagatedElements) && element.type !== 'label') {
        assign(actions, {
            'connect1': appendConnectAction(
                'custom:AggregatedConnection',
                'icon-aggregates',
                'Aggregated connection'
            ),
            'connect10': appendConnectAction(
                'custom:IsGroupedBy',
                'icon-isGroupedBy',
                'GroupedBy connection'
            ),
        });
    }

    if(is(businessObject, 'custom:StateConditionAggregatedMeasure')
        ||  is(businessObject, 'custom:StateConditionMeasure')
        ||  is(businessObject, 'custom:CountMeasure') 
        ||  is(businessObject, 'custom:DataMeasure')&& element.type !== 'label') {
        assign(actions, {
            'connect2': appendConnectAction(
                'custom:DashedLine',
                'icon-dashed-line',
                'State connection'
            ),
            
        });
    }

    // ESTO CREO QUE HAY QUE MODIFICAR PARA VARIAS CONEXIONES
    
    if(is(businessObject, 'bpmn:BaseElement') && element.type !== 'label') {
        assign(actions, {
            'connect3': appendConnectAction(
                'custom:ConsequenceFlow',
                'bpmn-icon-connection-multi',
                'Connect using custom connection'
            ),
            'connect4': appendConnectAction(
                'custom:ConsequenceTimedFlow',
                'bpmn-icon-connection-multi',
                'Connection'
            ),
            'connect5': appendConnectAction(
                'custom:TimeDistance',
                'bpmn-icon-connection-multi',
                'Connect using custom connection'
            ),
        });
    }

    if(is(businessObject, 'custom:TimeMeasure') && element.type !== 'label') {
        assign(actions, {
            'connect6': appendConnectAction(
                'custom:ToConnection',
                'icon-toConnector',
                'Connect using To connection'
            ),
            'connect7': appendConnectAction(
                'custom:FromConnection',
                'icon-fromConnector',
                'Connect using From connection'
            ),
            'connect8': appendConnectAction(
                'custom:MyConnection',
                'bpmn-icon-connection',
                'Custom connection'
            ),
        });
    }

    if(isAny(businessObject, myConnectionElements) && element.type !== 'label') {
        assign(actions, {
            'connect9': appendConnectAction(
                'custom:MyConnection',
                'bpmn-icon-connection',
                'Custom connection'
            ),
        });
    }

    // if(is(businessObject, 'custom:CountMeasure')) {
    //     assign(actions, {
    //         'replace1': replaceAction(
    //             'custom:TimeMeasure',
    //             'bpmn-icon-start-event-none',
    //             'Replace with time measure'
    //         ),
    //     });
    // }

    return actions;
  };
}

inherits(CustomContextPadProvider, ContextPadProvider);

CustomContextPadProvider.$inject = [
    'contextPad',
    'popupMenu',
    'canvas',
    'config',
    'injector',
    'elementFactory',
    'connect',
    'create',
    'translate'
];