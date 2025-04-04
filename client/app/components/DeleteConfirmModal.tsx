'use client';
import { useState } from 'react';

interface DeleteConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    courseName?:string;
}   

export default function DeleteConfirmModal({ 
    isOpen, 
    onClose, 
    onConfirm, 
    courseName ='this course'
}: DeleteConfirmModalProps) {
    if(!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg">
                <h2 className="text-xl font-bold mb-4">Delete Confirmation</h2>
                <p>Are you sure you want to delete {courseName}? This action can not be undone.</p>
                <div className="mt-4 flex justify-end">
                    <button
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className={`bg-red-600 text-white px-4 py-2 rounded `}
                        onClick={onConfirm}
                        
                    >
                        
                    </button>
                </div>
            </div>
        </div>
    );
}