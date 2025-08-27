'use server';
/**
 * @fileOverview Analyzes potential bus service disruptions based on real-time data, historical data, and news feeds.
 *
 * - analyzeBusDisruptions - A function that analyzes bus disruptions.
 * - AnalyzeBusDisruptionsInput - The input type for the analyzeBusDisruptions function.
 * - AnalyzeBusDisruptionsOutput - The return type for the analyzeBusDisruptions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeBusDisruptionsInputSchema = z.object({
  realTimeBusLocations: z
    .string()
    .describe('Real-time GPS coordinates of all buses in the fleet.'),
  historicalData: z
    .string()
    .describe(
      'Historical data of bus routes, arrival times, and past disruptions.'
    ),
  newsFeed: z.string().describe('Current news feed related to traffic and weather.'),
});
export type AnalyzeBusDisruptionsInput = z.infer<
  typeof AnalyzeBusDisruptionsInputSchema
>;

const AnalyzeBusDisruptionsOutputSchema = z.object({
  potentialDisruptions: z
    .array(z.string())
    .describe(
      'List of potential service disruptions (e.g., delays, route changes).'
    ),
  recommendations: z
    .string()
    .describe('Recommendations for users to plan their commute.'),
});
export type AnalyzeBusDisruptionsOutput = z.infer<
  typeof AnalyzeBusDisruptionsOutputSchema
>;

export async function analyzeBusDisruptions(
  input: AnalyzeBusDisruptionsInput
): Promise<AnalyzeBusDisruptionsOutput> {
  return analyzeBusDisruptionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeBusDisruptionsPrompt',
  input: {schema: AnalyzeBusDisruptionsInputSchema},
  output: {schema: AnalyzeBusDisruptionsOutputSchema},
  prompt: `You are an AI assistant designed to analyze potential bus service disruptions and provide recommendations to users.

  Analyze real-time bus locations, historical data, and news feeds to identify potential disruptions such as delays or route changes. Provide clear and concise recommendations to users so they can plan their commute accordingly.

  Real-time Bus Locations: {{{realTimeBusLocations}}}
  Historical Data: {{{historicalData}}}
  News Feed: {{{newsFeed}}}

  Respond with a list of potential disruptions and recommendations.
  `,
});

const analyzeBusDisruptionsFlow = ai.defineFlow(
  {
    name: 'analyzeBusDisruptionsFlow',
    inputSchema: AnalyzeBusDisruptionsInputSchema,
    outputSchema: AnalyzeBusDisruptionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
