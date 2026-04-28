export const mockOrderTimeline = [
  { id: "1", label: "Order placed", date: "2026-04-12", state: "done" as const },
  { id: "2", label: "Roasting", date: "2026-04-14", state: "done" as const },
  { id: "3", label: "Packed", date: "2026-04-15", state: "current" as const },
  { id: "4", label: "Ships", date: "2026-04-16", state: "upcoming" as const },
  { id: "5", label: "Delivered", date: "—", state: "upcoming" as const }
];

export const mockNextShipment = {
  shipDate: "2026-04-16",
  carrier: "Standard post",
  window: "Arrives Apr 18–20"
};

export const mockBrewTips = [
  {
    id: "a",
    title: "Water first",
    body: "Use filtered water just off the boil; aim for a four-minute total drawdown on pour-over."
  },
  {
    id: "b",
    title: "Grind on demand",
    body: "For this profile, a medium-fine grind keeps sweetness without grit in the cup."
  },
  {
    id: "c",
    title: "Rest the bag",
    body: "Two to four days after roast lets CO2 settle so aromatics read more clearly."
  }
];
