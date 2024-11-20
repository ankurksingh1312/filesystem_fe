export interface Item {
    _id: string;
    icon: string;
    title: string;
}

export interface Folder {
    _id: string;
    name: string;
    isOpen: boolean;
} 