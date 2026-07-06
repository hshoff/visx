export const POINT_COUNT = 10_000;
export const CHART_WIDTH = 500;
export const CHART_HEIGHT = 300;

export type LineDatum = {
  x: number;
  y: number;
};

/** Shared dataset used by every library in the suite. */
export function createLineData(count = POINT_COUNT): LineDatum[] {
  return Array.from({ length: count }, (_, i) => ({
    x: i,
    y: 50 + Math.sin(i / 5) * 25,
  }));
}

export const lineData = createLineData();
export const xValues = lineData.map((d) => d.x);
export const yValues = lineData.map((d) => d.y);
