import useUploadModal from "@/hooks/useUploadModal";
import Modal from "./Modal";
import toast from "react-hot-toast";

import uniqid from 'uniqid';
import { useState } from 'react';
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";

import Input from "./Input";
import Button from "./Button";
import { useUser } from "@/hooks/useUser";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

const UploadModal = () => {
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();
    const {user} = useUser();
    const supabaseClient = useSupabaseClient();
    const uploadModal = useUploadModal();

    const {
        register,
        handleSubmit,
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            author: '',
            title: '',
            song: null,
            image: null,
        }
    })

    const onChange = (open: boolean) => {
        if (!open) {
            reset();
            uploadModal.onClose();

        }
    };

    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        try{
            setIsLoading(true);

            const imageFile = await values.image?.[0]
            const songFile =await values.song?.[0]

            if(!user || !imageFile || !songFile){
                toast.error('Missing fields');
                return;
            }
            
            const uniqueID = uniqid();
//upload song
            const {
                data: songData,
                error: songError,
            } = await supabaseClient.storage.from('songs').upload(`song-${values.title}-${uniqueID}`,songFile,{
                cacheControl:'3600',
                upsert:false
            });

            if(songError){
                setIsLoading(false);
                return toast.error('Failed to upload song');
            }

            //upload image
            const {
                data: imageData,
                error: imageError,
            } = await supabaseClient.storage.from('images').upload(`image-${values.title}-${uniqueID}`,imageFile,{
                cacheControl:'3600',
                upsert:false
            });

            if(imageError){
                setIsLoading(false);
                return toast.error('Failed to upload image');
            }
            

            const {error:supabaseError} = await supabaseClient
            .from('songs')
            .insert({
                user_id:user.id,
                title:values.title,
                author:values.author,
                image_path:imageData.path,
                song_path:songData.path

            })

            if(supabaseError){
                setIsLoading(false);
                return toast.error(supabaseError.message)
            }

            router.refresh();
            setIsLoading(false);
            toast.success('Song created');
            uploadModal.onClose();

        }catch(error){
            toast.error('Something went wrong')
        }finally{
            setIsLoading(false);
        }

    };

    return (
        <Modal title="Add a song" description="Upload an mp3 file" isOpen={uploadModal.isOpen} onChange={onChange}>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
                <Input
                    id='title'
                    disabled={isLoading}
                    {...register('title', { required: true })}
                    placeholder="Song title" />

                <Input
                    id='author'
                    disabled={isLoading}
                    {...register('author', { required: true })}
                    placeholder="Song author" />
                <div>
                    <div className="pb-1">
                        Select a song file
                    </div>
                    <Input
                        id='song'
                        type='file'
                        disabled={isLoading}
                        {...register('song', { required: true })}
                        accept="audio/*"
                        className="cursor-pointer"
                    />

                </div>

                <div>
                    <div className="pb-1">
                        Select an Image
                    </div>
                    <Input
                        id='image'
                        type='file'
                        disabled={isLoading}
                        {...register('image', { required: true })}
                        accept="image/*"
                        className="cursor-pointer"
                    />

                </div>
            <Button disabled={isLoading} type="submit" className="w-full text-black font-bold">Create</Button>
            </form>
        </Modal>
    )
}

export default UploadModal;
