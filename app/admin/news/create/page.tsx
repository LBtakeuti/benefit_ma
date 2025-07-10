'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { newsFormSchema, type NewsFormData } from '@/app/lib/validations/news'

interface Category {
  id: number
  name: string
  slug: string
}

export default function CreateNewsPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [categoriesLoading, setCategoriesLoading] = useState(true)
  const [thumbnailPreviewError, setThumbnailPreviewError] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    trigger
  } = useForm<NewsFormData>({
    resolver: zodResolver(newsFormSchema),
    defaultValues: {
      title: '',
      content: '',
      slug: '',
      categoryId: '',
      thumbnail: '',
      published: false,
      publishedAt: new Date().toISOString().slice(0, 16),
      tags: []
    }
  })

  const watchTitle = watch('title')
  const watchThumbnail = watch('thumbnail')
  const watchPublished = watch('published')

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      setCategoriesLoading(true)
      const response = await fetch('/api/categories')
      const data = await response.json()
      setCategories(data.categories)
      // Set default category to the first one
      if (data.categories.length > 0) {
        setValue('categoryId', data.categories[0].id.toString())
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error)
      toast.error('カテゴリの取得に失敗しました')
    } finally {
      setCategoriesLoading(false)
    }
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
      .trim()
      .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
  }

  const handleGenerateSlug = () => {
    const title = watchTitle
    if (title) {
      const newSlug = generateSlug(title)
      setValue('slug', newSlug)
      trigger('slug') // Trigger validation for slug field
    } else {
      toast.error('タイトルを入力してください')
    }
  }

  const onSubmit = async (data: NewsFormData) => {
    setLoading(true)

    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...data,
          categoryId: parseInt(data.categoryId),
          publishedAt: data.publishedAt ? new Date(data.publishedAt).toISOString() : null,
          thumbnail: data.thumbnail || null
        })
      })

      if (response.ok) {
        toast.success('ニュースを作成しました')
        router.push('/admin/news')
      } else {
        const error = await response.json()
        toast.error(error.error || '作成に失敗しました')
      }
    } catch (error) {
      console.error('Failed to create news:', error)
      toast.error('エラーが発生しました')
    } finally {
      setLoading(false)
    }
  }

  if (categoriesLoading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">新しいニュースを作成</h1>
          <Link
            href="/admin/news"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            ← 一覧に戻る
          </Link>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-md p-6 space-y-6">
        {/* タイトル */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            タイトル <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            {...register('title')}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              errors.title ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="ニュースのタイトルを入力"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        {/* スラッグ */}
        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
            スラッグ <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              id="slug"
              {...register('slug')}
              className={`flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                errors.slug ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="news-title-slug"
            />
            <button
              type="button"
              onClick={handleGenerateSlug}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
            >
              タイトルから生成
            </button>
          </div>
          {errors.slug && (
            <p className="mt-1 text-sm text-red-600">{errors.slug.message}</p>
          )}
          <p className="mt-1 text-xs text-gray-500">URLの一部として使用されます（英数字とハイフンのみ）</p>
        </div>

        {/* カテゴリ */}
        <div>
          <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-2">
            カテゴリ <span className="text-red-500">*</span>
          </label>
          <select
            id="categoryId"
            {...register('categoryId')}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              errors.categoryId ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id.toString()}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.categoryId && (
            <p className="mt-1 text-sm text-red-600">{errors.categoryId.message}</p>
          )}
        </div>

        {/* 公開設定 */}
        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              {...register('published')}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">公開する</span>
          </label>
        </div>

        {/* 公開日時 */}
        {watchPublished && (
          <div>
            <label htmlFor="publishedAt" className="block text-sm font-medium text-gray-700 mb-2">
              公開日時
            </label>
            <input
              type="datetime-local"
              id="publishedAt"
              {...register('publishedAt')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <p className="mt-1 text-xs text-gray-500">指定しない場合は現在時刻が設定されます</p>
          </div>
        )}

        {/* サムネイルURL */}
        <div>
          <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700 mb-2">
            サムネイルURL
          </label>
          <input
            type="url"
            id="thumbnail"
            {...register('thumbnail')}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              errors.thumbnail ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="https://example.com/image.jpg"
          />
          {errors.thumbnail && (
            <p className="mt-1 text-sm text-red-600">{errors.thumbnail.message}</p>
          )}
          
          {/* サムネイルプレビュー */}
          {watchThumbnail && !errors.thumbnail && (
            <div className="mt-3">
              <p className="text-sm text-gray-600 mb-2">プレビュー:</p>
              <div className="relative inline-block">
                {!thumbnailPreviewError ? (
                  <img 
                    src={watchThumbnail} 
                    alt="サムネイルプレビュー" 
                    className="h-40 w-auto object-cover rounded border border-gray-200"
                    onError={() => setThumbnailPreviewError(true)}
                    onLoad={() => setThumbnailPreviewError(false)}
                  />
                ) : (
                  <div className="h-40 w-60 bg-gray-100 rounded border border-gray-200 flex items-center justify-center">
                    <p className="text-sm text-gray-500">画像を読み込めません</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* 内容 */}
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
            内容 <span className="text-red-500">*</span>
          </label>
          <textarea
            id="content"
            {...register('content')}
            rows={12}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              errors.content ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="ニュースの内容を入力"
          />
          {errors.content && (
            <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
          )}
          <p className="mt-1 text-xs text-gray-500">
            {watch('content')?.length || 0} / 10000 文字
          </p>
        </div>

        {/* ボタン */}
        <div className="pt-6 flex justify-end gap-4">
          <Link
            href="/admin/news"
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            キャンセル
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                作成中...
              </>
            ) : (
              '作成する'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}