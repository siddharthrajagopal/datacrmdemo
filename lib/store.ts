import { Opportunity, SupplyAsset, Link, DashboardMetrics } from './types';

// Mock Data
export const mockOpportunities: Opportunity[] = [
    {
        id: 'opp-001',
        title: 'Customer Churn Prediction',
        description: 'Predict which customers are likely to churn in the next 30 days to enable proactive retention.',
        businessUnit: 'Marketing',
        owner: 'Sarah Johnson',
        estimatedValue: 150000,
        status: 'Active',
        createdAt: '2023-10-15',
        targetDate: '2024-01-30',
    },
    {
        id: 'opp-002',
        title: 'Supply Chain Optimization',
        description: 'Optimize inventory levels based on demand forecasting to reduce carrying costs.',
        businessUnit: 'Operations',
        owner: 'Mike Chen',
        estimatedValue: 500000,
        status: 'Planned',
        createdAt: '2023-11-01',
        targetDate: '2024-03-15',
    },
    {
        id: 'opp-003',
        title: 'Personalized Product Recommendations',
        description: 'Real-time product recommendations on the e-commerce site.',
        businessUnit: 'Sales',
        owner: 'Emily Davis',
        estimatedValue: 300000,
        status: 'Delivered',
        createdAt: '2023-09-10',
        targetDate: '2023-12-20',
    },
];

export const mockSupplyAssets: SupplyAsset[] = [
    { id: 'term-001', name: 'Customer Churn Rate', type: 'Business Term', description: 'Percentage of customers who stop using the service.' },
    { id: 'term-002', name: 'Active Subscriber', type: 'Business Term', description: 'Customer with at least one login in the last 30 days.' },
    { id: 'policy-001', name: 'GDPR Compliance', type: 'Policy', description: 'General Data Protection Regulation requirements for EU citizens.' },
    { id: 'policy-002', name: 'Data Retention Policy', type: 'Policy', description: 'Data must be retained for 5 years.' },
    { id: 'app-001', name: 'Snowflake Data Warehouse', type: 'Technical App', description: 'Central data warehouse.' },
    { id: 'dataset-001', name: 'Customer_Transactions_Daily', type: 'Dataset', description: 'Daily transaction logs.' },
];

export const mockLinks: Link[] = [
    { sourceId: 'opp-001', targetId: 'term-001', type: 'relates_to' },
    { sourceId: 'opp-001', targetId: 'policy-001', type: 'governed_by' },
    { sourceId: 'opp-001', targetId: 'dataset-001', type: 'uses_data_from' },
];

// Simple Store (In-memory for prototype)
class Store {
    opportunities: Opportunity[] = [...mockOpportunities];
    supplyAssets: SupplyAsset[] = [...mockSupplyAssets];
    links: Link[] = [...mockLinks];

    getOpportunities() {
        return this.opportunities;
    }

    getOpportunity(id: string) {
        return this.opportunities.find(o => o.id === id);
    }

    addOpportunity(opp: Opportunity) {
        this.opportunities.push(opp);
    }

    getSupplyAssets() {
        return this.supplyAssets;
    }

    getLinks(sourceId: string) {
        return this.links.filter(l => l.sourceId === sourceId);
    }

    addLink(link: Link) {
        this.links.push(link);
    }

    getMetrics(): DashboardMetrics {
        const totalTAM = this.opportunities.reduce((sum, opp) => sum + opp.estimatedValue, 0);
        const realizedValue = this.opportunities
            .filter(o => o.status === 'Delivered')
            .reduce((sum, opp) => sum + opp.estimatedValue, 0);

        return {
            totalTAM,
            realizedValue,
            activeOpportunities: this.opportunities.filter(o => o.status === 'Active').length,
            closedOpportunities: this.opportunities.filter(o => o.status === 'Delivered').length,
        };
    }
}

export const store = new Store();
