var TimeLimitedCache = function() {
    this.cache = {}
};

/** 
 * @param {number} key
 * @param {number} value
 * @param {number} duration time until expiration in ms
 * @return {boolean} if un-expired key already existed
 */
TimeLimitedCache.prototype.set = function(key, value, duration) {
    const currentTime = Date.now();
    const expirationTime = currentTime + duration;

    const isExisting = this.cache[key] !== undefined;
    this.cache[key] = { value: value, expiration: expirationTime };

    return isExisting;
};

/** 
 * @param {number} key
 * @return {number} value associated with key
 */
TimeLimitedCache.prototype.get = function(key) {
    const currentTime = Date.now()
    const entry = this.cache[key]

    if (entry && entry.expiration > currentTime) {
        return entry.value
    }

    delete this.cache[key]
    return -1
};

/** 
 * @return {number} count of non-expired keys
 */
TimeLimitedCache.prototype.count = function() {
    const currentTime = Date.now()
    let validCount = 0

    for (const key in this.cache) {
        if (this.cache[key].expiration > currentTime) {
            validCount++
        } else {
            delete this.cache[key]
        }
    }

    return validCount
};

/**
 * const timeLimitedCache = new TimeLimitedCache()
 * timeLimitedCache.set(1, 42, 1000); // false
 * timeLimitedCache.get(1) // 42
 * timeLimitedCache.count() // 1
 */
