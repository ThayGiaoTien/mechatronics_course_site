// Date Created: 9/6/21
// This file contains the types for the course data that will be fetched from the backend API.
export interface Course {
    _id: string;
    title: string;
    description: string;
    price: number;
    thumbnail: string;
}
