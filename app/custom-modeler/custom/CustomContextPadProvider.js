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
import { replace } from 'tiny-svg';
import {
    isDifferentType
  } from "bpmn-js/lib/features/popup-menu/util/TypeUtil"; 



export default function CustomContextPadProvider(contextPad, popupMenu, canvas, config, injector, elementFactory, connect, create, translate) {

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

    // CustomContextPadProvider.prototype.getContextPadEntries = function(element) {
    //      var self = this;
      
    //      var actions = {
    //        'set-element': {
    //          group: 'custom',
    //          className: 'icon-custom',
    //          title: 'Set Element',
    //          action: {
    //            click: function(event, element) {
    // //             // close any existing popup
    //              self._popupMenu.close();
      
    // //             // create new color-picker popup
    //              var elementPicker = self._popupMenu.create('element-picker', element);
      
    // //             // get start popup draw start position
    //              var opts = getStartPosition(self._canvas, self._contextPad, element);
      
    // //             // or fallback to current cursor position
    //              opts.cursor = {
    //                x: event.x,
    //                y: event.y
    //              };
      
    // //             // open color picker submenu popup
    //              elementPicker.open(opts, element);
    //            }
    //         }
    //       }
    //     };
      
    //     return actions;
    //   };

    //   function getStartPosition(canvas, contextPad, element) {

    //     var Y_OFFSET = 5;
      
    //     var diagramContainer = canvas.getContainer(),
    //         pad = contextPad.getPad(element).html;
      
    //     var diagramRect = diagramContainer.getBoundingClientRect(),
    //         padRect = pad.getBoundingClientRect();
      
    //     var top = padRect.top - diagramRect.top;
    //     var left = padRect.left - diagramRect.left;
      
    //     var pos = {
    //       x: left,
    //       y: top + padRect.height + Y_OFFSET
    //     };
      
    //     return pos;
     //  }

    
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



    // if (isAny(businessObject, resourceArcElements) && element.type !== 'label') {
    //     assign(actions, {
    //       'connect': {
    //           group: 'connect',
    //           className: 'bpmn-icon-connection',
    //           title: translate('Connection between measures and bpmn elements'),
    //           action: {
    //               click: startConnect,
    //               dragstart: startConnect
    //           }
    //       }
    //     });
    // }


    if(isAny(businessObject, aggreagatedElements) && element.type !== 'label') {
        assign(actions, {
            'connect1': appendConnectAction(
                'custom:AggregatedConnection',
                'bpmn-icon-conditional-flow',
                'Aggregated connection'
            ),
        });
    }

    if(is(businessObject, 'custom:StateConditionAggregatedMeasure')
        ||  is(businessObject, 'custom:StateConditionMeasure') && element.type !== 'label') {
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
                'icon-from-to-connection',
                'Connect using To connection'
            ),
            'connect7': appendConnectAction(
                'custom:FromConnection',
                'icon-from-to-connection',
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