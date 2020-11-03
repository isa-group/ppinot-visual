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

import {custom, isCustomShape} from "./Types";


/**
 * A custom factory that knows how to create BPMN _and_ custom elements.
 */
export default function CustomElementFactory(bpmnFactory, moddle, translate) {
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

inherits(CustomElementFactory, BpmnElementFactory);

CustomElementFactory.$inject = [
  'bpmnFactory',
  'moddle',
  'translate'
];

CustomElementFactory.prototype.baseCreate = BaseElementFactory.prototype.create;

CustomElementFactory.prototype.create = function(elementType, attrs) {
  if(attrs.type1) return
  var type = attrs.type;

  if (elementType === 'label')
    return this.baseCreate(elementType, assign({ type: 'label' }, DEFAULT_LABEL_SIZE, attrs));
  else if (/^custom:/.test(type))
    return this.createCustomElement(elementType, attrs);
  else
    return this.createBpmnElement(elementType, attrs);
};

CustomElementFactory.prototype._ensureId = function(element) {

  // generate semantic ids for elements
  // bpmn:SequenceFlow -> SequenceFlow_ID


  if (!element.id) {
    let prefix = (element.type || '').replace(/^[^:]*:/g, '') + '_';
    element.id = this._moddle.ids.nextPrefixed(prefix, element);
  }
};

CustomElementFactory.prototype._initBO = function(businessObject) {
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

CustomElementFactory.prototype._createCustomBO = function(elementType, attrs) {
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
  if (isCustomShape(elementType)) {
    assign(attrs, this._getCustomElementSize(elementType));
    assign(businessObject, this._getCustomElementSize(elementType))
  }


  // we mimic the ModdleElement API to allow interoperability with
  // other components, i.e. the Modeler and Properties Panel

  businessObject = this._initBO(businessObject)

  // END minic ModdleElement API
  return businessObject
}

CustomElementFactory.prototype.createCustomElement = function(elementType, attrs) {
  var size,
      translate = this._translate;

  attrs = attrs || {};

  var businessObject = attrs.businessObject;

  if (!businessObject) {
    if (!attrs.type) {
      throw new Error(translate('no shape type specified'));
    }
    businessObject = this._createCustomBO(attrs.type, attrs)
    // size = this._getCustomElementSize(attrs.type);
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

CustomElementFactory.prototype._getCustomElementSize = function(type) {
  var shapes = {
    __default: { width: 100, height: 80 },
    'custom:Clock': { width: 50, height: 50 },
    'custom:TimeSlot': { width: 100, height: 30 },
    'custom:Resource': { width: 50, height: 75 },
    'custom:ResourceAbsence': { width: 50, height: 75 },
    'custom:Role': { width: 50, height: 75 },
    'custom:RoleAbsence': { width: 50, height: 75 },
    'custom:Group': { width: 60, height: 80 },
    'custom:GroupAbsence': { width: 60, height: 80 },
    'custom:Avion':{width: 50, height: 50},
    'custom:AggregatedMeasure':{width: 120, height: 100},
    'custom:CountAggregatedMeasure':{width: 140, height: 130},
    'custom:CountMeasure':{width: 130, height: 120},
    'custom:DataAggregatedMeasure':{width: 140, height: 140},
    'custom:DataMeasure':{width: 130, height: 130}, 
    'custom:DataPropertyConditionAggregatedMeasure':{width: 160, height: 160},
    'custom:DataPropertyConditionMeasure':{width: 130, height: 130},
    'custom:DerivedMultiInstanceMeasure':{width: 140, height: 110}
  };

  return shapes[type] || shapes.__default;
};
