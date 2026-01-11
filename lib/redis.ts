import { createClient } from "redis"

const REDIS_URL = process.env.REDIS_URL

if (!REDIS_URL) {
  console.warn("REDIS_URL not set in .env - caching will be disabled")
}

let redisClient: ReturnType<typeof createClient> | null = null
let isConnecting = false

async function getRedisClient() {
  if (!REDIS_URL) {
    return null
  }

  // Return existing client if already connected
  if (redisClient && redisClient.isOpen) {
    return redisClient
  }

  // Prevent multiple simultaneous connection attempts
  if (isConnecting) {
    // Wait for the connection to complete
    while (isConnecting) {
      await new Promise((resolve) => setTimeout(resolve, 100))
    }
    return redisClient
  }

  try {
    isConnecting = true

    redisClient = createClient({
      url: REDIS_URL,
    })

    redisClient.on("error", (err) => {
      console.error("Redis Client Error:", err)
    })

    redisClient.on("connect", () => {
      console.log("✅ Redis connected successfully")
    })

    await redisClient.connect()
    isConnecting = false
    return redisClient
  } catch (error) {
    isConnecting = false
    console.error("Failed to connect to Redis:", error)
    redisClient = null
    return null
  }
}

// Cache helpers
export async function getCachedData<T>(key: string): Promise<T | null> {
  try {
    const client = await getRedisClient()
    if (!client) return null

    const data = await client.get(key)
    if (!data) return null

    return JSON.parse(data) as T
  } catch (error) {
    console.error("Redis GET error:", error)
    return null
  }
}

export async function setCachedData(
  key: string,
  data: any,
  ttlSeconds: number = 3600 // Default 1 hour cache
): Promise<boolean> {
  try {
    const client = await getRedisClient()
    if (!client) return false

    await client.setEx(key, ttlSeconds, JSON.stringify(data))
    return true
  } catch (error) {
    console.error("Redis SET error:", error)
    return false
  }
}

export async function deleteCachedData(key: string): Promise<boolean> {
  try {
    const client = await getRedisClient()
    if (!client) return false

    await client.del(key)
    return true
  } catch (error) {
    console.error("Redis DEL error:", error)
    return false
  }
}

// Graceful shutdown
process.on("SIGTERM", async () => {
  if (redisClient && redisClient.isOpen) {
    await redisClient.quit()
  }
})
