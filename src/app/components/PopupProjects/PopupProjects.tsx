"use client";
import React, { ReactElement, useActionState, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IconType } from "react-icons/lib";
const initialState = {
  statusText: "",
  status: null,
  message: "",
};
export default function PopupProjects(
  {
    typeButton,
    textButton,
    iconButton,
    textHeader,
    styleButton,
    titleProject,
    descriptionProject,
    idProject,
    action
  }:{
    typeButton:"ADD"|"EDIT"|"DELETE",
    textButton?:string,
    iconButton?:ReactElement<IconType>,
    titleProject?:string|'',
    descriptionProject?:string|'',
    textHeader:string,
    styleButton:string ,
    idProject?:string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    action: (prevState: any, formData: FormData) => Promise<{
      status: number | null;
      statusText: string;
      message: string;
  }>
  }
) {
  const [popupState,setPopupState]=useState(false)
  const [state, actionFrom, isPending] = useActionState(action, initialState)
  useEffect(() => {
    if (isPending === false && state.status === 200) {
        toast.success(state.message)
        setPopupState(false)
    }
    else if (isPending === false && state.status !== 200 && state.message.length > 0) {
        toast.error(state.message)
    }
}, [isPending])
  return (
    <div className={`popup-wrapper ${typeButton==='ADD'?'AddPopup':'flex-1'}`}>
      <button
        className={`${typeButton==='ADD'?"":styleButton} outline-none font-bold py-1 px-4 rounded-md cursor-pointer transition-all duration-500 w-full`}
        onClick={() => {
          setPopupState(true);
        }}
      >
        {typeButton==='ADD'?iconButton:textButton}
      </button>
      <div className={`popup transition-all duration-300 backdrop-blur-xl bg-black/20 fixed top-0 left-0 w-dvw h-dvh z-40 flex items-center justify-center ${popupState ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <div className={`container-popup p-8 w-full max-w-lg rounded-xl bg-black/40 flex flex-col gap-8 transition-all duration-500 ${popupState ? 'scale-100' : ' scale-50'}`}>
            <div className="header-popup text-center">
                <h2 className={` text-2xl text-white`}>
                    {textHeader}
                </h2>
            </div>
            <div className="body-popup">
              <form action={actionFrom} className='flex flex-col gap-8'>
                  {typeButton === 'ADD' || typeButton === 'EDIT' ?
                        <>
                        <div className="form-group flex flex-col gap-4">
                          <label htmlFor="title" className='lg:text-2xl text-lg text-start'>
                              Title Project
                          </label>
                          <input type="text" defaultValue={titleProject} placeholder='Enter Title Project' id='title' name='title' className='rounded-lg border border-white/40 resize-none p-2 px-4 outline-none' />
                        </div>
                        <div className="form-group flex flex-col gap-4">
                          <label htmlFor="image" className='lg:text-2xl text-lg text-start'>
                              Thumbnail Project
                          </label>
                          <input type="file" id='image' name='image' className='rounded-lg border border-white/40 resize-none p-2 px-4 outline-none cursor-pointer' />
                        </div>
                        <div className="form-group flex flex-col gap-4">
                          <label htmlFor="description" className='lg:text-2xl text-lg text-start'>
                              Description Project
                          </label>
                          <textarea defaultValue={descriptionProject} placeholder="Enter Description Project" className='border-2 border-white/40 rounded-lg lg:text-lg text-base py-2 px-4 outline-none resize-none h-full min-h-40' id='description' name='description'></textarea>
                        </div>
                        </>
                      :''
                    }
                  <div className='flex justify-center gap-8'>
                      <div className="form-group">
                          <button type='button' className='bg-white/10 border-white border-2 py-1 px-8 rounded-lg cursor-pointer hover:bg-white/50 transition-all duration-300'
                              onClick={() => {
                                  setPopupState(false)
                              }}
                          >
                              Cancel
                          </button>
                      </div>
                      <div className="form-group">
                          <input type="hidden" name="itemId" id="itemId" value={idProject} />
                          <button
                              type='submit'
                              disabled={isPending}
                              className={`${isPending ? 'cursor-not-allowed bg-white/40 text-black/60' : `${styleButton}  cursor-pointer`} font-bold py-1 px-8 rounded-lg transition-all duration-500 outline-none w-full`}>
                              {isPending ? 'Processing...' : textButton}
                          </button>
                      

                      </div>
                  </div>
              </form>
          </div>
          </div>
      </div>
    </div>
  );
}
