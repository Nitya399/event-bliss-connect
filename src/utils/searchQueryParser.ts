
// A utility to extract search parameters from natural language queries

type SearchParams = {
  query: string;
  category?: string;
  location?: string;
  maxPrice?: number;
  minPrice?: number;
};

/**
 * Parse natural language queries into structured search parameters
 * Examples:
 * - "I need a caterer in Ahmedabad under 50000"
 * - "Find me photographers in Mumbai"
 * - "Show me decorators between 10000 and 30000 in Delhi"
 */
export const parseSearchQuery = (query: string): SearchParams => {
  const result: SearchParams = { query };
  const lowerQuery = query.toLowerCase();

  // Extract category
  const categories = [
    "caterer", "catering", "photographer", "photography", 
    "decorator", "decoration", "venue", "entertainment",
    "music", "dj", "event manager", "event planner"
  ];
  
  for (const category of categories) {
    if (lowerQuery.includes(category)) {
      // Map the found term to proper category names
      if (category === "caterer" || category === "catering") {
        result.category = "Catering";
      } else if (category === "photographer" || category === "photography") {
        result.category = "Photography";
      } else if (category === "decorator" || category === "decoration") {
        result.category = "Decoration";
      } else if (category === "venue") {
        result.category = "Venue";
      } else if (category === "entertainment" || category === "music" || category === "dj") {
        result.category = "Entertainment";
      } else if (category === "event manager" || category === "event planner") {
        result.category = "Event Management";
      }
      break;
    }
  }

  // Extract location
  const locationMatch = lowerQuery.match(/\b(in|at|from)\s+([a-z\s]+?)(?:\s|$)/i);
  if (locationMatch && locationMatch[2]) {
    // Clean up and capitalize the location
    const location = locationMatch[2].trim();
    result.location = location.charAt(0).toUpperCase() + location.slice(1);
  }

  // Extract price range
  const underPriceMatch = lowerQuery.match(/\b(under|less than|below|max|maximum)\s+(\d+),?(\d+)?\s*k?/i);
  if (underPriceMatch) {
    const priceValue = underPriceMatch[3] 
      ? parseInt(underPriceMatch[2] + underPriceMatch[3]) 
      : parseInt(underPriceMatch[2]);
    
    result.maxPrice = lowerQuery.includes("k") ? priceValue * 1000 : priceValue;
  }

  const overPriceMatch = lowerQuery.match(/\b(over|more than|above|min|minimum)\s+(\d+),?(\d+)?\s*k?/i);
  if (overPriceMatch) {
    const priceValue = overPriceMatch[3] 
      ? parseInt(overPriceMatch[2] + overPriceMatch[3]) 
      : parseInt(overPriceMatch[2]);
    
    result.minPrice = lowerQuery.includes("k") ? priceValue * 1000 : priceValue;
  }

  // Extract price between range
  const betweenPriceMatch = lowerQuery.match(/\b(between)\s+(\d+),?(\d+)?\s*k?(?:\s*(?:and|to|-)\s*)(\d+),?(\d+)?\s*k?/i);
  if (betweenPriceMatch) {
    const minValue = betweenPriceMatch[3] 
      ? parseInt(betweenPriceMatch[2] + betweenPriceMatch[3]) 
      : parseInt(betweenPriceMatch[2]);
    
    const maxValue = betweenPriceMatch[5] 
      ? parseInt(betweenPriceMatch[4] + betweenPriceMatch[5]) 
      : parseInt(betweenPriceMatch[4]);
    
    result.minPrice = lowerQuery.includes("k") ? minValue * 1000 : minValue;
    result.maxPrice = lowerQuery.includes("k") ? maxValue * 1000 : maxValue;
  }

  return result;
};
