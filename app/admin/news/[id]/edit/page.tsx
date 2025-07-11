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

interface NewsItem {
  id: number
  title: string
  content: string
  slug: string
  categoryId: number
  thumbnail: string | null
  published: boolean
  publishedAt: string | null
  tags?: string[]
}

// Loading skeleton component
function LoadingSkeleton() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="h-9 w-64 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
        {/* Title skeleton */}
        <div>
          <div className="h-5 w-20 bg-gray-200 rounded animate-pulse mb-2"></div>
          <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
        </div>
        
        {/* Slug skeleton */}
        <div>
          <div className="h-5 w-20 bg-gray-200 rounded animate-pulse mb-2"></div>
          <div className="flex gap-2">
            <div className="flex-1 h-10 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
        
        {/* Category skeleton */}
        <div>
          <div className="h-5 w-24 bg-gray-200 rounded animate-pulse mb-2"></div>
          <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
        </div>
        
        {/* Published checkbox skeleton */}
        <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
        
        {/* Content skeleton */}
        <div>
          <div className="h-5 w-16 bg-gray-200 rounded animate-pulse mb-2"></div>
          <div className="h-48 w-full bg-gray-200 rounded animate-pulse"></div>
        </div>
        
        {/* Buttons skeleton */}
        <div className="pt-6 flex justify-between">
          <div className="h-10 w-24 bg-gray-200 rounded animate-pulse"></div>
          <div className="flex gap-4">
            <div className="h-10 w-24 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-10 w-24 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Confirmation dialog component
function ConfirmDialog({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message 
}: {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
}) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>
        
        <span className="hidden sm:inline-block sm:h-screen sm:align-middle">&#8203;</span>
        
        <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg font-medium leading-6 text-gray-900">{title}</h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">{message}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              type="button"
              onClick={onConfirm}
              className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
            >
              削除する
            </button>
            <button
              type="button"
              onClick={onClose}
              className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              キャンセル
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function EditNewsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [dataLoading, setDataLoading] = useState(true)
  const [categories, setCategories] = useState<Category[]>([])
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [thumbnailPreviewError, setThumbnailPreviewError] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
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
    fetchData()
  }, [params.id])

  const fetchData = async () => {
    try {
      setDataLoading(true)
      
      // Fetch categories and news data in parallel
      const [categoriesResponse, newsResponse] = await Promise.all([
        fetch('/api/categories'),
        fetch(`/api/news/${params.id}`)
      ])

      if (!categoriesResponse.ok || !newsResponse.ok) {
        throw new Error('データの取得に失敗しました')
      }

      const categoriesData = await categoriesResponse.json()
      const newsData = await newsResponse.json()

      setCategories(categoriesData.categories)
      
      const news: NewsItem = newsData.news
      
      // Reset form with fetched data
      reset({
        title: news.title || '',
        content: news.content || '',
        slug: news.slug || '',
        categoryId: news.categoryId?.toString() || '',
        thumbnail: news.thumbnail || '',
        published: news.published || false,
        publishedAt: news.publishedAt ? new Date(news.publishedAt).toISOString().slice(0, 16) : new Date().toISOString().slice(0, 16),
        tags: news.tags || []
      })
      
    } catch (error) {
      console.error('Failed to fetch data:', error)
      toast.error('データの取得に失敗しました')
    } finally {
      setDataLoading(false)
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
      const response = await fetch(`/api/news/${params.id}`, {
        method: 'PUT',
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
        toast.success('ニュースを更新しました')
        router.push('/admin/news')
      } else {
        const error = await response.json()
        toast.error(error.error || '更新に失敗しました')
      }
    } catch (error) {
      console.error('Failed to update news:', error)
      toast.error('エラーが発生しました')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    setDeleteLoading(true)

    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`/api/news/${params.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        toast.success('ニュースを削除しました')
        router.push('/admin/news')
      } else {
        const error = await response.json()
        toast.error(error.error || '削除に失敗しました')
      }
    } catch (error) {
      console.error('Failed to delete news:', error)
      toast.error('エラーが発生しました')
    } finally {
      setDeleteLoading(false)
      setShowDeleteDialog(false)
    }
  }

  if (dataLoading) {
    return <LoadingSkeleton />
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">ニュースを編集</h1>
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
            <option value="">カテゴリを選択</option>
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
        <div className="pt-6 flex justify-between">
          <button
            type="button"
            onClick={() => setShowDeleteDialog(true)}
            disabled={deleteLoading}
            className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            {deleteLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                削除中...
              </>
            ) : (
              '削除する'
            )}
          </button>
          
          <div className="flex gap-4">
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
                  更新中...
                </>
              ) : (
                '更新する'
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Delete confirmation dialog */}
      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDelete}
        title="ニュースを削除"
        message="本当にこのニュースを削除しますか？この操作は取り消すことができません。"
      />
    </div>
  )
}