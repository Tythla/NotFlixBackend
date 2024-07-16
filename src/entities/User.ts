import { Column, Entity, ObjectIdColumn } from "typeorm";
import { ObjectId } from "mongodb";

@Entity("user")
export class User {
  @ObjectIdColumn()
  _id?: ObjectId;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: "enum",
    enum: ["USER", "ADMIN"],
    default: "USER",
  })
  role: string;   
  
  @Column({
    type: "enum",
    enum: ["basic", "standard", "premium"],
    default: "basic",
  })
  plan: string;
    
  @Column()
  api: string;
    


  constructor(
    username: string,
    email: string,
    password: string,
    role: string = "USER",
    plan: string,
    api: string = '775ab391c192a98f82f683c7653a4b59'
  ) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.role = role;
    this.plan = plan;
    this.api = api;
  }
}
