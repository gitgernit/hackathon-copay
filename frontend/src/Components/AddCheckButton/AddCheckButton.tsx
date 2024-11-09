import React, { useState } from 'react'
import './AddCheckButton.css'

const AddCheckButton = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result as string)
            };
            reader.readAsDataURL(file)
        }
    };
    
    return (
    <div className='goods-buttons'>
        <input
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleImageChange}
        />
    </div>
  )
}

export default AddCheckButton