'use server';

import { analyzeBusDisruptions } from '@/ai/flows/analyze-bus-disruptions';
import { hashPassword } from '@/lib/crypto';
import { realTimeBusLocations, historicalData, newsFeed } from '@/lib/data';

export async function getDisruptionAnalysis() {
  try {
    const result = await analyzeBusDisruptions({
      realTimeBusLocations: JSON.stringify(realTimeBusLocations),
      historicalData,
      newsFeed,
    });
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to analyze disruptions.' };
  }
}

export async function getHashedPassword(password: string) {
    return hashPassword(password);
}
