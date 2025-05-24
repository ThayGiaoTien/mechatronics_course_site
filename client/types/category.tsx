export interface Category
{
    categories: string[]|null;
    selected: string | null;
    onSelect: (category: string | null) => void;
}