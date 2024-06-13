export function calculateSteepness(
  ascent,
  descent,
  distance,
  inPercent = true
) {
  if (distance === 0) return 0;
  let steepness = (ascent + descent) / distance;
  if (inPercent) {
    steepness = steepness * 100;
  }
  return steepness;
}
