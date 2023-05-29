export type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: {
    apartment: string;
    town: string;
    country: string;
    zip: string;
  };
  notes: string;
  confirmation: {
    sending: boolean;
    agreement: boolean;
  };
};
