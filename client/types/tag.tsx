export interface Tag {
    tags: string[] | null;
    selected: string | null;
    onSelect: (tag: string | null) => void;
}
