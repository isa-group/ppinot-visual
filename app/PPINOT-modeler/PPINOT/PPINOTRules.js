import {
  reduce
} from 'min-dash';

import inherits from 'inherits';

import {
  is
} from 'bpmn-js/lib/util/ModelUtil';

import RuleProvider from 'diagram-js/lib/features/rules/RuleProvider';
import {isAny} from "bpmn-js/lib/features/modeling/util/ModelingUtil";
import {isPPINOTResourceArcElement, isPPINOTShape, isPPINOTMyConnectionElement, isPPINOTAggregatedElement, isPPINOTConnection} from "./Types";
import {isLabel} from "bpmn-js/lib/util/LabelUtil";

var HIGH_PRIORITY = 1500;


function isPPINOT(element) {
  return element && /^PPINOT:/.test(element.type);
}

function isDefaultValid(element) {
  return element && (is(element, 'bpmn:Task') || is(element, 'bpmn:Event'))
}


/**
 * Specific rules for PPINOT elements
 */
export default function PPINOTRules(eventBus) {
  RuleProvider.call(this, eventBus);

}

inherits(PPINOTRules, RuleProvider);

PPINOTRules.$inject = [ 'eventBus' ];

function canConnect(source, target, connection) {

  // only judge about PPINOT elements
  if (!isPPINOT(source) && !isPPINOT(target)) {
    if(connection === 'PPINOT:ConsequenceFlow') {
      if(isDefaultValid(source) && isDefaultValid(target))
        return { type: connection }
      else
        return false
    }
    else
      return; // utilizza canConnect standard
  }
  else if(is(source, 'PPINOT:TimeSlot')) {
    if(isDefaultValid(target)) {
      if(connection === 'PPINOT:ConsequenceFlow' || connection === 'PPINOT:TimeDistandEndArc')
        return { type: connection }
      else
        return false
    }
    else
      return false
  }
  else if(is(target, 'PPINOT:TimeSlot')) {
    if(isDefaultValid(source)) {
      if(connection === 'PPINOT:TimeDistandStartArc')
        return { type: connection }
      else
        return { type: 'PPINOT:ResourceArc' }
    }
    else
      return false
  }

  else if(is(source, 'PPINOT:TimeMeasure') || is(source, 'PPINOT:CyclicTimeMeasure')) {
    if(isDefaultValid(target) || is(target, 'bpmn:Participant')) {
      if(connection === 'PPINOT:ToConnection' || connection === 'PPINOT:FromConnection')
        return { type: connection }
      else
        return false
    }
    else
      return false
  }

  else if(is(source, 'PPINOT:CounteMeasure') || is(source, 'PPINOT:CountAggregatedMeasure')) {
    if(isDefaultValid(target) || is(target, 'bpmn:Participant')) {
      if(connection === 'PPINOT:StartConnection' || connection === 'PPINOT:EndConnection')
        return { type: connection }
      else
        return false
    }
    else
      return false
  }

  else if((isDefaultValid(source) && isPPINOTShape(target) && isPPINOTResourceArcElement(source))  || (isPPINOTShape(source) && isDefaultValid(target) && isPPINOTResourceArcElement(target)))
    return { type: 'PPINOT:ResourceArc'
  }
  else if((isPPINOTShape(source) && (isPPINOTShape(target) )))
    return { type: 'PPINOT:MyConnection'
  }
  else if((is(source, 'bpmn:DataObjectReference') && (isPPINOTConnection(target) )))
    return { type: 'PPINOT:RFCStateConnection'
  }
  else if(is(source, 'PPINOT:StateConditionMeasure') 
  || is(source, 'PPINOT:StateConditionAggregatedMeasure')
  || is(source, 'PPINOT:CountMeasure') || is(source, 'PPINOT:DataMeasure'))
    return { type: 'PPINOT:DashedLine'
  }
  else if((isPPINOTAggregatedElement(source) && isPPINOTShape(target)) )
    return {type: 'PPINOT:AggregatedConnection'
  }
  else if (isPPINOTAggregatedElement(source) && is(target, 'bpmn:DataObjectReference') )
    return {type: 'PPINOT:GroupedBy'
  }
  else
    return;
}

function canConnect2(source, target, connection) {
  if (nonExistingOrLabel(source) || nonExistingOrLabel(target)) {
    return null;
  }
  if(connection === 'PPINOT:ConsequenceFlow') {
    if(isDefaultValid(source) && isDefaultValid(target))
      return { type: connection }
    else if(is(source, 'PPINOT:TimeSlot') && isDefaultValid(target))
      return { type: connection }
    else
      return false
  }
  
  if(connection === 'PPINOT:MyConnection'){
    return {type: connection}
  }

  else if(connection === 'PPINOT:DashedLine') {
    if(isPPINOT(target) && is(source, 'PPINOT:StateConditionMeasure') 
    || is(source, 'PPINOT:StateCondStateConditionAggregatedMeasureitionMeasure')
    || is(source, 'PPINOT:CountMeasure') || is(source, 'PPINOT:DataMeasure'))
      return { type: connection }
    else
      return false
  }
  else if(connection === 'PPINOT:TimeDistanceArcStart') {
    if(isDefaultValid(source) && is(target, 'PPINOT:TimeSlot'))
      return { type: connection }
    else
      return false
  }
  else if(connection === 'PPINOT:TimeDistanceArcEnd') {
    if(isDefaultValid(target) && is(source, 'PPINOT:TimeSlot'))
      return { type: connection }
    else
      return false
  }

  else if(connection === 'PPINOT:ToConnection') {
    if(isDefaultValid(target) || is(target, 'bpmn:Participant') && is(source, 'PPINOT:TimeMeasure') || is(source, 'PPINOT:CyclicTimeMeasure'))
      return { type: connection }
    else
      return false
  }
  else if(connection === 'PPINOT:FromConnection') {
    if(isDefaultValid(target) || is(target, 'bpmn:Participant') && is(source, 'PPINOT:TimeMeasure') || is(source, 'PPINOT:CyclicTimeMeasure'))
      return { type: connection }
    else
      return false
  }

  else if(connection === 'PPINOT:StartConnection') {
    if(isDefaultValid(target) || is(target, 'bpmn:Participant') && is(source, 'PPINOT:CountMeasure') || is(source, 'PPINOT:CountAggregatedMeasure'))
      return { type: connection }
    else
      return false
  }
  else if(connection === 'PPINOT:EndConnection') {
    if(isDefaultValid(target) || is(target, 'bpmn:Participant') && is(source, 'PPINOT:CountMeasure') || is(source, 'PPINOT:CountAggregatedMeasure'))
      return { type: connection }
    else
      return false
  }
  else if(connection === 'PPINOT:RFCStateConnection') {
    if(is(source, 'bpmn:DataObjectReference')  && isPPINOTConnection(target) )
      return { type: connection }
    else
      return false
  }
  else {
    if (!isPPINOT(source) && !isPPINOT(target))
      return;
    else if((isDefaultValid(source) && isPPINOTResourceArcElement(target)) || (isDefaultValid(target) && isPPINOTResourceArcElement(source))) {
      return {type: 'PPINOT:ResourceArc'}
    }
    else if((isPPINOTAggregatedElement(source) && isPPINOTShape(target)) )
    return {type: 'PPINOT:AggregatedConnection'
    }
    else if (isPPINOTAggregatedElement(source) && is(target, 'bpmn:DataObjectReference') )
      return {type: 'PPINOT:GroupedBy'
    }
    else
      return
  }
}

PPINOTRules.prototype.init = function() {

  /**
   * Can shape be created on target container?
   */
  function canCreate(shape, target) {

    // only judge about PPINOT elements
    if (!isPPINOT(shape)) {
      return;
    }

    var allowedContainer = is(target, 'bpmn:Process') || is(target, 'bpmn:Participant') || is(target, 'bpmn:Collaboration');

    // if (shape.type === 'PPINOT:AggregatedMeasure') {
    //   allowedContainer = allowedContainer || is(target, 'PPINOT:Ppi');
    // }

    if (isPPINOT(shape)) {
      allowedContainer = allowedContainer || is(target, 'PPINOT:Ppi');
    }

    // allow creation on processes
    return allowedContainer;
  }

  /**
   * Can source and target be connected?
   */


  function canConnectMultiple(source, target, type) {
    if (is(target, 'bpmn:Task') && is(source, 'bpmn:Task')) {
      if(type === 'PPINOT:ConsequenceTimedFlow')
        return {type1: 'PPINOT:ResourceArc', type2:'PPINOT:ConsequenceFlow'}
      else if(type === 'PPINOT:TimeDistance')
        return {type1: 'PPINOT:TimeDistanceArcStart', type2:'PPINOT:TimeDistanceArcEnd'}
    }
    // }else if(is(source, 'bpmn:Task') && isDefaultValid(target)){
    //   return {type1: 'PPINOT:ConsequenceTimedFlow', type2:'PPINOT:RFCStateReference'}
    // }
  }


  function canReconnect(source, target, connection) {
    if(!isPPINOT(connection) && !isPPINOT(source) && !isPPINOT(target))
      return;
    else {
      if(connection.type === 'PPINOT:ConsequenceFlow') {
        if(!isPPINOT(source) && !isPPINOT(target))
          return { type: connection.type }
        else if(is(source, 'PPINOT:TimeSlot') && !isPPINOT(target))
          return { type: connection.type }
        else
          return false
      }
      else if(connection.type === 'PPINOT:ResourceArc') {
        if((!isPPINOT(source) && isPPINOTShape(target)) || (isPPINOTShape(source) && !isPPINOT(target) ))
          return { type: connection.type }
        else
          return;
      }
      else {
        return canConnect(source, target, connection.type)
      }
    }

  }

  this.addRule('elements.move', HIGH_PRIORITY, function(context) {

    var target = context.target,
        shapes = context.shapes;

    var type;

    // do not allow mixed movements of PPINOT / BPMN shapes
    // if any shape cannot be moved, the group cannot be moved, too
    var allowed = reduce(shapes, function(result, s) {
      if (type === undefined) {
        type = isPPINOT(s);
      }

      if (type !== isPPINOT(s) || result === false) {
        return false;
      }

      return canCreate(s, target);
    }, undefined);

    // reject, if we have at least one
    // PPINOT element that cannot be moved
    return allowed;
  });

  this.addRule('shape.create', HIGH_PRIORITY, function(context) {
    var target = context.target,
        shape = context.shape;

    return canCreate(shape, target);
  });

  this.addRule('shape.resize', HIGH_PRIORITY, function(context) {
    var shape = context.shape;

    if (isPPINOT(shape)) {
      // cannot resize PPINOT elements
      return true;
    }
  });

  this.addRule('connection.create', HIGH_PRIORITY, function(context) {
    var source = context.source,
        target = context.target,
        type = context.type;

    if(type === 'PPINOT:ConsequenceTimedFlow' || type === 'PPINOT:TimeDistance')
      return canConnectMultiple(source, target, type)

    return canConnect2(source, target, type);
  });

  this.addRule('connection.reconnectStart', HIGH_PRIORITY*2, function(context) {
    var connection = context.connection,
        source = context.hover || context.source,
        target = connection.target;

    return canConnect2(source, target, connection.type);
  });

  this.addRule('connection.reconnectEnd', HIGH_PRIORITY*2, function(context) {
    var connection = context.connection,
        source = connection.source,
        target = context.hover || context.target;
    return canConnect2(source, target, connection.type);
  });

};

function nonExistingOrLabel(element) {
  return !element || isLabel(element);
}

PPINOTRules.prototype.canConnect = function (source, target, connection) {
  if (nonExistingOrLabel(source) || nonExistingOrLabel(target)) {
    return null;
  }
  return canConnect2(source, target, connection.type)

}