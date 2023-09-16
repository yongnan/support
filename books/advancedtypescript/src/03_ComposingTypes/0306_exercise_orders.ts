export {}

type Customer = {
    name: string;
    contactInfo: ContactInfo;
  };
  
  type ContactInfo =
    | { kind: "emailOnly"; email: string }
    | { kind: "postalOnly"; address: string }
    | { kind: "emailAndPostal"; email: string; address: string };
  
  type PaidOrderData = { paymentDate: Date; amount: number };
  type SentOrderData = { sendingDate: Date };
  type DeliveredOrderData = { deliveryDate: Date };
  
  type OrderState =
    | { kind: "new" }
    | { kind: "paid"; paidData: PaidOrderData }
    | { kind: "sent"; paidData: PaidOrderData; sentData: SentOrderData }
    | {
        kind: "delivered";
        data: PaidOrderData;
        sentData: SentOrderData;
        deliveredData: DeliveredOrderData;
      };
  
  type Order = {
    customer: Customer;
    state: OrderState;
    productName: string;
    price: number;
    quantity: number;
  };
  