import {
  assign
} from 'min-dash';

import inherits from 'inherits';

import BpmnElementFactory from 'bpmn-js/lib/features/modeling/ElementFactory';
import {
  DEFAULT_LABEL_SIZE
} from 'bpmn-js/lib/util/LabelUtil';
import BaseElementFactory from "diagram-js/lib/core/ElementFactory";
import {is} from "bpmn-js/lib/util/ModelUtil";
import {isAny} from "bpmn-js/lib/features/modeling/util/ModelingUtil";

import {PPINOT, isPPINOTShape} from "./Types";


/**
 * A PPINOT factory that knows how to create BPMN _and_ PPINOT elements.
 * You can define the properties of your custom elements 
 */
export default function PPINOTElementFactory(bpmnFactory, moddle, translate) {
  BpmnElementFactory.call(this, bpmnFactory, moddle, translate);

  /**
   * Create a diagram-js element with the given type (any of shape, connection, label).
   *
   * @param  {String} elementType
   * @param  {Object} attrs
   *
   * @return {djs.model.Base}
   */
}

inherits(PPINOTElementFactory, BpmnElementFactory);

PPINOTElementFactory.$inject = [
  'bpmnFactory',
  'moddle',
  'translate'
];

PPINOTElementFactory.prototype.baseCreate = BaseElementFactory.prototype.create;

PPINOTElementFactory.prototype.create = function(elementType, attrs) {
  if(attrs.type1) return
  var type = attrs.type;

  if (elementType === 'label')
    return this.baseCreate(elementType, assign({ type: 'label' }, DEFAULT_LABEL_SIZE, attrs));
  else if (/^PPINOT:/.test(type))
    return this.createPPINOTElement(elementType, attrs);
  else
    return this.createBpmnElement(elementType, attrs);
};

PPINOTElementFactory.prototype._ensureId = function(element) {

  // generate semantic ids for elements
  // bpmn:SequenceFlow -> SequenceFlow_ID


  if (!element.id) {
    let prefix = (element.type || '').replace(/^[^:]*:/g, '') + '_';
    element.id = this._moddle.ids.nextPrefixed(prefix, element);
  }
};

PPINOTElementFactory.prototype._initBO = function(businessObject) {
  Object.defineProperty(businessObject, '$model', {
    value: this._moddle
  });

  // ensures we can use ModelUtil#is for type checks
  Object.defineProperty(businessObject, '$instanceOf', {
    value: function(type) {
      return this.type === type;
    }
  });

  Object.defineProperty(businessObject, 'get', {
    value: function(key) {
      return this[key];
    }
  });


  Object.defineProperty(businessObject, 'set', {
    value: function(key, value) {
      return this[key] = value;
    }
  });

  return businessObject
}

PPINOTElementFactory.prototype._createPPINOTBO = function(elementType, attrs) {
  let businessObject = Object.assign({}, attrs.businessObject)
  if (!businessObject.type)
    businessObject.type = elementType

  if(!attrs.id)
    this._ensureId(attrs)

  if (attrs.id && !businessObject.id) {
    assign(businessObject, {
      id: attrs.id
    });
  }


  // add width and height if shape
  if (isPPINOTShape(elementType)) {
    assign(attrs, this._getPPINOTElementSize(elementType));
    assign(businessObject, this._getPPINOTElementSize(elementType))
  }


  // we mimic the ModdleElement API to allow interoperability with
  // other components, i.e. the Modeler and Properties Panel

  businessObject = this._initBO(businessObject)

  // END minic ModdleElement API
  return businessObject
}

PPINOTElementFactory.prototype.createPPINOTElement = function(elementType, attrs) {
  var size,
      translate = this._translate;

  attrs = attrs || {};

  var businessObject = attrs.businessObject;

  if (!businessObject) {
    if (!attrs.type) {
      throw new Error(translate('no shape type specified'));
    }
    businessObject = this._createPPINOTBO(attrs.type, attrs)
    // size = this._getPPINOTElementSize(attrs.type);
    // businessObject = assign(businessObject, size);
  }
  else
    businessObject = this._initBO(businessObject)

  attrs = assign({
    businessObject: businessObject,
    id: businessObject.id
  }, size ? size : {}, attrs);

  return this.baseCreate(elementType, attrs);
};

// Here, you can define the dimensions of you custom elements
// If you don not define some dimensions, the default values are width: 100, height: 80
PPINOTElementFactory.prototype._getPPINOTElementSize = function(type) {
  var shapes = {
    __default: { width: 100, height: 80 },
    'PPINOT:AggregatedMeasure':{width: 120, height: 100},
    'PPINOT:CountAggregatedMeasure':{width: 140, height: 130},
    'PPINOT:TimeAggregatedMeasure':{width: 130, height: 125},
    'PPINOT:CyclicTimeAggregatedMeasure':{width: 130, height: 125},
    'PPINOT:CountMeasure':{width: 130, height: 120},
    'PPINOT:DataAggregatedMeasure':{width: 150, height: 130},
    'PPINOT:DataMeasure':{width: 120, height: 120}, 
    'PPINOT:DataPropertyConditionAggregatedMeasure':{width: 130, height: 140},
    'PPINOT:DataPropertyConditionMeasure':{width: 130, height: 130},
    'PPINOT:DerivedMultiInstanceMeasure':{width: 140, height: 110},
    'PPINOT:DerivedSingleInstanceMeasure':{width: 130, height: 120},
    'PPINOT:TimeMeasure':{width: 120, height: 110},
    'PPINOT:CyclicTimeMeasure':{width: 120, height: 110},
    'PPINOT:Ppi':{width: 470, height: 380},
    'PPINOT:StateConditionMeasure':{width: 130, height: 120},
    'PPINOT:StateConditionAggregatedMeasure':{width: 140, height: 130},
    'PPINOT:Target':{width: 180, height: 70},
    'PPINOT:Scope':{width: 180, height: 60},
    'PPINOT:BaseMeasure':{width: 110, height: 85},
    'PPINOT:StateCondAggMeasureNumber':{width: 140, height: 130},
    'PPINOT:StateCondAggMeasurePercentage':{width: 140, height: 130},
    'PPINOT:StateCondAggMeasureAll':{width: 140, height: 130},
    'PPINOT:StateCondAggMeasureAtLeastOne':{width: 140, height: 130},
    'PPINOT:StateCondAggMeasureNo':{width: 140, height: 130},
  };

  return shapes[type] || shapes.__default;
};
