'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, MapPin, Star } from 'lucide-react';
import ArrivalTimes from './arrival-times';
import NearbyStops from './nearby-stops';
import FavoritesList from './favorites-list';
import type { BusStop, Arrival } from '@/lib/types';
import { ScrollArea } from '../ui/scroll-area';

type BusInfoTabsProps = {
  stops: BusStop[];
  arrivals: Arrival[];
};

export default function BusInfoTabs({ stops, arrivals }: BusInfoTabsProps) {
  const [favoriteStops, setFavoriteStops] = useState<BusStop[]>([]);

  const toggleFavorite = (stop: BusStop) => {
    setFavoriteStops((prevFavorites) => {
      const isFavorite = prevFavorites.some((fav) => fav.id === stop.id);
      if (isFavorite) {
        return prevFavorites.filter((fav) => fav.id !== stop.id);
      } else {
        return [...prevFavorites, stop];
      }
    });
  };

  return (
    <Card className="shadow-lg h-full flex flex-col">
      <CardHeader>
        <CardTitle className="font-headline text-lg">Live Information</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-0">
        <Tabs defaultValue="arrivals" className="flex-1 flex flex-col">
          <TabsList className="grid w-full grid-cols-3 mx-auto px-6">
            <TabsTrigger value="arrivals">
              <Clock className="h-4 w-4 mr-2" /> Arrivals
            </TabsTrigger>
            <TabsTrigger value="nearby">
              <MapPin className="h-4 w-4 mr-2" /> Nearby
            </TabsTrigger>
            <TabsTrigger value="favorites">
              <Star className="h-4 w-4 mr-2" /> Favorites
            </TabsTrigger>
          </TabsList>
          <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full">
              <div className="p-6">
                <TabsContent value="arrivals">
                  <ArrivalTimes arrivals={arrivals} />
                </TabsContent>
                <TabsContent value="nearby">
                  <NearbyStops
                    stops={stops}
                    favoriteStops={favoriteStops}
                    onToggleFavorite={toggleFavorite}
                  />
                </TabsContent>
                <TabsContent value="favorites">
                  <FavoritesList
                    favoriteStops={favoriteStops}
                    onToggleFavorite={toggleFavorite}
                  />
                </TabsContent>
              </div>
            </ScrollArea>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}
