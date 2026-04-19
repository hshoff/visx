import { formatNumber } from './formatNumber';

/** Public shape of path builder instances returned by {@link createPath}. */
export interface PathBuilder {
  moveTo(x: number, y: number): this;
  lineTo(x: number, y: number): this;
  curveTo(x1: number, y1: number, x2: number, y2: number, x: number, y: number): this;
  close(): this;
  toString(): string;
}

class PathBuilderImpl implements PathBuilder {
  private readonly parts: string[] = [];

  private readonly precision: number;

  constructor(precision: number) {
    this.precision = precision;
  }

  moveTo(x: number, y: number): this {
    this.parts.push(`M${formatNumber(x, this.precision)},${formatNumber(y, this.precision)}`);
    return this;
  }

  lineTo(x: number, y: number): this {
    this.parts.push(`L${formatNumber(x, this.precision)},${formatNumber(y, this.precision)}`);
    return this;
  }

  curveTo(x1: number, y1: number, x2: number, y2: number, x: number, y: number): this {
    const p = this.precision;
    this.parts.push(
      `C${formatNumber(x1, p)},${formatNumber(y1, p)} ${formatNumber(x2, p)},${formatNumber(
        y2,
        p,
      )} ${formatNumber(x, p)},${formatNumber(y, p)}`,
    );
    return this;
  }

  close(): this {
    this.parts.push('Z');
    return this;
  }

  toString(): string {
    return this.parts.join('');
  }
}

/**
 * Create a path builder. visx-internal path semantics; d3-path is inspiration only,
 * with no byte-for-byte compatibility guarantee.
 */
export function createPath(precision = 3): PathBuilder {
  return new PathBuilderImpl(precision);
}
