'use server';

import { analyzeBusDisruptions } from '@/ai/flows/analyze-bus-disruptions';
import { hashPassword } from '@/lib/crypto';
import { realTimeBusLocations, historicalData, newsFeed, students } from '@/lib/data';
import type { Student } from '@/lib/types';
import { revalidatePath } from 'next/cache';

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

export async function addStudent(student: Omit<Student, 'id'>) {
    try {
        const newStudent: Student = {
            id: `student-${Date.now()}`,
            ...student,
        };
        // In a real app, this would be a database call.
        // For this prototype, we're pushing to an in-memory array.
        students.push(newStudent);
        revalidatePath('/dashboard/bus-management');
        return { success: true, data: newStudent };
    } catch (error) {
        console.error(error);
        return { success: false, error: 'Failed to add student.' };
    }
}
