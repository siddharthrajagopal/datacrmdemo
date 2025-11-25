import { Opportunity, SupplyAsset, Link, DashboardMetrics } from './types';

// Mock Data (used as initial seed data)
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

// LocalStorage keys
const STORAGE_KEYS = {
    OPPORTUNITIES: 'datacrm_opportunities',
    SUPPLY_ASSETS: 'datacrm_supply_assets',
    LINKS: 'datacrm_links',
};

// Helper to check if we're in browser environment
const isBrowser = typeof window !== 'undefined';

// Store with LocalStorage persistence
class Store {
    private opportunities: Opportunity[] = [];
    private supplyAssets: SupplyAsset[] = [];
    private links: Link[] = [];
    private listeners: Set<() => void> = new Set();

    constructor() {
        if (isBrowser) {
            this.loadFromStorage();
        } else {
            // Server-side: use mock data
            this.opportunities = [...mockOpportunities];
            this.supplyAssets = [...mockSupplyAssets];
            this.links = [...mockLinks];
        }
    }

    // Load data from localStorage or use mock data as fallback
    private loadFromStorage() {
        try {
            const storedOpportunities = localStorage.getItem(STORAGE_KEYS.OPPORTUNITIES);
            const storedAssets = localStorage.getItem(STORAGE_KEYS.SUPPLY_ASSETS);
            const storedLinks = localStorage.getItem(STORAGE_KEYS.LINKS);

            this.opportunities = storedOpportunities
                ? JSON.parse(storedOpportunities)
                : [...mockOpportunities];

            this.supplyAssets = storedAssets
                ? JSON.parse(storedAssets)
                : [...mockSupplyAssets];

            this.links = storedLinks
                ? JSON.parse(storedLinks)
                : [...mockLinks];

            // If storage is empty, save the mock data
            if (!storedOpportunities) this.saveOpportunities();
            if (!storedAssets) this.saveSupplyAssets();
            if (!storedLinks) this.saveLinks();
        } catch (error) {
            console.error('Error loading from storage:', error);
            // Fallback to mock data
            this.opportunities = [...mockOpportunities];
            this.supplyAssets = [...mockSupplyAssets];
            this.links = [...mockLinks];
        }
    }

    // Save methods
    private saveOpportunities() {
        if (isBrowser) {
            localStorage.setItem(STORAGE_KEYS.OPPORTUNITIES, JSON.stringify(this.opportunities));
            this.notifyListeners();
        }
    }

    private saveSupplyAssets() {
        if (isBrowser) {
            localStorage.setItem(STORAGE_KEYS.SUPPLY_ASSETS, JSON.stringify(this.supplyAssets));
            this.notifyListeners();
        }
    }

    private saveLinks() {
        if (isBrowser) {
            localStorage.setItem(STORAGE_KEYS.LINKS, JSON.stringify(this.links));
            this.notifyListeners();
        }
    }

    // Subscribe to changes
    subscribe(listener: () => void) {
        this.listeners.add(listener);
        return () => this.listeners.delete(listener);
    }

    private notifyListeners() {
        this.listeners.forEach(listener => listener());
    }

    // Opportunities
    getOpportunities() {
        return this.opportunities;
    }

    getOpportunity(id: string) {
        return this.opportunities.find(o => o.id === id);
    }

    addOpportunity(opp: Opportunity) {
        this.opportunities.push(opp);
        this.saveOpportunities();
    }

    updateOpportunity(id: string, updates: Partial<Opportunity>) {
        const index = this.opportunities.findIndex(o => o.id === id);
        if (index !== -1) {
            this.opportunities[index] = { ...this.opportunities[index], ...updates };
            this.saveOpportunities();
        }
    }

    deleteOpportunity(id: string) {
        this.opportunities = this.opportunities.filter(o => o.id !== id);
        this.saveOpportunities();
    }

    // Supply Assets
    getSupplyAssets() {
        return this.supplyAssets;
    }

    getSupplyAsset(id: string) {
        return this.supplyAssets.find(a => a.id === id);
    }

    addSupplyAsset(asset: SupplyAsset) {
        this.supplyAssets.push(asset);
        this.saveSupplyAssets();
    }

    updateSupplyAsset(id: string, updates: Partial<SupplyAsset>) {
        const index = this.supplyAssets.findIndex(a => a.id === id);
        if (index !== -1) {
            this.supplyAssets[index] = { ...this.supplyAssets[index], ...updates };
            this.saveSupplyAssets();
        }
    }

    deleteSupplyAsset(id: string) {
        this.supplyAssets = this.supplyAssets.filter(a => a.id !== id);
        this.saveSupplyAssets();
    }

    // Links
    getLinks(sourceId: string) {
        return this.links.filter(l => l.sourceId === sourceId);
    }

    getAllLinks() {
        return this.links;
    }

    addLink(link: Link) {
        this.links.push(link);
        this.saveLinks();
    }

    deleteLink(sourceId: string, targetId: string) {
        this.links = this.links.filter(l => !(l.sourceId === sourceId && l.targetId === targetId));
        this.saveLinks();
    }

    // Metrics
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

    // Reset to mock data (useful for testing)
    resetToMockData() {
        this.opportunities = [...mockOpportunities];
        this.supplyAssets = [...mockSupplyAssets];
        this.links = [...mockLinks];
        this.saveOpportunities();
        this.saveSupplyAssets();
        this.saveLinks();
    }
}

export const store = new Store();
