
'use server';
import fs from 'fs/promises';
import path from 'path';

import { analyzeBusDisruptions } from '@/ai/flows/analyze-bus-disruptions';
import { hashPassword } from '@/lib/crypto';
import type { Student, BusRoute, DieselEntry } from '@/lib/types';
import { revalidatePath } from 'next/cache';
import initialData from '@/lib/data.json';

const dataFilePath = path.join(process.cwd(), 'src', 'lib', 'data.json');

async function readData() {
    try {
        const jsonData = await fs.readFile(dataFilePath, 'utf-8');
        return JSON.parse(jsonData);
    } catch (error) {
        console.error('Error reading data file:', error);
        // Return the initial data if the file doesn't exist or has an error
        return initialData;
    }
}

async function writeData(newData: any) {
    try {
        await fs.writeFile(dataFilePath, JSON.stringify(newData, null, 2), 'utf-8');
    } catch (error) {
        console.error('Error writing data file:', error);
    }
}

export async function getStudentsAction(): Promise<Student[]> {
    const data = await readData();
    return data.students;
}

export async function getBusRoutesAction(): Promise<BusRoute[]> {
    const data = await readData();
    return data.busRoutes;
}

export async function getDieselEntriesAction(): Promise<DieselEntry[]> {
    const data = await readData();
    return data.dieselEntries;
}


export async function getDisruptionAnalysis() {
  try {
    const currentData = await readData();
    const result = await analyzeBusDisruptions({
      realTimeBusLocations: JSON.stringify(currentData.realTimeBusLocations),
      historicalData: currentData.historicalData,
      newsFeed: currentData.newsFeed,
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
        const currentData = await readData();
        const newStudent: Student = {
            id: `student-${Date.now()}`,
            ...student,
        };
        
        currentData.students.push(newStudent);
        await writeData(currentData);

        revalidatePath('/dashboard/bus-management');
        return { success: true, data: newStudent };
    } catch (error) {
        console.error(error);
        return { success: false, error: 'Failed to add student.' };
    }
}

export async function addBusRoute(route: Omit<BusRoute, 'id' | 'fuelLevel' | 'lastFueled'>) {
    try {
        const currentData = await readData();
        const newRoute: BusRoute = {
            id: `route-${Date.now()}`,
            ...route,
            fuelLevel: 100, // Default fuel level
            lastFueled: new Date().toISOString(),
        };
        
        currentData.busRoutes.push(newRoute);
        await writeData(currentData);

        revalidatePath('/dashboard/settings');
        revalidatePath('/dashboard/routes');
        return { success: true, data: newRoute };
    } catch (error) {
        console.error(error);
        return { success: false, error: 'Failed to add bus route.' };
    }
}
