import{
    BaseEntity,
    Entity,
    Column,
    Index, 
    PrimaryGeneratedColumn
} from "typeorm";

@Entity("users")
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn("increment")
    id!: string;
  
    @Column({
      nullable: true,
      unique: false,
    })

    userid!: string;
    @Column({
      nullable: true,
      unique: true,
    })
    mediaurl!: string;
    @Column({
      nullable: true,
      unique: false,
    })
    category!: string;
    @Column({
      nullable: true,
      unique: false,
    })
    content!: string;
    @Column({
      nullable: true,
      unique: false,
    })
    isimage!:boolean;
    likesscount!: number;
    dislikescount!: number;
    createdat!:object;
    expiry!:number;
  }