import type { Prisma } from "@prisma/client";
import { z } from "zod";

export const UserSchema = z.object({
  id: z.string(),
  username: z.string().min(1),
  display_name: z.string().min(1),
  avatar: z.string().url(),
});

export const UserDraftSchema = UserSchema.omit({ id: true });

export type UserDraftType = z.infer<typeof UserDraftSchema>;
export type UserType = z.infer<typeof UserSchema>;

export class UserDraft {
  readonly username: string;
  readonly displayName: string;
  readonly avatar: string;

  protected constructor(data: UserDraftType) {
    this.username = data.username;
    this.displayName = data.display_name;
    this.avatar = data.avatar;
  }

  static create(data: UserDraftType): UserDraft {
    const validatedData = UserDraftSchema.parse(data);
    return new UserDraft(validatedData);
  }

  toDB(id: string): Prisma.UserUncheckedCreateInput {
    return {
      id,
      username: this.username,
      displayName: this.displayName,
      avatar: this.avatar,
    };
  }
}

export class User extends UserDraft {
  readonly id: string;

  private constructor(data: UserType) {
    super(data);
    this.id = data.id;
  }

  static create(data: UserType): User {
    const validatedData = UserSchema.parse(data);
    return new User(validatedData);
  }

  isEqual(other: User): boolean {
    return this.id === other.id;
  }

  toDB(): Prisma.UserUncheckedCreateInput {
    return {
      id: this.id,
      username: this.username,
      displayName: this.displayName,
      avatar: this.avatar,
    };
  }
}
