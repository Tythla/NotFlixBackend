import { Column, Entity, ObjectIdColumn } from "typeorm";
import { ObjectId } from "mongodb";

@Entity("session")
export class SessionEntity {
  @ObjectIdColumn()
  _id?: ObjectId;

  @Column()
  token: string;

  @Column()
    userId: string;
    
    constructor(token: string, userId: string) {
        this.token = token;
        this.userId = userId;
    }
}
