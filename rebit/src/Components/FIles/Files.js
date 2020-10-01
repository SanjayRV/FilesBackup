import React from 'react'
import { Input } from 'antd'
import { Upload, message , Modal} from 'antd';
import { FileDiv, FileSpan, RestoreText, DeleteText, UploadSpan ,ModalText} from '../Header/styles'
import { InboxOutlined } from '@ant-design/icons';
import Header from '../Header/Header'
const { Dragger } = Upload;

const { Search } = Input;




const Files = () => {
  const [files, setFiles] = React.useState([])
  const [user, setUser] = React.useState({})
  const [modal , setModal] = React.useState("")
  const FilesDisplay = () => {
    fetch('http://127.0.0.1:8000/api/dashboard/filesInDevices?email="' + localStorage.getItem('email') + '" ', {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    }).then((result) => {
      result.json().then((resp) => {
        if (resp[0] === "user_id") {
          setFiles([["No files to display"]])
        }
        else
          setFiles(resp)
      })
    })

  }

  const FileDetails = (filename) => {
    console.log("Inside fetch "+ filename)
    fetch('http://127.0.0.1:8000/api/dashboard/fileDetails?filename=' + filename+'', {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    }).then((result) => {
      result.json().then((resp) => {
        setUser({
          filename: resp[0].filename,
          device_name: resp[0].device_name,
          file_version: resp[0].file_version,
          file_size: resp[0].file_size,
        })
      })
    })
    
  }

  const FilesToTrash = (filename) => {
    fetch('http://127.0.0.1:8082/api/fileToTrash', {
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
    FilesDisplay()
  }


  React.useEffect(() => {
    FilesDisplay()
  }, [])


  const props = {
    name: 'file',
    multiple: true,
    action: 'http://127.0.0.1:8082/api/createFile2',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (<>
    <Header />


    <FileDiv>

      <h1> Files</h1>
      <Search style={{ width: "30vw" }} placeholder="Search your files" onSearch={value => console.log(value)} enterButton />

      {files?.map((item, index) => {

        return <FileSpan key={index}>
          {item[0]} <span/> {item[1]}
          {item[0] !== "No files to display" ?
            <span>

              <RestoreText key={index} onClick={() => {
                FileDetails(item[0])
                setModal(true)
              }}>Details </RestoreText>
              <DeleteText key={index} onClick={() => {
                FilesToTrash(item[0])
                window.location.reload()
              }}> Delete</DeleteText>

            </span> : ""
          }
        </FileSpan>
      })}

      <UploadSpan>

        <Dragger w {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined color="#8DC73D" />
          </p>
          <p className="ant-upload-text">Your files are safe with us. Don't worry :)</p>
          <p className="ant-upload-hint">
            Click or drag file to this area to upload
        </p>
        </Dragger>,
    </UploadSpan>

<Modal visible={modal} footer={null} width={500} onCancel={() => setModal(false)}>
<ModalText style={{margin : "30px"}}>

<span style={{color : 'gray' , marginRight : "10px"}}>
                        <p>File Name </p>            
                       <p>Device Name </p> 
                        <p>File version </p>
                        <p>File Size</p> 
</span> 
<span >
    
<p>: {user.filename}  </p>
<p>:  {user.device_name}</p>
<p>: {user.file_version}</p>
<p>:   {user.file_size}</p>
</span>

</ModalText>
</Modal>
    </FileDiv>

  </>

  )
}

export default Files
