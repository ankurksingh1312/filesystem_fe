
// export interface IFilesNfolders {
//     _id:string
//     type: 'FOLDER' | 'ITEM'; // Type of the item (Folder or Item)
//     name: string;           // Name of the file or folder
//     icon: string;  
//     isOpen: boolean       // Icon for the file or folder
//     children: {
//         _id:string
//         type: 'ITEM' | 'FOLDER'; // Type of the item (Folder or Item)
//         name: string;           // Name of the file or folder
//         icon: string; 
//         children: [];
//         isOpen: boolean 
//     }[] | []; // Nested children for folders (null for items)
//   }
  
  export interface IFilesNfolders {
    _id: string;
    type: 'FOLDER' | 'ITEM';
    name: string;
    icon: string;
    isOpen: boolean;
    children: IFilesNfolders[] |[];  // Always an array, never undefined or null
  }