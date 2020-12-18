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

import {resourceArcElements, myConnectionElements, aggreagatedElements, baseMeasureElements} from "./Types";
import { remove, replace } from 'tiny-svg';
import {
    isDifferentType
  } from "bpmn-js/lib/features/popup-menu/util/TypeUtil"; 
import PPINOTModeling from './PPINOTModeling' ;


// This module is used to show buttons in the menu of element in the diagram
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

    // With this function you can append some elements to other element in the diagram automatically
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

    // With this function you can append some connections to an element in the diagram automatically
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



    // In this case, if the element (businessObject) is any of aggregatedElements and it is not a label
    // the corresponding buttons appear in the element when you click on it
    // ---- Note: The elements included in aggregatedElements are defined in Types.js 
    if(isAny(businessObject, aggreagatedElements) && element.type !== 'label') {
        assign(actions, {
            'connect1': appendConnectAction(
                'PPINOT:AggregatedConnection', // Connection type that you want to append to element
                'icon-aggregates', // Icon displayed on element as button
                'Connect using aggregates connection' // Description that appears if you put the mouse over the button
            ),
            'connect2': appendConnectAction( // Append second connection to element
                'PPINOT:IsGroupedBy',
                'icon-isGroupedBy',
                'Connect using isGroupedBy connection'
            ),
        });
    }

    // In this case, if the element (businessObject) is some of these and it is not a label,
    // the follow button appear in the element when you click on it
    if(is(businessObject, 'PPINOT:StateConditionAggregatedMeasure')
        ||  is(businessObject, 'PPINOT:StateConditionMeasure')
        ||  is(businessObject, 'PPINOT:CountMeasure') 
        ||  is(businessObject, 'PPINOT:DataMeasure')&& element.type !== 'label') {
        assign(actions, {
            'connect3': appendConnectAction(
                'PPINOT:DashedLine',
                'icon-dashed-line',
                'Connect using State connection'
            ),        
        });
    }
    

    if(is(businessObject, 'PPINOT:TimeMeasure') 
    || is(businessObject, 'PPINOT:CyclicTimeMeasure')
    && element.type !== 'label') {
        assign(actions, {
            'connect7': appendConnectAction(
                'PPINOT:ToConnection',
                'icon-toConnector',
                'Connect using To connection'
            ),
            'connect8': appendConnectAction(
                'PPINOT:FromConnection',
                'icon-fromConnector',
                'Connect using From connection'
            ),
            'connect9': appendConnectAction(
                'PPINOT:MyConnection',
                'bpmn-icon-connection',
                'Connection between PPINOT elements'
            ),
        });
    }

    if(is(businessObject, 'PPINOT:CountMeasure') 
    || is(businessObject, 'PPINOT:CountAggregatedMeasure')
    && element.type !== 'label') {
        assign(actions, {
            'connect10': appendConnectAction(
                'PPINOT:StartConnection',
                'icon-startConnector',
                'Connect using Start connection'
            ),
            'connect11': appendConnectAction(
                'PPINOT:EndConnection',
                'icon-endConnector',
                'Connect using End connection'
            ),
        });
    }

    if(is(businessObject, 'bpmn:DataObjectReference') && element.type !== 'label') {
        assign(actions, {
            'connect12': appendConnectAction(
                'PPINOT:RFCStateConnection',
                'icon-dashed-line',
                'Connect using RFC state connection'
            ),
        });
    }

    if(isAny(businessObject, myConnectionElements) && element.type !== 'label') {
        assign(actions, {
            'connect13': appendConnectAction(
                'PPINOT:MyConnection',
                'bpmn-icon-connection',
                'Connection between PPINOT elements'
            ),
        });
    }

    if(isAny(businessObject, aggreagatedElements)) {
        assign(actions, {
            'replaceDerivedMulti': {
                className: 'icon-derivedMulti-menu',
                title: translate('Replace with Derived Multi Instance Measure'),
                action: {
                    click: function(event, element){
                        let newElementData = elementFactory.createShape({ type: 'PPINOT:DerivedMultiInstanceMeasure'});
                        newElementData.x = element.x + (newElementData.width || element.width) / 2;
                        newElementData.y = element.y + (newElementData.height || element.height) / 2;
                        modeling.replaceShape(element, newElementData);
                    }
                }
            }   
        })
    } 

    if(isAny(businessObject, baseMeasureElements)) {
        assign(actions, {
            'replaceDerivedSingle': {
                className: 'icon-derivedSingle-menu',
                title: translate('Replace with Derived Multi Instance Measure'),
                action: {
                    click: function(event, element){
                        let newElementData = elementFactory.createShape({ type: 'PPINOT:DerivedSingleInstanceMeasure'});
                        newElementData.x = element.x + (newElementData.width || element.width) / 2;
                        newElementData.y = element.y + (newElementData.height || element.height) / 2;
                        modeling.replaceShape(element, newElementData);
                    }
                }
            }   
        })
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