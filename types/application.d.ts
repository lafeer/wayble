interface IJob {
  id: strimg;
  company: string;
  title: string;
  description: string;
  address: {
    street: string;
    city: string;
    province: string;
    postalCode: string;
  };
  applied?: boolean;
}
