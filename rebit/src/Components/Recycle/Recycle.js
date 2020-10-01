import React, { Component } from 'react';
import { Input } from 'antd'
import { Upload, message } from 'antd';
import { FileDiv, FileSpan, RestoreText, DeleteText, UploadSpan } from '../Header/styles'
import { InboxOutlined } from '@ant-design/icons';
import Header from '../Header/Header'
const { Dragger } = Upload;

const { Search } = Input;




const Files = () => {
  const [files, setFiles] = React.useState([])

  const FilesDisplay = () => {

    fetch('http://127.0.0.1:8000/api/dashboard/filesInBin?email="' + localStorage.getItem('email') + '" ', {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    }).then((result) => {
      result.json().then((resp) => {
        console.log("Response " + resp[0])
        if (resp[0] === "user_id") {
          setFiles([["No files to display"]])
        }
        else
          setFiles(resp)

      })
    })

  }

  const Restore = (filename) => {
    fetch('http://127.0.0.1:8082/api/restore', {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ "filename": filename })
    }).then((result) => {
      result.json().then((resp) => {
      })
    })

  }

  const Delete = (filename) => {
    fetch('http://127.0.0.1:8082/api/deleteFile', {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ "filename": filename })
    }).then((result) => {
      result.json().then((resp) => {
        console.log("Response " + resp)

      })
    })

  }

  React.useEffect(() => {
    FilesDisplay()
  }, [])


  return (<>
    <Header />


    <FileDiv>

      <h1> Recycle Bin</h1>
      
         {files?.map((item, index) => {
            console.log(item[0])
          return <FileSpan key={index}>
            {item[0]} 
            {item[0] !== "No files to display"?
             <span>
              <RestoreText key={index} onClick={() => {
                Restore(item[0])
                window.location.reload()
              }}> Restore</RestoreText>

              <DeleteText key={index} onClick={() => {
                Delete(item[0])
                // forceUpdate()
                window.location.reload()
              }}> Delete</DeleteText>
            </span>:""
            }
          </FileSpan>
        }
        )
    
      
  
}
    </FileDiv>
  </>
  )
}

export default Files
