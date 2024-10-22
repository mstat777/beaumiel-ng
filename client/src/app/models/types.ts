export type Honey = {
    id: number;
    name: string;
    subtitle: string;
    description: string;
    price: number;
}

export type Packaging = {
    id: number;
    reference: string;
    size: string;
    price: number;
}

export type CartItem = {
    name: string;
    subtitle: string;
    size: string;
    quantity: number;
    price: number;
}

export type UserData = {
    status: string;
    userId: number;
    email: string;
    role: string;
}

export type SigninData = {
    token: string;
    role: string;
}