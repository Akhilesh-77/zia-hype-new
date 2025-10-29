import React, { useState, useEffect } from 'react';
import { Bot, Theme } from '../types';
import ImageIcon from './icons/ImageIcon';

interface CreatePageProps {
  onSaveBot: (newBot: Omit<Bot, 'id'> & { id?: string }) => void;
  botToEdit?: Bot | null;
  onCancel: () => void;
  theme: Theme;
}

const ImagePreview: React.FC<{ src: string, alt: string }> = ({ src, alt }) => {
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setIsValid(true);
    img.onerror = () => setIsValid(false);
  }, [src]);

  return (
    <div className="w-full h-24 rounded-lg flex items-center justify-center bg-black/10 overflow-hidden">
      {isValid ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <ImageIcon />
      )}
    </div>
  );
};


const CreatePage: React.FC<CreatePageProps> = ({ onSaveBot, botToEdit, onCancel, theme }) => {
  const [name, setName] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [gifUrl, setGifUrl] = useState('');
  const [chatBgUrl, setChatBgUrl] = useState('');
  const [description, setDescription] = useState('');
  const [storyIdea, setStoryIdea] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const isEditMode = !!botToEdit;

  useEffect(() => {
    if (botToEdit) {
      setName(botToEdit.name);
      setPhotoUrl(botToEdit.photoUrl);
      setGifUrl(botToEdit.gifUrl);
      setChatBgUrl(botToEdit.chatBgUrl);
      setDescription(botToEdit.description);
      setStoryIdea(botToEdit.storyIdea);
    }
  }, [botToEdit]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!name) newErrors.name = "Bot Name is required";
    if (!photoUrl) newErrors.photoUrl = "Photo URL is required";
    if (!chatBgUrl) newErrors.chatBgUrl = "Background URL is required";
    if (!description) newErrors.description = "Description is required";
    if (!storyIdea) newErrors.storyIdea = "Story Idea is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSaveBot({
        id: botToEdit?.id,
        name,
        photoUrl,
        gifUrl,
        chatBgUrl,
        description,
        storyIdea,
      });
    }
  };

  const formClasses = {
      light: 'bg-white/60 text-gray-700',
      dark: 'bg-gray-800/50 text-gray-300',
      pink: 'bg-white/30 text-gray-700',
  }[theme];
  
  const inputClasses = {
      light: 'bg-white/70 border-gray-300 focus:ring-pink-500 focus:border-pink-500',
      dark: 'bg-gray-900/50 border-gray-600 focus:ring-pink-400 focus:border-pink-400 text-white',
      pink: 'bg-white/50 border-purple-300 focus:ring-purple-500 focus:border-purple-500',
  }[theme];

  return (
    <div className="px-4 pb-8">
      <h2 className="text-3xl font-bold text-center mb-6">{isEditMode ? 'Edit Your Bot' : 'Create Your Bot'}</h2>
      <form onSubmit={handleSubmit} className={`max-w-md mx-auto p-6 rounded-2xl shadow-lg space-y-4 backdrop-blur-sm transition-colors duration-400 ${formClasses}`}>
        <div>
          <label htmlFor="name" className="block text-sm font-medium">Bot Name <span className="text-red-500">*</span></label>
          <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} className={`mt-1 block w-full rounded-md shadow-sm transition-colors duration-400 ${inputClasses}`}/>
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="photoUrl" className="block text-sm font-medium mb-1">Bot Photo URL <span className="text-red-500">*</span></label>
            <ImagePreview src={photoUrl} alt="Bot Photo Preview" />
            <input type="url" id="photoUrl" value={photoUrl} onChange={e => setPhotoUrl(e.target.value)} placeholder="https://..." className={`mt-2 block w-full rounded-md shadow-sm text-xs transition-colors duration-400 ${inputClasses}`}/>
            {errors.photoUrl && <p className="text-red-500 text-xs mt-1">{errors.photoUrl}</p>}
          </div>
          <div>
            <label htmlFor="chatBgUrl" className="block text-sm font-medium mb-1">Chat BG URL (9:16) <span className="text-red-500">*</span></label>
            <ImagePreview src={chatBgUrl} alt="Chat BG Preview" />
            <input type="url" id="chatBgUrl" value={chatBgUrl} onChange={e => setChatBgUrl(e.target.value)} placeholder="https://..." className={`mt-2 block w-full rounded-md shadow-sm text-xs transition-colors duration-400 ${inputClasses}`}/>
            {errors.chatBgUrl && <p className="text-red-500 text-xs mt-1">{errors.chatBgUrl}</p>}
          </div>
        </div>
        
        <div>
          <label htmlFor="gifUrl" className="block text-sm font-medium">Bot GIF URL (Optional)</label>
          <input type="url" id="gifUrl" value={gifUrl} onChange={e => setGifUrl(e.target.value)} placeholder="https://..." className={`mt-1 block w-full rounded-md shadow-sm transition-colors duration-400 ${inputClasses}`}/>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium">Description <span className="text-red-500">*</span></label>
          <input type="text" id="description" value={description} onChange={e => setDescription(e.target.value)} className={`mt-1 block w-full rounded-md shadow-sm transition-colors duration-400 ${inputClasses}`}/>
          {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
        </div>
        
        <div>
          <label htmlFor="storyIdea" className="block text-sm font-medium">Story Idea <span className="text-red-500">*</span></label>
          <textarea id="storyIdea" value={storyIdea} onChange={e => setStoryIdea(e.target.value)} rows={3} className={`mt-1 block w-full rounded-md shadow-sm transition-colors duration-400 ${inputClasses}`}></textarea>
          {errors.storyIdea && <p className="text-red-500 text-xs mt-1">{errors.storyIdea}</p>}
        </div>

        <div className="flex space-x-4 pt-2">
            <button type="button" onClick={onCancel} className="w-1/3 bg-gray-300/50 text-gray-800 font-bold py-3 px-4 rounded-lg shadow-md hover:bg-gray-300/80 transform transition duration-300 ease-in-out">
                Cancel
            </button>
            <button type="submit" className="w-2/3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:scale-105 transform transition-transform duration-300 ease-in-out">
                {isEditMode ? 'Update Bot' : 'Create Bot'}
            </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePage;