export type TPaginationApiResponse<List> = {
  list: List[]
  current_page: number
  limit: number
  total_count: number
  total_pages: number
}
