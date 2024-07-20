export type ReportData = {
  totalOfFarms: number;
  totalOfFarmsHectares: number;
  culturesByType: { type: string; culturesCount: number }[];
  totalFarmsByState: { state: string; farmsCount: number }[];
  totalFarmsByCity: { city: string; farmsCount: number }[];
};
