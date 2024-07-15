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

  constructor(
    username: string,
    email: string,
    password: string,
    role: string = "USER"
  ) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.role = role;
  }
}
