export const aggregateFeatureDataBar = (data) => {
  const aggregatedData = data?.reduce((acc, curr) => {
    acc["A"] = (acc["A"] || 0) + curr.A;
    acc["B"] = (acc["B"] || 0) + curr.B;
    acc["C"] = (acc["C"] || 0) + curr.C;
    acc["D"] = (acc["D"] || 0) + curr.D;
    acc["E"] = (acc["E"] || 0) + curr.E;
    acc["F"] = (acc["F"] || 0) + curr.F;
    return acc;
  }, {});

  if (!data) return;

  return Object?.keys(aggregatedData)?.map((key) => ({
    feature: key,
    timeSpent: aggregatedData[key] / 60,
  }));
};
