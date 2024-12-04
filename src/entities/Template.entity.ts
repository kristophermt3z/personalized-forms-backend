/* 
CREATE TABLE Template (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    isPublic BOOLEAN NOT NULL,
    authorId INT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (authorId) REFERENCES User(id) ON DELETE CASCADE
);

*/
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Template {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 255 })
  title!: string;

  @Column("text")
  description!: string;

  @Column()
  isPublic!: boolean;

  @ManyToOne(() => User, (user) => user.templates, { onDelete: "CASCADE" })
  author!: User;

  @CreateDateColumn()
  createdAt!: Date;
}