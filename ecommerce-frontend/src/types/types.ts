export type User = {
    name: string;
    email: string;
    photo: string;
    gender: string;
    role: string;
    dob: string;
    _id: string;
};

export type OrderItemType = {
    _id : string;
    name : string;
    price : number;
    quantity : number;
    photo : string;
}

export type OrderType = {
    _id : string;
    name : string;
    address : string;
    city : string;
    state : string;
    country : string;
    pinCode : number;
    status : "Shipped" | "Processing" | "Delivered";
    subTotal : number;
    discount : number;
    shippingCharges : number;
    tax : number;
    total : number;
    orderItems : OrderItemType[]
}