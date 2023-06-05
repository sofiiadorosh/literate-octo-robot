export const getDeliveryTime = (days: number) => {
  const start = new Date();
  const end = new Date(start);
  end.setDate(end.getDate() + days);
  return end;
};
