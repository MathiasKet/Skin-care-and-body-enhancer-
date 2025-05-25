import { cn } from "@/lib/utils";
import { Star, StarHalf } from "lucide-react";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  showCount?: boolean;
  count?: number;
  className?: string;
}

export function StarRating({
  rating,
  maxRating = 5,
  size = "md",
  showCount = false,
  count,
  className,
}: StarRatingProps) {
  // Calculate full stars, half stars, and empty stars
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = maxRating - fullStars - (hasHalfStar ? 1 : 0);

  // Define star sizes
  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  const starSize = sizeClasses[size];

  return (
    <div className={cn("flex items-center", className)}>
      <div className="flex text-accent">
        {/* Full stars */}
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star key={`full-${i}`} className={cn(starSize, "fill-current")} />
        ))}

        {/* Half star */}
        {hasHalfStar && <StarHalf key="half" className={cn(starSize, "fill-current")} />}

        {/* Empty stars */}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <Star key={`empty-${i}`} className={cn(starSize, "text-gray-300")} />
        ))}
      </div>

      {/* Review count */}
      {showCount && (
        <span className="text-xs text-gray-500 ml-1">
          ({count || 0} {count === 1 ? "review" : "reviews"})
        </span>
      )}
    </div>
  );
}

export default StarRating;
