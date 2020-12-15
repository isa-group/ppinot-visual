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

import {resourceArcElements, myConnectionElements, aggreagatedElements, isPPINOTConnection} from "./Types";
import { remove, replace } from 'tiny-svg';
import {
    isDifferentType
  } from "bpmn-js/lib/features/popup-menu/util/TypeUtil"; 
import PPINOTModeling from './PPINOTModeling' ;



export default function PPINOTContextPadProvider(contextPad, popupMenu, canvas, config, injector, elementFactory, connect, create, translate, modeling) {

    injector.invoke(ContextPadProvider, this);

    this._contextPad = contextPad;
    this._popupMenu = popupMenu;
    this._canvas = canvas;
    this._modeling = modeling;

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

    function appendConnectAction(type, className, title) {
        if (typeof title !== 'string') {
            title = translate('Append {type}', { type: type.replace(/^PPINOT:/, '') });
        }

        function connectStart(event, element, autoActivate) {
            connect.PPINOTStart(event, element, type, elementFactory, autoActivate);
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
      connect.PPINOTStart(event, element, 'PPINOT:ConsequenceFlow', autoActivate);
    }

    function startConnectConsequenceTimed(event, element, autoActivate) {
      connect.PPINOTStart2(event, element, 'PPINOT:ConsequenceTimedFlow', elementFactory, autoActivate);
    }

    function startConnectTimeDistance(event, element, autoActivate) {
        connect.PPINOTStart2(event, element, 'PPINOT:ConsequenceTimedFlow', elementFactory, autoActivate);
    }


    if(isAny(businessObject, aggreagatedElements) && element.type !== 'label') {
        assign(actions, {
            'connect1': appendConnectAction(
                'PPINOT:AggregatedConnection',
                'icon-aggregates',
                'Aggregated connection'
            ),
            'connect10': appendConnectAction(
                'PPINOT:IsGroupedBy',
                'icon-isGroupedBy',
                'GroupedBy connection'
            ),
        });
    }

    if(is(businessObject, 'PPINOT:StateConditionAggregatedMeasure')
        ||  is(businessObject, 'PPINOT:StateConditionMeasure')
        ||  is(businessObject, 'PPINOT:CountMeasure') 
        ||  is(businessObject, 'PPINOT:DataMeasure')&& element.type !== 'label') {
        assign(actions, {
            'connect2': appendConnectAction(
                'PPINOT:DashedLine',
                'icon-dashed-line',
                'State connection'
            ),        
        });
    }

    // ESTO CREO QUE HAY QUE MODIFICAR PARA VARIAS CONEXIONES
    
    if(is(businessObject, 'bpmn:BaseElement') && element.type !== 'label') {
        assign(actions, {
            'connect3': appendConnectAction(
                'PPINOT:ConsequenceFlow',
                'bpmn-icon-connection-multi',
                'Connect using PPINOT connection'
            ),
            'connect4': appendConnectAction(
                'PPINOT:ConsequenceTimedFlow',
                'bpmn-icon-connection-multi',
                'Connection'
            ),
            'connect5': appendConnectAction(
                'PPINOT:TimeDistance',
                'bpmn-icon-connection-multi',
                'Connect using PPINOT connection'
            ),
        });
    }

    if(is(businessObject, 'PPINOT:TimeMeasure') 
    || is(businessObject, 'PPINOT:CyclicTimeMeasure')
    && element.type !== 'label') {
        assign(actions, {
            'connect6': appendConnectAction(
                'PPINOT:ToConnection',
                'icon-toConnector',
                'Connect using To connection'
            ),
            'connect7': appendConnectAction(
                'PPINOT:FromConnection',
                'icon-fromConnector',
                'Connect using From connection'
            ),
            'connect8': appendConnectAction(
                'PPINOT:MyConnection',
                'bpmn-icon-connection',
                'PPINOT connection'
            ),
        });
    }

    if(is(businessObject, 'PPINOT:CountMeasure') 
    || is(businessObject, 'PPINOT:CountAggregatedMeasure')
    && element.type !== 'label') {
        assign(actions, {
            'connect6': appendConnectAction(
                'PPINOT:StartConnection',
                'icon-startConnector',
                'Connect using Start connection'
            ),
            'connect7': appendConnectAction(
                'PPINOT:EndConnection',
                'icon-endConnector',
                'Connect using End connection'
            ),
        });
    }

    if(is(businessObject, 'bpmn:DataObjectReference') 
    && element.type !== 'label') {
        assign(actions, {
            'connect14': appendConnectAction(
                'PPINOT:RFCStateConnection',
                'icon-dashed-line',
                'Connect using RFC state connection'
            ),
        });
    }

    if(isAny(businessObject, myConnectionElements) && element.type !== 'label') {
        assign(actions, {
            'connect9': appendConnectAction(
                'PPINOT:MyConnection',
                'bpmn-icon-connection',
                'PPINOT connection'
            ),
        });
    }

    return actions;
  };
}

inherits(PPINOTContextPadProvider, ContextPadProvider);

PPINOTContextPadProvider.$inject = [
    'contextPad',
    'popupMenu',
    'canvas',
    'config',
    'injector',
    'elementFactory',
    'connect',
    'create',
    'translate',
    'modeling'
];