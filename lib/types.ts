export type OpportunityStatus = 'Planned' | 'Active' | 'Delivered' | 'Blocked';

export interface Opportunity {
    id: string;
    title: string;
    description: string;
    businessUnit: string;
    owner: string;
    estimatedValue: number;
    status: OpportunityStatus;
    createdAt: string;
    targetDate: string;
}

export type SupplyType = 'Business Term' | 'Policy' | 'Technical App' | 'Dataset' | 'Metric';

export interface SupplyAsset {
    id: string;
    name: string;
    type: SupplyType;
    description: string;
    owner?: string;
    status?: string;
}

export interface Link {
    sourceId: string; // Opportunity ID
    targetId: string; // Supply Asset ID
    type: 'relates_to' | 'governed_by' | 'uses_data_from';
}

export interface DashboardMetrics {
    totalTAM: number;
    realizedValue: number;
    activeOpportunities: number;
    closedOpportunities: number;
}
