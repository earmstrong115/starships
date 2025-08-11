namespace StarWarsApi.Server
{
    public class PagedRequest<T>
    {
        public T[] Data { get; set; }

        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 10;
        public FilterItem[] Filters { get; set; }
        public string SortBy { get; set; }
        public bool SortDescending { get; set; } = false;

        public PagedRequest()
        {
        }

        public PagedRequest(T[] data, int page, int pageSize, FilterItem[] filters = null, string sortBy = null, bool sortDescending = false)
        {
            Data = data;
            Page = page;
            PageSize = pageSize;
            Filters = filters;
            SortBy = sortBy;
            SortDescending = sortDescending;
        }
    }

    public class FilterItem
    {
        public string Field { get; set; }
        public string Value { get; set; }
    }
}
