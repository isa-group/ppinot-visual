import {is} from "bpmn-js/lib/util/ModelUtil";
import {
    getLabel as basicGetLabel,
    setLabel as basicSetLabel,
} from "bpmn-js/lib/features/label-editing/LabelUtil";

import * as labelUtils from "bpmn-js/lib/util/LabelUtil"
import {isAny} from "bpmn-js/lib/features/modeling/util/ModelingUtil";
import {assign} from "min-dash";
import {DEFAULT_LABEL_SIZE, FLOW_LABEL_INDENT} from "bpmn-js/lib/util/LabelUtil";

import {label, externalLabel} from "../Types";

export function getLabel(element) {
    let semantic = element.businessObject

    if (isAny(semantic, label))
        return semantic.text;
    else
        return basicGetLabel(element)
}

export function setLabel(element, text, isExternal) {
    let semantic = element.businessObject
    if (isAny(semantic, label)) {
        semantic.text = text
        return element
    }
    else
        return basicSetLabel(element, text, isExternal)
}

/**
 * Returns true if the given semantic is an external label
 *
 * @param {BpmnElement} semantic
 * @return {Boolean} true if is label
 */
export function isLabelExternal(semantic) {
    return is(semantic, 'bpmn:Event') ||
        is(semantic, 'bpmn:Gateway') ||
        is(semantic, 'bpmn:DataStoreReference') ||
        is(semantic, 'bpmn:DataObjectReference') ||
        is(semantic, 'bpmn:DataInput') ||
        is(semantic, 'bpmn:DataOutput') ||
        is(semantic, 'bpmn:SequenceFlow') ||
        is(semantic, 'bpmn:MessageFlow') ||
        is(semantic, 'bpmn:Group') ||
        isAny(semantic, externalLabel) ;
}

export function hasExternalLabel(element) {
    return labelUtils.hasExternalLabel(element)
}

/**
 * Get the position for sequence flow labels
 *
 * @param  {Array<Point>} waypoints
 * @return {Point} the label position
 */
export function getFlowLabelPosition(waypoints) {
    return labelUtils.getFlowLabelPosition(waypoints)
}


/**
 * Get the middle of a number of waypoints
 *
 * @param  {Array<Point>} waypoints
 * @return {Point} the mid point
 */
export function getWaypointsMid(waypoints) {
    return labelUtils.getWaypointsMid(waypoints)
}


export function getExternalLabelMid(element) {
    return labelUtils.getExternalLabelMid(element)
}


/**
 * Returns the bounds of an elements label, parsed from the elements DI or
 * generated from its bounds.
 *
 * @param {BpmnElement} semantic
 * @param {djs.model.Base} element
 */
export function getExternalLabelBounds(semantic, element) {
    if(semantic.di)
        return labelUtils.getExternalLabelBounds(semantic, element)
    else {
        let mid = getExternalLabelMid(element);
        let size = DEFAULT_LABEL_SIZE;

        return assign({
            x: mid.x - size.width / 2,
            y: mid.y - size.height / 2
        }, size);
    }
}

export function isLabel(element) {
    return element && !!element.labelTarget;
}