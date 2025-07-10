'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import Link from 'next/link'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'
import { ChevronUpIcon, ChevronDownIcon, MagnifyingGlassIcon, PencilIcon, TrashIcon, ChevronLeftIcon, ChevronRightIcon, PhotoIcon, FunnelIcon } from '@heroicons/react/24/outline'
import { Switch } from '@headlessui/react'
import { ConfirmDialog } from '@/app/components/ui/ConfirmDialog'
import toast from 'react-hot-toast'
import { debounce } from 'lodash'

interface News {
  id: number
  title: string
  slug: string
  category: {
    id: number
    name: string
    slug: string
  }
  publishedAt: string
  published: boolean
  thumbnail: string | null
  author: {
    name: string | null
  }
}

interface PaginationInfo {
  page: number
  limit: number
  total: number
  totalPages: number
}

type SortKey = 'title' | 'category' | 'publishedAt'
type SortOrder = 'asc' | 'desc'

export default function NewsListPage() {
  const [news, setNews] = useState<News[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('すべて')
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('')
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  })
  const [sortKey, setSortKey] = useState<SortKey>('publishedAt')
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc')
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set())
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null)
  const [publishStatus, setPublishStatus] = useState<'all' | 'published' | 'unpublished'>('all')
  const [updatingPublishStatus, setUpdatingPublishStatus] = useState<Set<number>>(new Set())

  const categories = ['すべて', 'その他', 'M&A用語集', '基礎知識']

  // Debounced search handler
  const debouncedSearch = useMemo(
    () => debounce((query: string) => {
      setDebouncedSearchQuery(query)
      setPagination(prev => ({ ...prev, page: 1 }))
    }, 300),
    []
  )

  useEffect(() => {
    debouncedSearch(searchQuery)
  }, [searchQuery, debouncedSearch])

  useEffect(() => {
    fetchNews()
  }, [selectedCategory, pagination.page, debouncedSearchQuery, publishStatus])

  const fetchNews = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (selectedCategory !== 'すべて') {
        // Map category names to slugs
        const categorySlugMap: { [key: string]: string } = {
          'その他': 'others',
          'M&A用語集': 'ma-glossary',
          '基礎知識': 'basic-knowledge'
        }
        const slug = categorySlugMap[selectedCategory]
        if (slug) {
          params.append('category', slug)
        }
      }
      if (debouncedSearchQuery) {
        params.append('search', debouncedSearchQuery)
      }
      if (publishStatus === 'published') {
        params.append('published', 'true')
      } else if (publishStatus === 'unpublished') {
        params.append('published', 'false')
      }
      params.append('page', pagination.page.toString())
      params.append('limit', pagination.limit.toString())
      
      const response = await fetch(`/api/news?${params}`)
      const data = await response.json()
      setNews(data.news)
      setPagination(data.pagination)
      setSelectedItems(new Set()) // Clear selection when fetching new data
    } catch (error) {
      console.error('Failed to fetch news:', error)
      toast.error('ニュースの取得に失敗しました')
    } finally {
      setLoading(false)
    }
  }

  const deleteNews = async (id: number) => {
    setDeleteTargetId(id)
    setShowDeleteDialog(true)
  }

  const confirmDelete = async () => {
    if (!deleteTargetId) return

    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`/api/news/${deleteTargetId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        toast.success('ニュースを削除しました')
        fetchNews()
      } else {
        toast.error('削除に失敗しました')
      }
    } catch (error) {
      console.error('Failed to delete news:', error)
      toast.error('削除に失敗しました')
    }
  }

  const togglePublishStatus = async (id: number, currentStatus: boolean) => {
    setUpdatingPublishStatus(prev => new Set(prev).add(id))
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`/api/news/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ published: !currentStatus })
      })

      if (response.ok) {
        toast.success(`ニュースを${!currentStatus ? '公開' : '非公開'}にしました`)
        // Update local state without refetching
        setNews(prev => prev.map(item => 
          item.id === id ? { ...item, published: !currentStatus } : item
        ))
      } else {
        toast.error('ステータスの更新に失敗しました')
      }
    } catch (error) {
      console.error('Failed to update publish status:', error)
      toast.error('ステータスの更新に失敗しました')
    } finally {
      setUpdatingPublishStatus(prev => {
        const newSet = new Set(prev)
        newSet.delete(id)
        return newSet
      })
    }
  }

  const handleSelectItem = useCallback((id: number, checked: boolean) => {
    setSelectedItems(prev => {
      const newSet = new Set(prev)
      if (checked) {
        newSet.add(id)
      } else {
        newSet.delete(id)
      }
      return newSet
    })
  }, [])

  const handleBulkDelete = async () => {
    if (selectedItems.size === 0) return

    setShowDeleteDialog(true)
    setDeleteTargetId(-1) // Use -1 as a flag for bulk delete
  }

  const confirmBulkDelete = async () => {
    try {
      const token = localStorage.getItem('token')
      const promises = Array.from(selectedItems).map(id => 
        fetch(`/api/news/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
      )

      await Promise.all(promises)
      toast.success(`${selectedItems.size}件のニュースを削除しました`)
      fetchNews()
    } catch (error) {
      console.error('Failed to delete news:', error)
      toast.error('一部のニュースの削除に失敗しました')
    }
  }

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortOrder('asc')
    }
  }

  const sortedAndFilteredNews = useMemo(() => {
    let filtered = [...news]

    // Sort
    filtered.sort((a, b) => {
      let aVal: any
      let bVal: any
      
      if (sortKey === 'category') {
        aVal = a.category.name
        bVal = b.category.name
      } else {
        aVal = a[sortKey]
        bVal = b[sortKey]
      }
      
      if (sortKey === 'publishedAt') {
        aVal = new Date(aVal).getTime()
        bVal = new Date(bVal).getTime()
      }
      
      if (sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1
      } else {
        return aVal < bVal ? 1 : -1
      }
    })

    return filtered
  }, [news, sortKey, sortOrder])

  const handleSelectAll = useCallback((checked: boolean) => {
    if (checked) {
      setSelectedItems(new Set(sortedAndFilteredNews.map(item => item.id)))
    } else {
      setSelectedItems(new Set())
    }
  }, [sortedAndFilteredNews])

  const SortIcon = ({ column }: { column: SortKey }) => {
    if (sortKey !== column) {
      return <div className="w-4 h-4" />
    }
    return sortOrder === 'asc' ? 
      <ChevronUpIcon className="w-4 h-4" /> : 
      <ChevronDownIcon className="w-4 h-4" />
  }

  // Skeleton loader component
  const SkeletonRow = () => (
    <tr className="animate-pulse">
      <td className="px-3 py-4">
        <div className="h-4 w-4 bg-gray-200 rounded"></div>
      </td>
      <td className="px-3 py-4">
        <div className="h-10 w-10 bg-gray-200 rounded-lg"></div>
      </td>
      <td className="px-3 py-4">
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
      </td>
      <td className="hidden sm:table-cell px-3 py-4">
        <div className="h-6 bg-gray-200 rounded-full w-20"></div>
      </td>
      <td className="hidden lg:table-cell px-3 py-4">
        <div className="h-4 bg-gray-200 rounded w-24"></div>
      </td>
      <td className="hidden xl:table-cell px-3 py-4">
        <div className="h-4 bg-gray-200 rounded w-16"></div>
      </td>
      <td className="px-3 py-4">
        <div className="h-6 bg-gray-200 rounded-full w-16"></div>
      </td>
      <td className="px-3 py-4">
        <div className="flex gap-2 justify-end">
          <div className="h-8 w-8 bg-gray-200 rounded"></div>
          <div className="h-8 w-8 bg-gray-200 rounded"></div>
        </div>
      </td>
    </tr>
  )

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-bold text-gray-900">ニュース管理</h1>
          <p className="mt-2 text-sm text-gray-700">
            M&Aニュースの一覧と管理
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Link
            href="/admin/news/create"
            className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
          >
            <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            新規作成
          </Link>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="mt-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search Bar */}
          <div className="relative flex-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full rounded-md border-gray-300 pl-10 pr-3 py-2 text-sm placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              placeholder="タイトルで検索..."
            />
          </div>
          
          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <FunnelIcon className="h-5 w-5 text-gray-400" />
            <select
              value={publishStatus}
              onChange={(e) => {
                setPublishStatus(e.target.value as 'all' | 'published' | 'unpublished')
                setPagination(prev => ({ ...prev, page: 1 }))
              }}
              className="rounded-md border-gray-300 text-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="all">すべて</option>
              <option value="published">公開中</option>
              <option value="unpublished">非公開</option>
            </select>
          </div>
        </div>

        {/* Category Filter and Bulk Actions */}
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category)
                  setPagination(prev => ({ ...prev, page: 1 }))
                }}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  selectedCategory === category
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          {selectedItems.size > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">
                {selectedItems.size}件選択中
              </span>
              <button
                onClick={handleBulkDelete}
                className="inline-flex items-center px-3 py-1.5 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <TrashIcon className="h-4 w-4 mr-1.5" />
                削除
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Data Table */}
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle px-4 sm:px-6 lg:px-8">
            {loading && news.length === 0 ? (
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
                      </th>
                      <th className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        サムネイル
                      </th>
                      <th className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        タイトル
                      </th>
                      <th className="hidden sm:table-cell px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        カテゴリ
                      </th>
                      <th className="hidden lg:table-cell px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        公開日
                      </th>
                      <th className="hidden xl:table-cell px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        作成者
                      </th>
                      <th className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ステータス
                      </th>
                      <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span className="sr-only">操作</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {[...Array(5)].map((_, index) => (
                      <SkeletonRow key={index} />
                    ))}
                  </tbody>
                </table>
              </div>
            ) : sortedAndFilteredNews.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow">
                <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">ニュースがありません</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {debouncedSearchQuery ? '検索条件に一致するニュースが見つかりませんでした。' : '新規作成ボタンから最初のニュースを作成してください。'}
                </p>
              </div>
            ) : (
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                          checked={selectedItems.size === sortedAndFilteredNews.length && sortedAndFilteredNews.length > 0}
                          onChange={(e) => handleSelectAll(e.target.checked)}
                        />
                      </th>
                      <th className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        サムネイル
                      </th>
                      <th className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <button
                          onClick={() => handleSort('title')}
                          className="group inline-flex items-center gap-1 hover:text-gray-900"
                        >
                          タイトル / スラッグ
                          <SortIcon column="title" />
                        </button>
                      </th>
                      <th className="hidden sm:table-cell px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <button
                          onClick={() => handleSort('category')}
                          className="group inline-flex items-center gap-1 hover:text-gray-900"
                        >
                          カテゴリ
                          <SortIcon column="category" />
                        </button>
                      </th>
                      <th className="hidden lg:table-cell px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <button
                          onClick={() => handleSort('publishedAt')}
                          className="group inline-flex items-center gap-1 hover:text-gray-900"
                        >
                          公開日
                          <SortIcon column="publishedAt" />
                        </button>
                      </th>
                      <th className="hidden xl:table-cell px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        作成者
                      </th>
                      <th className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ステータス
                      </th>
                      <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span className="sr-only">操作</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {sortedAndFilteredNews.map((item) => (
                      <tr key={item.id} className={`hover:bg-gray-50 transition-colors ${selectedItems.has(item.id) ? 'bg-indigo-50' : ''}`}>
                        <td className="whitespace-nowrap px-3 py-4">
                          <input
                            type="checkbox"
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            checked={selectedItems.has(item.id)}
                            onChange={(e) => handleSelectItem(item.id, e.target.checked)}
                          />
                        </td>
                        <td className="whitespace-nowrap px-3 py-4">
                          {item.thumbnail ? (
                            <img
                              src={item.thumbnail}
                              alt={item.title}
                              className="h-10 w-10 rounded-lg object-cover"
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-lg bg-gray-200 flex items-center justify-center">
                              <PhotoIcon className="h-5 w-5 text-gray-400" />
                            </div>
                          )}
                        </td>
                        <td className="px-3 py-4">
                          <div className="text-sm font-medium text-gray-900 line-clamp-2">
                            {item.title}
                          </div>
                          <div className="text-xs text-gray-500 mt-1 font-mono">
                            {item.slug}
                          </div>
                          <div className="sm:hidden text-xs text-gray-500 mt-1">
                            {item.category.name} • {format(new Date(item.publishedAt), 'yyyy/MM/dd')}
                          </div>
                        </td>
                        <td className="hidden sm:table-cell whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                            {item.category.name}
                          </span>
                        </td>
                        <td className="hidden lg:table-cell whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {format(new Date(item.publishedAt), 'yyyy年MM月dd日', { locale: ja })}
                        </td>
                        <td className="hidden xl:table-cell whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {item.author.name || '不明'}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4">
                          <div className="flex items-center">
                            <Switch
                              checked={item.published}
                              onChange={() => togglePublishStatus(item.id, item.published)}
                              disabled={updatingPublishStatus.has(item.id)}
                              className={`${
                                item.published ? 'bg-green-600' : 'bg-gray-200'
                              } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50`}
                            >
                              <span className="sr-only">公開状態を切り替え</span>
                              <span
                                className={`${
                                  item.published ? 'translate-x-6' : 'translate-x-1'
                                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                              />
                            </Switch>
                            <span className={`ml-2 text-xs font-medium ${
                              item.published ? 'text-green-600' : 'text-gray-500'
                            }`}>
                              {item.published ? '公開中' : '非公開'}
                            </span>
                          </div>
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={`/admin/news/${item.id}/edit`}
                              className="text-indigo-600 hover:text-indigo-900 p-1 rounded hover:bg-indigo-50 transition-colors"
                              title="編集"
                            >
                              <PencilIcon className="h-4 w-4" />
                            </Link>
                            <button
                              onClick={() => deleteNews(item.id)}
                              className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors"
                              title="削除"
                            >
                              <TrashIcon className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => setPagination(prev => ({ ...prev, page: Math.max(1, prev.page - 1) }))}
              disabled={pagination.page === 1}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400"
            >
              前へ
            </button>
            <button
              onClick={() => setPagination(prev => ({ ...prev, page: Math.min(prev.totalPages, prev.page + 1) }))}
              disabled={pagination.page === pagination.totalPages}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400"
            >
              次へ
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                <span className="font-medium">{pagination.total}</span> 件中{' '}
                <span className="font-medium">{(pagination.page - 1) * pagination.limit + 1}</span> -{' '}
                <span className="font-medium">
                  {Math.min(pagination.page * pagination.limit, pagination.total)}
                </span>{' '}
                件を表示
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  onClick={() => setPagination(prev => ({ ...prev, page: Math.max(1, prev.page - 1) }))}
                  disabled={pagination.page === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400"
                >
                  <span className="sr-only">前へ</span>
                  <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                </button>
                {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                  const pageNumber = i + 1
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => setPagination(prev => ({ ...prev, page: pageNumber }))}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        pagination.page === pageNumber
                          ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      {pageNumber}
                    </button>
                  )
                })}
                <button
                  onClick={() => setPagination(prev => ({ ...prev, page: Math.min(prev.totalPages, prev.page + 1) }))}
                  disabled={pagination.page === pagination.totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400"
                >
                  <span className="sr-only">次へ</span>
                  <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Dialog */}
      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => {
          setShowDeleteDialog(false)
          setDeleteTargetId(null)
        }}
        onConfirm={() => {
          if (deleteTargetId === -1) {
            confirmBulkDelete()
          } else {
            confirmDelete()
          }
        }}
        title={deleteTargetId === -1 ? '複数のニュースを削除' : 'ニュースを削除'}
        message={
          deleteTargetId === -1
            ? `選択した${selectedItems.size}件のニュースを削除しますか？この操作は取り消せません。`
            : 'このニュースを削除しますか？この操作は取り消せません。'
        }
        confirmText="削除"
        cancelText="キャンセル"
        isDestructive={true}
      />
    </div>
  )
}