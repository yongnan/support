/* eslint-disable no-undef */
export {}

// interface EmailContact {
//     kind: "email";
//     email: string;
// }

// interface PhoneContact {
//     kind: "phone";
//     phone: number;
// }
//
//type Contact = EmailContact | PhoneContact;

// teser format of Contact type
type Contact = 
        { kind: "email"; email: string; }
    |   { kind: "phone"; phone: number; }

interface Customer {
    name: string;
    contact: Contact;
}

function printCustomerContact({contact}: Customer) {
    if (contact.kind === "email") {
        // Type of `contact` is `EmailContact`
        console.log(contact.email);
    } else {
        // Type of `contact` is `PhoneContact`
        console.log(contact.phone);
    }
}