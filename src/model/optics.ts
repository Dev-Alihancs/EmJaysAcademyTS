enum UserStatus {Active, Inactive, Resigned}
enum Status {Started, InProgress, AdvancePaid, Paid, Completed}
enum Side {Left, Right}
enum Point {} // -20.00, -19.75 to 19.75, 20.00
enum ProductType {Frame, Lens, ContactLens, SunGlasses, ReadingGlasses, Solutions, Accessories}
enum Role {}

export interface Purchase {
    id: number;
    date: Date;
    branchId: number; //Branch::id
    productId: number;//Product::id
    quantity: number;
    currency:string;
    unitPrice: number;
    notes?: string;
    otherExpense?: number;
    discount?: number;
    discountPercentage?: number;
    advance?: number;
    advanceDate?: Date;
    status: Status;

}

export interface Sale {
    id: number;
    date: Date;
    customerId: number; //Customer::id
    branchId: number; //Branch::id
    userId: number; //User::id
    doctorName: string;
    referredBy: string;
    notes?: string;
    otherExpense?: number;
    discount?: number;
    discountPercentage?: number;
    advance?: number;
    amount?: number;
    paymentDate: number;
    status: Status;
    lensConfig?: LensConfig[];
    items?: Item[];
}

export interface LensConfig {
    id: number;
    side: Side;
    dvsph?: Point;
    nvsph?: Point;
    dvcyl?: Point;
    nvcyl?: Point;
    dvaxis?: string;
    nvaxis?: string;
    add?: string;
}

export interface Item {
    id: number;
    productId: number;//Product::id
    //branchProductId: number; //BranchProduct::id
    quantity: number;
    unitPrice: number;

}


export interface Customer {
    id: number;
    name: string;
    dob?: Date;
    phone: string;
    email?: string;
    nationalId?: string;
    notes?: string;
    isDeleted?:boolean;
}

export interface User {
    id: number;
    name: string;
    userName: string;
    password: string;
    dob?: Date;
    phone: string;
    email?: string;
    nationalId?: string;
    role: Role;
    branches: Branch[];
    status: UserStatus;
}

export interface Branch {
    id: number;
    name: string;
    address: string;
    state: string;
    country: string;
    pincode: string;
    phone: string;
    email?: string;
    status: Status;
}

export interface Product {
    id: number;
    name: string;
    productType: ProductType;
    description?: string;
    modelNumber?: string;
    manufacturer?: string;
    isSaleable: boolean;
}

export interface BranchProduct {
    id: number;
    branchId: number; //Branch::id
    productId: number;//Product::id
    quantity: number;
    price: number;
    isSaleable: boolean;
}