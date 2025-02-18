export function sortData<T>(
    data: T[],
    sortField: keyof T | null,
    sortOrder: "asc" | "desc"
  ): T[] {
    if (!sortField) return [...data];
  
    const sortedData = [...data].sort((a, b) => {
      const valueA = a[sortField];
      const valueB = b[sortField];
  
      const strA = Array.isArray(valueA) ? valueA.join(", ").toLowerCase() : String(valueA).toLowerCase(); // Lowercase for consistent sorting
      const strB = Array.isArray(valueB) ? valueB.join(", ").toLowerCase() : String(valueB).toLowerCase();
  
      return sortOrder === "asc"
        ? strA.localeCompare(strB)
        : strB.localeCompare(strA);
    });
    return sortedData;
  }
  
  export function filterData<T>(data: T[], searchTerms: string[], searchFields: (keyof T)[]): T[] {
    if (!searchTerms || searchTerms.length === 0) return data;
  
    const lowerCaseSearchTerms = searchTerms.map(term => term.toLowerCase());
  
    return data.filter((item) => {
      for (const field of searchFields) {
        const value = item[field];
        const strValue = Array.isArray(value) ? value.join(" ").toLowerCase() : String(value).toLowerCase();
  
        for (const term of lowerCaseSearchTerms) {
          if (strValue.includes(term)) {
            return true;
          }
        }
      }
      return false;
    });
  }