export {}


const enum ContactType {
    Phone,
    Email,
}

type Contact = 
| { kind: ContactType.Email; email: string; }
| { kind: ContactType.Phone; phone: number; }

interface Customer {
    name: string;
    contact: Contact;
}

function printCustomerContact({contact}: Customer) {
    if (contact.kind === ContactType.Email) {
        // Type of `contact` is `EmailContact`
        console.log(contact.email);
    } else {
        // Type of `contact` is `PhoneContact`
        console.log(contact.phone);
    }
}