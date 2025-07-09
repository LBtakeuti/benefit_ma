import { z } from 'zod'

export const newsFormSchema = z.object({
  title: z.string()
    .min(1, 'タイトルは必須です')
    .max(200, 'タイトルは200文字以内で入力してください'),
  
  content: z.string()
    .min(1, '本文は必須です')
    .max(10000, '本文は10000文字以内で入力してください'),
  
  slug: z.string()
    .min(1, 'スラッグは必須です')
    .max(200, 'スラッグは200文字以内で入力してください')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'スラッグは小文字英数字とハイフンのみ使用できます'),
  
  categoryId: z.string()
    .min(1, 'カテゴリは必須です')
    .transform((val) => parseInt(val)),
  
  thumbnail: z.string()
    .url('有効なURLを入力してください')
    .optional()
    .or(z.literal('')),
  
  published: z.boolean().default(false),
  
  publishedAt: z.string()
    .optional()
    .transform((val) => val ? new Date(val).toISOString() : null),
  
  tags: z.array(z.string()).optional()
})

export type NewsFormData = z.input<typeof newsFormSchema>
export type NewsFormValues = z.output<typeof newsFormSchema>