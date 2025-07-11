import React from 'react'
import { PhotoIcon2 } from '../icons'

function AddPicture({file, setFile}) {
  const hdlFileChange = e => {
    console.dir(e.target.value)
    console.dir(e.target.files[0])
    setFile(e.target.files[0])
    console.log(URL.createObjectURL(e.target.files[0]))

  }
  const removePic = e => {
      e.stopPropagation()
      document.getElementById('input-file').value = ''
      setFile(null)
    }
  return (
    <div>
      <div className="flex flex-col p-2 border rounded-lg">
      <div
        className="bg-slate-100 min-h-40 relative cursor-pointer hover:bg-slate-200"
        onClick={() => document.getElementById("input-file").click()}
      >
        <input type="file" className="hidden" id="input-file" 
        onChange={hdlFileChange}
        />
        {file && 
        <>
        <img src={URL.createObjectURL(file)} className = "h-full block mx-auto" />
        <button className="btn btn-sm btn-circle btn-dash btn-error absolute top-1 right-1 opacity-60"
        onClick={removePic}
        >x</button>
        </>
        
        }
        {!file && 
        <PhotoIcon2 className="w-10 absolute top-15 right-1/2 translate-x-1/2 opacity-55" />
        }
      </div>
    </div>
    </div>
  )
}

export default AddPicture
