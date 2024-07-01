import { Client } from "../client/Client";
import { Collection } from "../util/Collection";

/**
 * Cache Manager
 */
export class CacheManager<T> {

    private _cache: Collection<T> = new Collection();

    /**
     * Constructs a new Cache Manager
     */
    constructor(public client: Client) { }

    public get(id: bigint): T | null {
        return this._cache.get(id) || null;
    }

    public set(id: bigint, data: T) {
        this._cache.set(id, data);
    }

    public delete(id: bigint) {
        this._cache.delete(id);
    }

    public clear() {
        this._cache.clear();
    }

    public has(id: bigint) {
        return this._cache.has(id);
    }

    public toArray() {
        return Array.from(this._cache.values());
    }

    public size() {
        return this._cache.size;
    }

    public values() {
        return this._cache.values();
    }

    public keys() {
        return this._cache.keys();
    }

    public entries() {
        return this._cache.entries();
    }

    public forEach(fn: (value: T, key: bigint, map: Map<bigint, T>) => void) {
        this._cache.forEach((value, key) => {
            fn(value, key, this._cache);
        });
    }
}