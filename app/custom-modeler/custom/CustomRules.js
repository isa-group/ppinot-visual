import {
  reduce
} from 'min-dash';

import inherits from 'inherits';

import {
  is
} from 'bpmn-js/lib/util/ModelUtil';

import RuleProvider from 'diagram-js/lib/features/rules/RuleProvider';
import {isAny} from "bpmn-js/lib/features/modeling/util/ModelingUtil";
import {isCustomResourceArcElement, isCustomShape, isCustomMyConnectionElement, isCustomAggregatedElement, isCustomConnection} from "./Types";
import {isLabel} from "bpmn-js/lib/util/LabelUtil";

var HIGH_PRIORITY = 1500;


function isCustom(element) {
  return element && /^custom:/.test(element.type);
}

function isDefaultValid(element) {
  return element && (is(element, 'bpmn:Task') || is(element, 'bpmn:Event'))
}


/**
 * Specific rules for custom elements
 */
export default function CustomRules(eventBus) {
  RuleProvider.call(this, eventBus);

}

inherits(CustomRules, RuleProvider);

CustomRules.$inject = [ 'eventBus' ];

function canConnect(source, target, connection) {

  // only judge about custom elements
  if (!isCustom(source) && !isCustom(target)) {
    if(connection === 'custom:ConsequenceFlow') {
      if(isDefaultValid(source) && isDefaultValid(target))
        return { type: connection }
      else
        return false
    }
    else
      return; // utilizza canConnect standard
  }
  else if(is(source, 'custom:TimeSlot')) {
    if(isDefaultValid(target)) {
      if(connection === 'custom:ConsequenceFlow' || connection === 'custom:TimeDistandEndArc')
        return { type: connection }
      else
        return false
    }
    else
      return false
  }
  else if(is(target, 'custom:TimeSlot')) {
    if(isDefaultValid(source)) {
      if(connection === 'custom:TimeDistandStartArc')
        return { type: connection }
      else
        return { type: 'custom:ResourceArc' }
    }
    else
      return false
  }

  else if(is(source, 'custom:TimeMeasure') || is(source, 'custom:CyclicTimeMeasure')) {
    if(isDefaultValid(target) || is(target, 'bpmn:Participant')) {
      if(connection === 'custom:ToConnection' || connection === 'custom:FromConnection')
        return { type: connection }
      else
        return false
    }
    else
      return false
  }

  else if(is(source, 'custom:CounteMeasure') || is(source, 'custom:CountAggregatedMeasure')) {
    if(isDefaultValid(target) || is(target, 'bpmn:Participant')) {
      if(connection === 'custom:StartConnection' || connection === 'custom:EndConnection')
        return { type: connection }
      else
        return false
    }
    else
      return false
  }

  else if((isDefaultValid(source) && isCustomShape(target) && isCustomResourceArcElement(source))  || (isCustomShape(source) && isDefaultValid(target) && isCustomResourceArcElement(target)))
    return { type: 'custom:ResourceArc'
  }
  else if((isCustomShape(source) && (isCustomShape(target) )))
    return { type: 'custom:MyConnection'
  }
  else if((is(source, 'bpmn:DataObjectReference') && (isCustomConnection(target) )))
    return { type: 'custom:RFCStateConnection'
  }
  else if(is(source, 'custom:StateConditionMeasure') 
  || is(source, 'custom:StateConditionAggregatedMeasure')
  || is(source, 'custom:CountMeasure') || is(source, 'custom:DataMeasure'))
    return { type: 'custom:DashedLine'
  }
  else if((isCustomAggregatedElement(source) && isCustomShape(target)) )
    return {type: 'custom:AggregatedConnection'
  }
  else if (isCustomAggregatedElement(source) && is(target, 'bpmn:DataObjectReference') )
    return {type: 'custom:GroupedBy'
  }
  else
    return;
}

function canConnect2(source, target, connection) {
  if (nonExistingOrLabel(source) || nonExistingOrLabel(target)) {
    return null;
  }
  if(connection === 'custom:ConsequenceFlow') {
    if(isDefaultValid(source) && isDefaultValid(target))
      return { type: connection }
    else if(is(source, 'custom:TimeSlot') && isDefaultValid(target))
      return { type: connection }
    else
      return false
  }
  
  if(connection === 'custom:MyConnection'){
    return {type: connection}
  }

  else if(connection === 'custom:DashedLine') {
    if(isCustom(target) && is(source, 'custom:StateConditionMeasure') 
    || is(source, 'custom:StateCondStateConditionAggregatedMeasureitionMeasure')
    || is(source, 'custom:CountMeasure') || is(source, 'custom:DataMeasure'))
      return { type: connection }
    else
      return false
  }
  else if(connection === 'custom:TimeDistanceArcStart') {
    if(isDefaultValid(source) && is(target, 'custom:TimeSlot'))
      return { type: connection }
    else
      return false
  }
  else if(connection === 'custom:TimeDistanceArcEnd') {
    if(isDefaultValid(target) && is(source, 'custom:TimeSlot'))
      return { type: connection }
    else
      return false
  }

  else if(connection === 'custom:ToConnection') {
    if(isDefaultValid(target) || is(target, 'bpmn:Participant') && is(source, 'custom:TimeMeasure') || is(source, 'custom:CyclicTimeMeasure'))
      return { type: connection }
    else
      return false
  }
  else if(connection === 'custom:FromConnection') {
    if(isDefaultValid(target) || is(target, 'bpmn:Participant') && is(source, 'custom:TimeMeasure') || is(source, 'custom:CyclicTimeMeasure'))
      return { type: connection }
    else
      return false
  }

  else if(connection === 'custom:StartConnection') {
    if(isDefaultValid(target) || is(target, 'bpmn:Participant') && is(source, 'custom:CountMeasure') || is(source, 'custom:CountAggregatedMeasure'))
      return { type: connection }
    else
      return false
  }
  else if(connection === 'custom:EndConnection') {
    if(isDefaultValid(target) || is(target, 'bpmn:Participant') && is(source, 'custom:CountMeasure') || is(source, 'custom:CountAggregatedMeasure'))
      return { type: connection }
    else
      return false
  }
  else if(connection === 'custom:RFCStateConnection') {
    if(is(source, 'bpmn:DataObjectReference')  && isCustomConnection(target) )
      return { type: connection }
    else
      return false
  }
  else {
    if (!isCustom(source) && !isCustom(target))
      return;
    else if((isDefaultValid(source) && isCustomResourceArcElement(target)) || (isDefaultValid(target) && isCustomResourceArcElement(source))) {
      return {type: 'custom:ResourceArc'}
    }
    else if((isCustomAggregatedElement(source) && isCustomShape(target)) )
    return {type: 'custom:AggregatedConnection'
    }
    else if (isCustomAggregatedElement(source) && is(target, 'bpmn:DataObjectReference') )
      return {type: 'custom:GroupedBy'
    }
    else
      return
  }
}

CustomRules.prototype.init = function() {

  /**
   * Can shape be created on target container?
   */
  function canCreate(shape, target) {

    // only judge about custom elements
    if (!isCustom(shape)) {
      return;
    }

    var allowedContainer = is(target, 'bpmn:Process') || is(target, 'bpmn:Participant') || is(target, 'bpmn:Collaboration');

    // if (shape.type === 'custom:AggregatedMeasure') {
    //   allowedContainer = allowedContainer || is(target, 'custom:Ppi');
    // }

    if (isCustom(shape)) {
      allowedContainer = allowedContainer || is(target, 'custom:Ppi');
    }

    // allow creation on processes
    return allowedContainer;
  }

  /**
   * Can source and target be connected?
   */


  function canConnectMultiple(source, target, type) {
    if (is(target, 'bpmn:Task') && is(source, 'bpmn:Task')) {
      if(type === 'custom:ConsequenceTimedFlow')
        return {type1: 'custom:ResourceArc', type2:'custom:ConsequenceFlow'}
      else if(type === 'custom:TimeDistance')
        return {type1: 'custom:TimeDistanceArcStart', type2:'custom:TimeDistanceArcEnd'}
    }
    // }else if(is(source, 'bpmn:Task') && isDefaultValid(target)){
    //   return {type1: 'custom:ConsequenceTimedFlow', type2:'custom:RFCStateReference'}
    // }
  }


  function canReconnect(source, target, connection) {
    if(!isCustom(connection) && !isCustom(source) && !isCustom(target))
      return;
    else {
      if(connection.type === 'custom:ConsequenceFlow') {
        if(!isCustom(source) && !isCustom(target))
          return { type: connection.type }
        else if(is(source, 'custom:TimeSlot') && !isCustom(target))
          return { type: connection.type }
        else
          return false
      }
      else if(connection.type === 'custom:ResourceArc') {
        if((!isCustom(source) && isCustomShape(target)) || (isCustomShape(source) && !isCustom(target) ))
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

    // do not allow mixed movements of custom / BPMN shapes
    // if any shape cannot be moved, the group cannot be moved, too
    var allowed = reduce(shapes, function(result, s) {
      if (type === undefined) {
        type = isCustom(s);
      }

      if (type !== isCustom(s) || result === false) {
        return false;
      }

      return canCreate(s, target);
    }, undefined);

    // reject, if we have at least one
    // custom element that cannot be moved
    return allowed;
  });

  this.addRule('shape.create', HIGH_PRIORITY, function(context) {
    var target = context.target,
        shape = context.shape;

    return canCreate(shape, target);
  });

  this.addRule('shape.resize', HIGH_PRIORITY, function(context) {
    var shape = context.shape;

    if (isCustom(shape)) {
      // cannot resize custom elements
      return true;
    }
  });

  this.addRule('connection.create', HIGH_PRIORITY, function(context) {
    var source = context.source,
        target = context.target,
        type = context.type;

    if(type === 'custom:ConsequenceTimedFlow' || type === 'custom:TimeDistance')
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

CustomRules.prototype.canConnect = function (source, target, connection) {
  if (nonExistingOrLabel(source) || nonExistingOrLabel(target)) {
    return null;
  }
  return canConnect2(source, target, connection.type)

}