import { Injectable } from "@nestjs/common";
import { LRUCache } from 'lru-cache';

@Injectable()
export class TokenMemoryStorageService {
  cache: LRUCache<string, string>;

  constructor() {
    const cache = new LRUCache<string, string>({
      ttl: 300000,
      ttlAutopurge: true
    })

    this.cache = cache;
  }

  save(key: string, value: string) {
    this.cache.set(key, value);
  }

  get(key: string) {
    return this.cache.get(key);
  }

  has(key: string) {
    return this.cache.has(key);
  }

  delete(key: string) {
    this.cache.delete(key);
  }
}
