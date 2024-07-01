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

    public get(id: string): T | null {
        return this._cache.get(id) || null;
    }

    public set(id: string, data: T) {
        this._cache.set(id, data);
    }

    public delete(id: string) {
        this._cache.delete(id);
    }

    public clear() {
        this._cache.clear();
    }

    public has(id: string) {
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

    public forEach(fn: (value: T, key: string, map: Map<string, T>) => void) {
        this._cache.forEach((value, key) => {
            fn(value, key, this._cache);
        });
    }
}