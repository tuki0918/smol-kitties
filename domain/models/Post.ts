import type { Prisma } from "@prisma/client";
import { z } from "zod";

export const PostSchema = z.object({
  id: z.number(),
  user_id: z.string(),
  message: z.string(),
  image: z.string().url(),
  video: z.string().url(),
  reference: z.string().url(),
  likes: z.number(),
  dislikes: z.number(),
});

export const PostDraftSchema = PostSchema.omit({ id: true });

export type PostDraftType = z.infer<typeof PostDraftSchema>;
export type PostType = z.infer<typeof PostSchema>;

export class PostDraft {
  readonly userId: string;
  readonly message: string;
  readonly image: string;
  readonly video: string;
  readonly reference: string;
  readonly likes: number;
  readonly dislikes: number;

  protected constructor(data: PostDraftType) {
    this.userId = data.user_id;
    this.message = data.message;
    this.image = data.image;
    this.video = data.video;
    this.reference = data.reference;
    this.likes = data.likes;
    this.dislikes = data.dislikes;
  }

  static create(data: PostDraftType): PostDraft {
    const validatedData = PostDraftSchema.parse(data);
    return new PostDraft(validatedData);
  }

  toDB(id: number): Prisma.PostUncheckedCreateInput {
    return {
      id,
      user_id: this.userId,
      message: this.message,
      image: this.image,
      video: this.video,
      reference: this.reference,
      likes: this.likes,
      dislikes: this.dislikes,
    };
  }
}

export class Post extends PostDraft {
  readonly id: number;

  private constructor(data: PostType) {
    super(data);
    this.id = data.id;
  }

  static create(data: PostType): Post {
    const validatedData = PostSchema.parse(data);
    return new Post(validatedData);
  }

  isEqual(other: Post): boolean {
    return this.id === other.id;
  }

  toDB(): Prisma.PostUncheckedCreateInput {
    return {
      id: this.id,
      user_id: this.userId,
      message: this.message,
      image: this.image,
      video: this.video,
      reference: this.reference,
      likes: this.likes,
      dislikes: this.dislikes,
    };
  }
}
