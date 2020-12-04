export const label = [
    'custom:Resource',
    'custom:ResourceAbsence',
    'custom:Role',
    'custom:RoleAbsence',
    'custom:Group',
    'custom:GroupAbsence',
    'custom:Clock',
    'custom:TimeSlot',
    'custom:Avion',
    'custom:AggregatedMeasure',
    'custom:CountAggregatedMeasure',
    'custom:CountMeasure',
    'custom:DataAggregatedMeasure',
    'custom:DataMeasure',
    'custom:DataPropertyConditionAggregatedMeasure',
    'custom:DataPropertyConditionMeasure',
    'custom:DerivedMultiInstanceMeasure',
    'custom:DerivedSingleInstanceMeasure',
    'custom:TimeMeasure',

    'custom:MyConnection',
    'custom:DashedLine',
    'custom:AggregatedConnection',
    'custom:GroupedBy',
    'custom:ToConnection',
    'custom:FromConnection',
    'custom:Ppi',
    'custom:StateConditionMeasure',
    'custom:StateConditionAggregatedMeasure',
    'custom:Target'
    
]

export const externalLabel = [
    'custom:Resource',
    'custom:ResourceAbsence',
    'custom:Role',
    'custom:RoleAbsence',
    'custom:Group',
    'custom:GroupAbsence',
    'custom:Clock',
    'custom:Avion',
    'custom:Ppi',
    'custom:MyConnection',
    'custom:DashedLine',
    'custom:AggregatedConnection',
    'custom:GroupedBy',
    'custom:ToConnection',
    'custom:FromConnection',
    'custom:AggregatedMeasure',
    'custom:CountAggregatedMeasure',
    'custom:CountMeasure',
    //'custom:DataAggregatedMeasure',
    'custom:DataMeasure',
    'custom:TimeMeasure',
    // 'custom:DataPropertyConditionAggregatedMeasure'
    'custom:StateConditionMeasure'
    //'custom:StateConditionAggregatedMeasure',

]

export const connections = [
    'custom:ResourceArc',
    'custom:ConsequenceFlow',
    'custom:TimeDistanceArcStart',
    'custom:TimeDistanceArcEnd',

    'custom:MyConnection',
    'custom:DashedLine',
    'custom:AggregatedConnection',
    'custom:GroupedBy',
    'custom:ToConnection',
    'custom:FromConnection'

    
]

export const directEdit = [
    // 'custom:Resource',
    // 'custom:Role',
    // 'custom:Group',
    'custom:Clock',
    'custom:TimeSlot',
    'custom:Avion',
    'custom:Target',
    'custom:AggregatedMeasure',
    'custom:CountAggregatedMeasure',
    'custom:CountMeasure',
    'custom:DataAggregatedMeasure',
    'custom:DataMeasure',
    'custom:DataPropertyConditionAggregatedMeasure',
    'custom:DataPropertyConditionMeasure',
    'custom:DerivedMultiInstanceMeasure',
    'custom:DerivedSingleInstanceMeasure',
    'custom:TimeMeasure',
    'custom:Ppi',
    'custom:MyConnection',
    'custom:DashedLine',
    'custom:AggregatedConnection',
    'custom:GroupedBy',
    'custom:ToConnection',
    'custom:FromConnection',
    'custom:StateConditionMeasure',
    'custom:StateConditionAggregatedMeasure'
]

export const myConnectionElements = [
    'custom:Avion',
    'custom:AggregatedMeasure',
    'custom:CountAggregatedMeasure',
    'custom:CountMeasure',
    'custom:DataAggregatedMeasure',
    'custom:DataMeasure',
    'custom:DataPropertyConditionAggregatedMeasure',
    'custom:DataPropertyConditionMeasure',
    'custom:DerivedMultiInstanceMeasure',
    'custom:DerivedSingleInstanceMeasure',
    'custom:Ppi',
    'custom:StateConditionMeasure',
    'custom:StateConditionAggregatedMeasure'
    
]



export const aggreagatedElements = [
    'custom:AggregatedMeasure',
    'custom:CountAggregatedMeasure',
    'custom:DataAggregatedMeasure',
    'custom:StateConditionAggregatedMeasure',
    'custom:DataPropertyConditionAggregatedMeasure',
    'custom:DerivedMultiInstanceMeasure',
]

export const timeMeasuresElements = [
    //'custom:TimeMeasure'  //no esta implementada
]
export const countMeasuresElements = [
    'custom:CountMeasure'  //no esta implementada
]
export const ppiElement = [
    'custom:Ppi',
    // 'custom:CountMeasure',
    // 'custom:DataMeasure'

]
export const resourceArcElements = [
    'custom:Clock',
    'custom:Resource',
    'custom:ResourceAbsence',
    'custom:Role',
    'custom:RoleAbsence',
    'custom:Group',
    'custom:GroupAbsence',
    'custom:TimeSlot',
    'custom:Avion',
    'custom:AggregatedMeasure',
    'custom:CountAggregatedMeasure',
    'custom:CountMeasure',
    'custom:DataAggregatedMeasure',
    'custom:DataMeasure',
    'custom:DataPropertyConditionAggregatedMeasure',
    'custom:DataPropertyConditionMeasure',
    'custom:DerivedMultiInstanceMeasure',
    'custom:DerivedSingleInstanceMeasure',
    'custom:TimeMeasure',
    'custom:StateConditionMeasure',
    'custom:StateConditionAggregatedMeasure'
]

export const custom = [
    'custom:Clock',
    'custom:Resource',
    'custom:ResourceAbsence',
    'custom:Role',
    'custom:RoleAbsence',
    'custom:Group',
    'custom:GroupAbsence',
    'custom:TimeSlot',
    'custom:ResourceArc',
    'custom:ConsequenceFlow',
    'custom:TimeDistanceArcStart',
    'custom:TimeDistanceArcEnd',
    'custom:Avion',
    'custom:AggregatedMeasure',
    'custom:CountAggregatedMeasure',
    'custom:CountMeasure',
    'custom:DataAggregatedMeasure',
    'custom:DataMeasure',
    'custom:DataPropertyConditionAggregatedMeasure',
    'custom:DataPropertyConditionMeasure',
    'custom:DerivedMultiInstanceMeasure',
    'custom:DerivedSingleInstanceMeasure',
    'custom:TimeMeasure',

    'custom:MyConnection',
    'custom:DashedLine',
    'custom:AggregatedConnection',
    'custom:GroupedBy',
    'custom:ToConnection',
    'custom:FromConnection',
    'custom:Ppi',
    'custom:StateConditionMeasure',
    'custom:StateConditionAggregatedMeasure'

    
]

export function isExternalLabel(type) {
    if (typeof type === 'object') {
        type = type.type
    }
    return externalLabel.includes(type)
}

export function isCustomShape(type) {
    if (typeof type === 'object')
        type = type.type

    return type.includes('custom:') && !connections.includes(type)
}

export function isCustomConnection(type) {
    if (typeof type === 'object') {
        type = type.type
    }
    return type.includes('custom:') && connections.includes(type)
}

export function isCustomResourceArcElement(type) {
    if (typeof type === 'object') {
        type = type.type
    }
    return resourceArcElements.includes(type)
}

export function isCustomMyConnectionElement(type) {
    if (typeof type === 'object') {
        type = type.type
    }
    return myConnectionElements.includes(type)
}

export function isCustomAggregatedElement(type) {
    if (typeof type === 'object') {
        type = type.type
    }
    return aggreagatedElements.includes(type)
}

export function isCustomTimeMeasureElement(type) {
    if (typeof type === 'object') {
        type = type.type
    }
    return timeMeasuresElements.includes(type)
}
export function isCustomCountMeasureElement(type) {
    if (typeof type === 'object') {
        type = type.type
    }
    return countMeasuresElements.includes(type)
}

export function isCustomPpi(type) {
    if (typeof type === 'object') {
        type = type.type
    }
    return ppiElement.includes(type)
}
