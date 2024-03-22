export class User {
    id:          string;
    name:        string;
    address:     string;
    username:    string;
    email:       string;
    is_validated: boolean;
    is_user:      boolean;

    constructor(id:string, address:string, name: string, username: string, email: string, is_validated: boolean = false, is_user: boolean = true) {
        this.id = id;
        this.address = address;
        this.name = name;
        this.username = username;
        this.email = email;
        this.is_validated = is_validated;
        this.is_user = is_user;
    }

    public static fromJson(json: any): User {
        return json;
    }

    public static toJson(value: User): string {
        return JSON.stringify(value);
    }

    // static createUserFromArray(data: readonly [string, string, string] | readonly [string, string, string, boolean]): User | null {
    //     if (data.length < 4) {
    //         const [name, username, email] = data;
            
    //         return new User(name, username, email, false);
    //     }
    
    //     const [name, username, email, isValidated] = data;
    
    //     return new User(name, username, email, isValidated);
    //   }
}