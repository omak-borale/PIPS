import type { BusStop } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Star, Bus, Frown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

type FavoritesListProps = {
  favoriteStops: BusStop[];
  onToggleFavorite: (stop: BusStop) => void;
};

export default function FavoritesList({ favoriteStops, onToggleFavorite }: FavoritesListProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Favorite Stops</h3>
      <p className="text-sm text-muted-foreground">
        Your saved stops for quick access.
      </p>
      {favoriteStops.length > 0 ? (
        <div className="space-y-3">
          {favoriteStops.map((stop) => (
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
                aria-label="Remove from favorites"
              >
                <Star className="h-5 w-5 fill-accent text-accent" />
              </Button>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center p-8 border-2 border-dashed rounded-lg">
          <Frown className="mx-auto h-12 w-12 text-muted-foreground" />
          <h4 className="mt-4 text-lg font-semibold">No Favorites Yet</h4>
          <p className="mt-2 text-sm text-muted-foreground">
            Click the star icon on a nearby stop to add it to your favorites.
          </p>
        </div>
      )}
    </div>
  );
}
