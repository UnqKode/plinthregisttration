import { LRUCache } from "lru-cache";

const tokenCache = new LRUCache({
    max: 500, // Max 500 unique IPs
    ttl: 60 * 1000, // 1 minute window
});

export async function rateLimit(ip) {
    const tokenCount = tokenCache.get(ip) || [0];
    const currentUsage = tokenCount[0];

    const isRateLimited = currentUsage >= 5; // Limit to 5 requests per minute

    if (!isRateLimited) {
        tokenCache.set(ip, [currentUsage + 1]);
    }

    return {
        success: !isRateLimited,
        limit: 5,
        remaining: isRateLimited ? 0 : 5 - (currentUsage + 1),
    };
}
