
export interface HighestPurchase{
    UserId: string;
    Name: string;
    PurchaseAmount: string;
   
}

export interface HighestOrder {
    UserId: string;
    Name: string;
    OrderCount: string;
}

export interface HighestSale {
    ProductId: string;
    ProductName: string;
    OrderCount:boolean;
}