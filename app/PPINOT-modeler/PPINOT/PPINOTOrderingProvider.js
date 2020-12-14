import inherits from 'inherits';
import { isAny } from 'bpmn-js/lib/features/modeling/util/ModelingUtil';

import {connections, isPPINOTConnection, isPPINOTCountMeasureElement, isPPINOTPpi} from "./Types";

import OrderingProvider from 'diagram-js/lib/features/ordering/OrderingProvider';


/**
 * a simple ordering provider that ensures that PPINOT
 * connections are always rendered on top.
 */
export default function PPINOTOrderingProvider(eventBus, canvas) {

  OrderingProvider.call(this, eventBus);

  this.getOrdering = function(element, newParent) {

    // render labels always on top
    if (element.labelTarget) {
      return {
        parent: canvas.getRootElement(),
        index: -1
      };
    }

    else if (isPPINOTConnection(element.type)) {

      // always move to end of root element
      // to display always on top
      return {
        parent: canvas.getRootElement(),
        index: -1
      };
    }
  };
}



PPINOTOrderingProvider.$inject = [ 'eventBus', 'canvas' ];

inherits(PPINOTOrderingProvider, OrderingProvider);