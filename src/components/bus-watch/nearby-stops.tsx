import type { BusStop } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Star, Bus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

type NearbyStopsProps = {
  stops: BusStop[];
  favoriteStops: BusStop[];
  onToggleFavorite: (stop: BusStop) => void;
};

export default function NearbyStops({ stops, favoriteStops, onToggleFavorite }: NearbyStopsProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Nearby Stops</h3>
      <p className="text-sm text-muted-foreground">
        Bus stops currently near your location.
      </p>
      <div className="space-y-3">
        {stops.map((stop) => {
          const isFavorite = favoriteStops.some((fav) => fav.id === stop.id);
          return (
            <Card key={stop.id} className="p-4 flex justify-between items-center transition-all hover:bg-muted/50">
              <div className="space-y-1">
                <p className="font-semibold">{stop.name}</p>
                <div className="flex items-center gap-2">
                    <Bus className="h-4 w-4 text-muted-foreground" />
                    <div className="flex gap-1.5 flex-wrap">
                        {stop.routes.map((route) => (
                            <Badge key={route} variant="secondary">{route}</Badge>
                        ))}
                    </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onToggleFavorite(stop)}
                aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                <Star className={`h-5 w-5 ${isFavorite ? 'fill-accent text-accent' : 'text-muted-foreground'}`} />
              </Button>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
