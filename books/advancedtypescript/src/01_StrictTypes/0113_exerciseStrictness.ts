/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
interface Address {
    street: string;
    city?: string;    
}

interface User {
    name: string;
    address: Address | undefined;
    meta: Record<string, string>;
}

interface SuperUser extends User {
    permissions: string[];
}

class SafeUserRepository {
    private users: User[];

    constructor() {
        this.users = [
            // Do not change the data. Let's assume it comes from the backend.
            {
                name: "John",
                address: undefined,
                meta: { created: "2019/01/03"}
            },
            {
                name: "Anne",
                address: { street: "Warsaw"},
                meta: { 
                    created: "2019/01/05",
                    modified: "2019/04/02"
                }
            }
        ]
    }

    getUser(id: number) {
        return this.users[id];
    }

    getCities() {
        return this.users
            .filter((user) => user.address)
            .map((user) => user.address!.city)
    }

    forEachUser(action: (user: User) => void) {
        this.users.forEach((user) => action(user));
    }

}

const safeUserRepository = new SafeUserRepository();
console.log(safeUserRepository.getUser(1)?.address?.city?.toLowerCase());
console.log(
    safeUserRepository
    .getCities()
    .map((city) => city?.toUpperCase())
    .join(", ")
)
console.log(
    new Date(safeUserRepository?.getUser(0)?.meta.modfified ?? 0).getFullYear()
  );
