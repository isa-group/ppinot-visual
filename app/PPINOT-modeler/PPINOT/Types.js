// In this module you have to define groups of elements which you will use them to 
// create connection and to add labels to elements

// The elements which are included in "label" will have a label
export const label = [
    'PPINOT:Resource',
    'PPINOT:ResourceAbsence',
    'PPINOT:Role',
    'PPINOT:RoleAbsence',
    'PPINOT:Group',
    'PPINOT:GroupAbsence',
    'PPINOT:Clock',
    'PPINOT:TimeSlot',
    'PPINOT:Avion',
    'PPINOT:AggregatedMeasure',
    'PPINOT:TimeAggregatedMeasure',
    'PPINOT:CyclicTimeAggregatedMeasure',
    'PPINOT:CountAggregatedMeasure',
    'PPINOT:CountMeasure',
    'PPINOT:DataAggregatedMeasure',
    'PPINOT:DataMeasure',
    'PPINOT:DataPropertyConditionAggregatedMeasure',
    'PPINOT:DataPropertyConditionMeasure',
    'PPINOT:DerivedMultiInstanceMeasure',
    'PPINOT:DerivedSingleInstanceMeasure',
    'PPINOT:TimeMeasure',
    'PPINOT:CyclicTimeMeasure',
    'PPINOT:BaseMeasure',
    'PPINOT:MyConnection',
    'PPINOT:StartConnection',
    'PPINOT:EndConnection',
    'PPINOT:DashedLine',
    'PPINOT:AggregatedConnection',
    'PPINOT:GroupedBy',
    'PPINOT:ToConnection',
    'PPINOT:FromConnection',
    'PPINOT:Ppi',
    'PPINOT:StateConditionMeasure',
    'PPINOT:StateConditionAggregatedMeasure',
    'PPINOT:Target',
    'PPINOT:Scope',
    'PPINOT:RFCStateConnection',
    'PPINOT:StateCondAggMeasureNumber',
    'PPINOT:StateCondAggMeasurePercentage',
    'PPINOT:StateCondAggMeasureAll',
    'PPINOT:StateCondAggMeasureAtLeastOne',
    'PPINOT:StateCondAggMeasureNo',
    'PPINOT:CyclicTimeAggregatedMeasureMAX',
    'PPINOT:CyclicTimeAggregatedMeasureSUM',
    'PPINOT:CyclicTimeAggregatedMeasureMIN',
    'PPINOT:CyclicTimeAggregatedMeasureAVG',
    'PPINOT:CyclicTimeMeasureSUM',
    'PPINOT:CyclicTimeMeasureMAX',
    'PPINOT:CyclicTimeMeasureMIN',
    'PPINOT:CyclicTimeMeasureAVG',
    'PPINOT:TimeAggregatedMeasureSUM',
    'PPINOT:TimeAggregatedMeasureMAX',
    'PPINOT:TimeAggregatedMeasureMIN',
    'PPINOT:TimeAggregatedMeasureAVG',
    'PPINOT:CountAggregatedMeasureSUM',
    'PPINOT:CountAggregatedMeasureMAX',
    'PPINOT:CountAggregatedMeasureMIN',
    'PPINOT:CountAggregatedMeasureAVG',
    'PPINOT:DataAggregatedMeasureSUM',
    'PPINOT:DataAggregatedMeasureMAX',
    'PPINOT:DataAggregatedMeasureMIN',
    'PPINOT:DataAggregatedMeasureAVG',
    'PPINOT:AggregatedMeasureSUM',
    'PPINOT:AggregatedMeasureMAX',
    'PPINOT:AggregatedMeasureMIN',
    'PPINOT:AggregatedMeasureAVG'
]

// The elements which are included in "externalLabel" will have an external label
export const externalLabel = [
    'PPINOT:Resource',
    'PPINOT:ResourceAbsence',
    'PPINOT:Role',
    'PPINOT:RoleAbsence',
    'PPINOT:Group',
    'PPINOT:GroupAbsence',
    'PPINOT:Clock',
    'PPINOT:Avion',
    'PPINOT:Ppi',
    'PPINOT:MyConnection',
    'PPINOT:StartConnection',
    'PPINOT:EndConnection',
    'PPINOT:DashedLine',
    'PPINOT:AggregatedConnection',
    'PPINOT:GroupedBy',
    'PPINOT:ToConnection',
    'PPINOT:FromConnection',
    'PPINOT:AggregatedMeasure',
    'PPINOT:TimeAggregatedMeasure',
    'PPINOT:CyclicTimeAggregatedMeasure',
    'PPINOT:CountAggregatedMeasure',
    'PPINOT:CountMeasure',
    'PPINOT:DataAggregatedMeasure',
    'PPINOT:DataMeasure',
    'PPINOT:TimeMeasure',
    'PPINOT:CyclicTimeMeasure',
    'PPINOT:BaseMeasure',
    'PPINOT:StateConditionMeasure',
    'PPINOT:StateConditionAggregatedMeasure',
    'PPINOT:RFCStateConnection',
    'PPINOT:StateCondAggMeasureNumber',
    'PPINOT:StateCondAggMeasurePercentage',
    'PPINOT:StateCondAggMeasureAll',
    'PPINOT:StateCondAggMeasureAtLeastOne',
    'PPINOT:StateCondAggMeasureNo',
    'PPINOT:CyclicTimeAggregatedMeasureMAX',
    'PPINOT:CyclicTimeAggregatedMeasureSUM',
    'PPINOT:CyclicTimeAggregatedMeasureMIN',
    'PPINOT:CyclicTimeAggregatedMeasureAVG',
    'PPINOT:CyclicTimeMeasureSUM',
    'PPINOT:CyclicTimeMeasureMAX',
    'PPINOT:CyclicTimeMeasureMIN',
    'PPINOT:CyclicTimeMeasureAVG',
    'PPINOT:TimeAggregatedMeasureSUM',
    'PPINOT:TimeAggregatedMeasureMAX',
    'PPINOT:TimeAggregatedMeasureMIN',
    'PPINOT:TimeAggregatedMeasureAVG',
    'PPINOT:CountAggregatedMeasureSUM',
    'PPINOT:CountAggregatedMeasureMAX',
    'PPINOT:CountAggregatedMeasureMIN',
    'PPINOT:CountAggregatedMeasureAVG',
    'PPINOT:DataAggregatedMeasureSUM',
    'PPINOT:DataAggregatedMeasureMAX',
    'PPINOT:DataAggregatedMeasureMIN',
    'PPINOT:DataAggregatedMeasureAVG',
    'PPINOT:AggregatedMeasureSUM',
    'PPINOT:AggregatedMeasureMAX',
    'PPINOT:AggregatedMeasureMIN',
    'PPINOT:AggregatedMeasureAVG'
]

// The elements which are included in "connections" will be connections 
export const connections = [
    'PPINOT:ResourceArc',
    'PPINOT:ConsequenceFlow',
    'PPINOT:TimeDistanceArcStart',
    'PPINOT:TimeDistanceArcEnd',
    'PPINOT:RFCStateConnection',
    'PPINOT:MyConnection',
    'PPINOT:DashedLine',
    'PPINOT:AggregatedConnection',
    'PPINOT:GroupedBy',
    'PPINOT:ToConnection',
    'PPINOT:FromConnection',
    'PPINOT:StartConnection',
    'PPINOT:EndConnection',    
]

// The elements which are included in "directEdit" will have an editable label
export const directEdit = [
    'PPINOT:Target',
    'PPINOT:Scope',
    'PPINOT:AggregatedMeasure',
    'PPINOT:TimeAggregatedMeasure',
    'PPINOT:CyclicTimeAggregatedMeasure',
    'PPINOT:CountAggregatedMeasure',
    'PPINOT:CountMeasure',
    'PPINOT:DataAggregatedMeasure',
    'PPINOT:DataMeasure',
    'PPINOT:DataPropertyConditionAggregatedMeasure',
    'PPINOT:DataPropertyConditionMeasure',
    'PPINOT:DerivedMultiInstanceMeasure',
    'PPINOT:DerivedSingleInstanceMeasure',
    'PPINOT:TimeMeasure',
    'PPINOT:CyclicTimeMeasure',
    'PPINOT:Ppi',
    'PPINOT:MyConnection',
    'PPINOT:StartConnection',
    'PPINOT:EndConnection',
    'PPINOT:DashedLine',
    'PPINOT:AggregatedConnection',
    'PPINOT:GroupedBy',
    'PPINOT:ToConnection',
    'PPINOT:FromConnection',
    'PPINOT:StateConditionMeasure',
    'PPINOT:StateConditionAggregatedMeasure',
    'PPINOT:BaseMeasure',
    'PPINOT:RFCStateConnection',
    'PPINOT:StateCondAggMeasureNumber',
    'PPINOT:StateCondAggMeasurePercentage',
    'PPINOT:StateCondAggMeasureAll',
    'PPINOT:StateCondAggMeasureAtLeastOne',
    'PPINOT:StateCondAggMeasureNo',
    'PPINOT:CyclicTimeAggregatedMeasureMAX',
    'PPINOT:CyclicTimeAggregatedMeasureSUM',
    'PPINOT:CyclicTimeAggregatedMeasureMIN',
    'PPINOT:CyclicTimeAggregatedMeasureAVG',
    'PPINOT:CyclicTimeMeasureSUM',
    'PPINOT:CyclicTimeMeasureMAX',
    'PPINOT:CyclicTimeMeasureMIN',
    'PPINOT:CyclicTimeMeasureAVG',
    'PPINOT:TimeAggregatedMeasureSUM',
    'PPINOT:TimeAggregatedMeasureMAX',
    'PPINOT:TimeAggregatedMeasureMIN',
    'PPINOT:TimeAggregatedMeasureAVG',
    'PPINOT:CountAggregatedMeasureSUM',
    'PPINOT:CountAggregatedMeasureMAX',
    'PPINOT:CountAggregatedMeasureMIN',
    'PPINOT:CountAggregatedMeasureAVG',
    'PPINOT:DataAggregatedMeasureSUM',
    'PPINOT:DataAggregatedMeasureMAX',
    'PPINOT:DataAggregatedMeasureMIN',
    'PPINOT:DataAggregatedMeasureAVG',
    'PPINOT:AggregatedMeasureSUM',
    'PPINOT:AggregatedMeasureMAX',
    'PPINOT:AggregatedMeasureMIN',
    'PPINOT:AggregatedMeasureAVG'
    
]

// The elements which are included in "myConnectionElements" could be connect by 'PPINOT:MyConnection'
export const myConnectionElements = [
    'PPINOT:AggregatedMeasure',
    'PPINOT:TimeAggregatedMeasure',
    'PPINOT:TimeMeasure',
    'PPINOT:CyclicTimeMeasure',
    'PPINOT:CyclicTimeAggregatedMeasure',
    'PPINOT:CountAggregatedMeasure',
    'PPINOT:CountMeasure',
    'PPINOT:DataAggregatedMeasure',
    'PPINOT:DataMeasure',
    'PPINOT:DataPropertyConditionAggregatedMeasure',
    'PPINOT:DataPropertyConditionMeasure',
    'PPINOT:DerivedMultiInstanceMeasure',
    'PPINOT:DerivedSingleInstanceMeasure',
    'PPINOT:Ppi',
    'PPINOT:StateConditionMeasure',
    'PPINOT:StateConditionAggregatedMeasure',
    'PPINOT:BaseMeasure',
    'PPINOT:StateCondAggMeasureNumber',
    'PPINOT:StateCondAggMeasurePercentage',
    'PPINOT:StateCondAggMeasureAll',
    'PPINOT:StateCondAggMeasureAtLeastOne',
    'PPINOT:StateCondAggMeasureNo',
    'PPINOT:CyclicTimeAggregatedMeasureMAX',
    'PPINOT:CyclicTimeAggregatedMeasureSUM',
    'PPINOT:CyclicTimeAggregatedMeasureMIN',
    'PPINOT:CyclicTimeAggregatedMeasureAVG',
    'PPINOT:CyclicTimeMeasureSUM',
    'PPINOT:CyclicTimeMeasureMAX',
    'PPINOT:CyclicTimeMeasureMIN',
    'PPINOT:CyclicTimeMeasureAVG',
    'PPINOT:TimeAggregatedMeasureSUM',
    'PPINOT:TimeAggregatedMeasureMAX',
    'PPINOT:TimeAggregatedMeasureMIN',
    'PPINOT:TimeAggregatedMeasureAVG',
    'PPINOT:CountAggregatedMeasureSUM',
    'PPINOT:CountAggregatedMeasureMAX',
    'PPINOT:CountAggregatedMeasureMIN',
    'PPINOT:CountAggregatedMeasureAVG',
    'PPINOT:DataAggregatedMeasureSUM',
    'PPINOT:DataAggregatedMeasureMAX',
    'PPINOT:DataAggregatedMeasureMIN',
    'PPINOT:DataAggregatedMeasureAVG',
    'PPINOT:AggregatedMeasureSUM',
    'PPINOT:AggregatedMeasureMAX',
    'PPINOT:AggregatedMeasureMIN',
    'PPINOT:AggregatedMeasureAVG'
    
]


// The elements which are included in "aggregatedElements" could be connect by the connections of 
// the aggregated measures
export const aggreagatedElements = [
    'PPINOT:AggregatedMeasure',
    'PPINOT:TimeAggregatedMeasure',
    'PPINOT:CyclicTimeAggregatedMeasure',
    'PPINOT:CountAggregatedMeasure',
    'PPINOT:DataAggregatedMeasure',
    'PPINOT:StateConditionAggregatedMeasure',
    'PPINOT:DataPropertyConditionAggregatedMeasure',
    'PPINOT:StateCondAggMeasureNumber',
    'PPINOT:StateCondAggMeasurePercentage',
    'PPINOT:StateCondAggMeasureAll',
    'PPINOT:StateCondAggMeasureAtLeastOne',
    'PPINOT:StateCondAggMeasureNo',
    'PPINOT:CyclicTimeAggregatedMeasureMAX',
    'PPINOT:CyclicTimeAggregatedMeasureSUM',
    'PPINOT:CyclicTimeAggregatedMeasureMIN',
    'PPINOT:CyclicTimeAggregatedMeasureAVG',
    'PPINOT:TimeAggregatedMeasureSUM',
    'PPINOT:TimeAggregatedMeasureMAX',
    'PPINOT:TimeAggregatedMeasureMIN',
    'PPINOT:TimeAggregatedMeasureAVG',
    'PPINOT:CountAggregatedMeasureSUM',
    'PPINOT:CountAggregatedMeasureMAX',
    'PPINOT:CountAggregatedMeasureMIN',
    'PPINOT:CountAggregatedMeasureAVG',
    'PPINOT:DataAggregatedMeasureSUM',
    'PPINOT:DataAggregatedMeasureMAX',
    'PPINOT:DataAggregatedMeasureMIN',
    'PPINOT:DataAggregatedMeasureAVG',
    'PPINOT:AggregatedMeasureSUM',
    'PPINOT:AggregatedMeasureMAX',
    'PPINOT:AggregatedMeasureMIN',
    'PPINOT:AggregatedMeasureAVG'
    
]

// The elements which are included in "baseMeasureElements" could be connect by the connections of 
// the base measures
export const baseMeasureElements = [
    'PPINOT:BaseMeasure',
    'PPINOT:TimeMeasure',
    'PPINOT:CyclicTimeMeasure',
    'PPINOT:CountMeasure',
    'PPINOT:DataMeasure',
    'PPINOT:StateConditionMeasure',
    'PPINOT:CyclicTimeMeasureSUM',
    'PPINOT:CyclicTimeMeasureMAX',
    'PPINOT:CyclicTimeMeasureMIN',
    'PPINOT:CyclicTimeMeasureAVG',
   
]

// export const timeMeasuresElements = [
//     //'PPINOT:TimeMeasure'  //no esta implementada
// ]
// export const countMeasuresElements = [
//     'PPINOT:CountMeasure'  //no esta implementada
// ]
// export const ppiElement = [
//     'PPINOT:Ppi',
//     // 'PPINOT:CountMeasure',
//     // 'PPINOT:DataMeasure'

// ]

// The elements which are included in "resourceArcElements" could be connect by 'PPINOT:ResourceArc' 
export const resourceArcElements = [
    'PPINOT:AggregatedMeasure',
    'PPINOT:TimeAggregatedMeasure',
    'PPINOT:CyclicTimeAggregatedMeasure',
    'PPINOT:CountAggregatedMeasure',
    'PPINOT:CountMeasure',
    'PPINOT:DataAggregatedMeasure',
    'PPINOT:DataMeasure',
    'PPINOT:DataPropertyConditionAggregatedMeasure',
    'PPINOT:DataPropertyConditionMeasure',
    'PPINOT:DerivedMultiInstanceMeasure',
    'PPINOT:DerivedSingleInstanceMeasure',
    'PPINOT:TimeMeasure',
    'PPINOT:CyclicTimeMeasure',
    'PPINOT:StateConditionMeasure',
    'PPINOT:StateConditionAggregatedMeasure',
    'PPINOT:BaseMeasure',
    'PPINOT:StateCondAggMeasureNumber',
    'PPINOT:StateCondAggMeasurePercentage',
    'PPINOT:StateCondAggMeasureAll',
    'PPINOT:StateCondAggMeasureAtLeastOne',
    'PPINOT:StateCondAggMeasureNo',
    'PPINOT:CyclicTimeAggregatedMeasureMAX',
    'PPINOT:CyclicTimeAggregatedMeasureSUM',
    'PPINOT:CyclicTimeAggregatedMeasureMIN',
    'PPINOT:CyclicTimeAggregatedMeasureAVG',
    'PPINOT:CyclicTimeMeasureSUM',
    'PPINOT:CyclicTimeMeasureMAX',
    'PPINOT:CyclicTimeMeasureMIN',
    'PPINOT:CyclicTimeMeasureAVG',
    'PPINOT:TimeAggregatedMeasureSUM',
    'PPINOT:TimeAggregatedMeasureMAX',
    'PPINOT:TimeAggregatedMeasureMIN',
    'PPINOT:TimeAggregatedMeasureAVG',
    'PPINOT:CountAggregatedMeasureSUM',
    'PPINOT:CountAggregatedMeasureMAX',
    'PPINOT:CountAggregatedMeasureMIN',
    'PPINOT:CountAggregatedMeasureAVG',
    'PPINOT:DataAggregatedMeasureSUM',
    'PPINOT:DataAggregatedMeasureMAX',
    'PPINOT:DataAggregatedMeasureMIN',
    'PPINOT:DataAggregatedMeasureAVG',
    'PPINOT:AggregatedMeasureSUM',
    'PPINOT:AggregatedMeasureMAX',
    'PPINOT:AggregatedMeasureMIN',
    'PPINOT:AggregatedMeasureAVG'
    
]


// // The elements which are included in "PPINOT" are PPINOT elements
export const PPINOT = [
    'PPINOT:ResourceArc',
    'PPINOT:AggregatedMeasure',
    'PPINOT:TimeAggregatedMeasure',
    'PPINOT:CyclicTimeAggregatedMeasure',
    'PPINOT:CountAggregatedMeasure',
    'PPINOT:CountMeasure',
    'PPINOT:DataAggregatedMeasure',
    'PPINOT:DataMeasure',
    'PPINOT:DataPropertyConditionAggregatedMeasure',
    'PPINOT:DataPropertyConditionMeasure',
    'PPINOT:DerivedMultiInstanceMeasure',
    'PPINOT:DerivedSingleInstanceMeasure',
    'PPINOT:TimeMeasure',
    'PPINOT:CyclicTimeMeasure',
    'PPINOT:BaseMeasure',
    'PPINOT:MyConnection',
    'PPINOT:StartConnection',
    'PPINOT:EndConnection',
    'PPINOT:DashedLine',
    'PPINOT:AggregatedConnection',
    'PPINOT:GroupedBy',
    'PPINOT:ToConnection',
    'PPINOT:FromConnection',
    'PPINOT:Ppi',
    'PPINOT:StateConditionMeasure',
    'PPINOT:StateConditionAggregatedMeasure',
    'PPINOT:RFCStateConnection',
    'PPINOT:StateCondAggMeasureNumber',
    'PPINOT:StateCondAggMeasurePercentage',
    'PPINOT:StateCondAggMeasureAll',
    'PPINOT:StateCondAggMeasureAtLeastOne',
    'PPINOT:StateCondAggMeasureNo',
    'PPINOT:CyclicTimeAggregatedMeasureMAX',
    'PPINOT:CyclicTimeAggregatedMeasureSUM',
    'PPINOT:CyclicTimeAggregatedMeasureMIN',
    'PPINOT:CyclicTimeAggregatedMeasureAVG',
    'PPINOT:CyclicTimeMeasureSUM',
    'PPINOT:CyclicTimeMeasureMAX',
    'PPINOT:CyclicTimeMeasureMIN',
    'PPINOT:CyclicTimeMeasureAVG',
    'PPINOT:TimeAggregatedMeasureSUM',
    'PPINOT:TimeAggregatedMeasureMAX',
    'PPINOT:TimeAggregatedMeasureMIN',
    'PPINOT:TimeAggregatedMeasureAVG',
    'PPINOT:CountAggregatedMeasureSUM',
    'PPINOT:CountAggregatedMeasureMAX',
    'PPINOT:CountAggregatedMeasureMIN',
    'PPINOT:CountAggregatedMeasureAVG',
    'PPINOT:DataAggregatedMeasureSUM',
    'PPINOT:DataAggregatedMeasureMAX',
    'PPINOT:DataAggregatedMeasureMIN',
    'PPINOT:DataAggregatedMeasureAVG',
    'PPINOT:AggregatedMeasureSUM',
    'PPINOT:AggregatedMeasureMAX',
    'PPINOT:AggregatedMeasureMIN',
    'PPINOT:AggregatedMeasureAVG'
        
]

export function isExternalLabel(type) {
    if (typeof type === 'object') {
        type = type.type
    }
    return externalLabel.includes(type)
}

export function isPPINOTShape(type) {
    if (typeof type === 'object')
        type = type.type

    return type.includes('PPINOT:') && !connections.includes(type)
}

export function isPPINOTConnection(type) {
    if (typeof type === 'object') {
        type = type.type
    }
    return type.includes('PPINOT:') && connections.includes(type)
}

export function isPPINOTResourceArcElement(type) {
    if (typeof type === 'object') {
        type = type.type
    }
    return resourceArcElements.includes(type)
}

export function isPPINOTMyConnectionElement(type) {
    if (typeof type === 'object') {
        type = type.type
    }
    return myConnectionElements.includes(type)
}

export function isPPINOTAggregatedElement(type) {
    if (typeof type === 'object') {
        type = type.type
    }
    return aggreagatedElements.includes(type)
}

export function isPPINOTBaseMeasureElement(type) {
    if (typeof type === 'object') {
        type = type.type
    }
    return baseMeasureElements.includes(type)
}

// export function isPPINOTTimeMeasureElement(type) {
//     if (typeof type === 'object') {
//         type = type.type
//     }
//     return timeMeasuresElements.includes(type)
// }
// export function isPPINOTCountMeasureElement(type) {
//     if (typeof type === 'object') {
//         type = type.type
//     }
//     return countMeasuresElements.includes(type)
// }

// export function isPPINOTPpi(type) {
//     if (typeof type === 'object') {
//         type = type.type
//     }
//     return ppiElement.includes(type)
// }
