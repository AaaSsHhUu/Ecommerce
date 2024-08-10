export type User = {
  name: string;
  email: string;
  photo: string;
  gender: string;
  role: string;
  dob: string;
  _id: string;
};

export type Product = {
  name: string;
  price: number;
  stock: number;
  category: string;
  photo: string;
  _id: string;
};

export type OrderItemType = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  photo: string;
};

export type OrderType = {
  _id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pinCode: number;
  status: "Shipped" | "Processing" | "Delivered";
  subTotal: number;
  discount: number;
  shippingCharges: number;
  tax: number;
  total: number;
  orderItems: OrderItemType[];
};

export type ShippingInfo = {
  address: string;
  city: string;
  state: string;
  country: string;
  pinCode: string;
};

export type CartItem = {
  productId: string;
  photo: string;
  name: string;
  price: number;
  quantity: number;
  stock: number;
};

export type OrderItem = Omit<CartItem, "stock"> & { _id: string };

export type Order = {
  orderItems: OrderItem[];
  shippingInfo: ShippingInfo;
  subTotal: number;
  tax: number;
  discount: number;
  shippingCharges: number;
  total: number;
  status: string;
  user: {
    name: string;
    _id: string;
  };
  _id: string;
};

type CountAndPercentageChange = {
  revenue: number;
  product: number;
  user: number;
  order: number;
};

type LatestTransaction = {
  _id: string;
  amount: number;
  discount: number;
  quantity: number;
  status: string;
};

export type StatsType = {
  categoryCount: Record<string, number>[];
  percentage: CountAndPercentageChange;
  count: CountAndPercentageChange;
  chart: {
    order: number[];
    revenue: number[];
  };
  userRatio: {
    male: number;
    female: number;
  };
  latestTransaction: LatestTransaction[];
};

type RevenueDistribution = {
  netMargin: number;
  discount: number;
  shippingCharges: number;
  burnt: number;
  marketingCost: number;
}

export type Pie = {
  orderFullfillment: {
    processing: number;
    shipped: number;
    delivered: number;
  },
  productCategoriesInfo : Record<string, number>[],
  stockAvailability : {
    inStock: number;
    outOfStock: number;
  },
  revenueDistribution : RevenueDistribution,
  usersAgeGroups : {
    teen : number;
    adult : number;
    old : number;
  },
  adminAndCustomer : {
    admin : number;
    customer : number;
  }
};

export type Bar = {
  user : number[];
  product : number[];
  order : number[];
}