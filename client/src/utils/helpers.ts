export const formatCurrency = (amount: number): string => {
    return `$${amount.toFixed(2)}`;
};

export const parseJwt = (token: string): any => {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
};

export const isUserAdmin = (user: any): boolean => {
    return user && user.role === 'admin';
};

export const getSubscriptionStatus = (subscription: any): string => {
    if (!subscription) return 'No Subscription';
    return subscription.active ? 'Active' : 'Inactive';
};