export type LayoutType = 2 | 3 | 4 | 5;

export type FilterType =
  | "none"
  | "vintage"
  | "80s"
  | "90s"
  | "sepia"
  | "blackwhite";

export interface Filter {
  id: FilterType;
  name: string;
  description: string;
  cssFilter: string;
}

export interface CapturedPhoto {
  id: string;
  dataUrl: string;
  filter: FilterType;
  timestamp: Date;
}
