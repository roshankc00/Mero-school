import { object, string, mixed, number } from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { getData, postDataWithHeader, updateDataWithHeader } from '../../../services/axios.service';
import { useSelector } from "react-redux";
import { errorToast, sucessToast } from "../../../services/toastify.service";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Lecture from '../../../../../server/src/models/lecture.model';

const EditLectureForm = () => {
    const [lecture, setlecture] = useState<any>({})
    const [removeVedio, setremoveVedio] = useState<boolean>(true)    
  const navigate=useNavigate()
  const {id}=useParams()
  const token=useSelector((e:any)=>{
    return e.auth.jwt
  })



  const getLecture=async()=>{
const   response=await getData(`lecture/${id}`,token)
   if(response.sucess){
    setlecture(response)
   }
  }

  useEffect(()=>{
    getLecture()  
    // console.log(lecture.lecture,"useeffect")
  },[])

  
  
  const handleSubmit = async(values: any, { setSubmitting }: any) => {
    try {
      console.log(values)
      const isVideoEdited:boolean= values.file!==null;
      const formData=new FormData();
      formData.append("title",values.title)
      formData.append("duration",values.duration)
      formData.append("content",values.content)
      console.log(typeof values.duration,"duration")
      if(isVideoEdited){
        formData.append("file",values.file)
      }
      // formData.append('isVideoEdited',isVideoEdited)
      // const response=await updateDataWithHeader(`lecture/${id}`,formData,token)
      // console.log(response) 
      setSubmitting(false)                      
    } catch (error:any) {
      console.log(error)
      
    }
  };


  




  // validation
  const lectureValidationSchema = object().shape({
    title: string().required("title is required"),
    content: string().required("content is required"),
    duration: number().required("duration is required"),
    file: mixed().notRequired(),
  });


  const handlerRemoveVedio=(setFieldValue:any)=>{
    setFieldValue('file',null)

    setremoveVedio(false);
  }
  
  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-bold text-3xl text-red-800 my-5"> Edit Lecture</h2>
 
       {lecture.sucess&&

       
      <Formik
        initialValues={{
          title: lecture.lecture.title,
          content: lecture.lecture.content,
          duration: lecture.lecture.duration,
          file: null,
        }}       
        validationSchema={lectureValidationSchema}
        onSubmit={handleSubmit}
      >
        {({values, isSubmitting,setFieldValue}: any) => {
          return (
            <Form>
              <div className="mb-4">
                <label htmlFor="title" className="block mb-2">
                  Title
                </label>
                <Field
                  type="text"
                  id="title"
                  value={values.title}
                  name="title"
                  className="w-full border px-4 py-2"
                ></Field>
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500 mt-1"
                  />
              </div>
              <div className="mb-4">
                <label htmlFor="content" className="block mb-2">
                  Content
                </label>
                <Field
                  type="textarea"
                  id="content"
                  value={values.content }
                  name="content"
                  className="w-full border px-4 py-2"
                ></Field>
                <ErrorMessage
                  name="content"
                  component="div"
                  className="text-red-500 mt-1"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="duration" className="block mb-2">
                  Duration
                </label>
                <Field
                  type="number"
                  id="duration"
                  value={values.duration}
                  name="duration"
                  className="w-full border px-4 py-2"
                ></Field>
                <ErrorMessage
                  name="duration"
                  component="div"
                  className="text-red-500 mt-1"
                />
              </div>
              <div className="mb-4">


                <label htmlFor="file" className="block mb-2">
                  Video
                </label>
                {removeVedio?
                <>
                <video src={lecture.lectureUrl} controls width='250' height='250'></video>
                <button className='bg-blue-800 text-white p-2 1 mt-2 rounded-md' onClick={(e)=>{
                  e.preventDefault();
                  handlerRemoveVedio(setFieldValue);

                }}>Remove Vedio</button>
                </>:

                <>
                  <input
                  type="file"
                  name="file"
                  id="file"
                  onChange={(e:any)=>{
                    setFieldValue("file",e.currentTarget.files[0])
                  }}
                  className="w-full border px-4 py-2"
                  
                ></input>
                
              </>
                }
               
              
               
              </div>          

              <button type="submit" className="bg-blue-500 rounded-md hover:bg-blue-600 p-2 text-white fw-fw-bolder">
                {isSubmitting ? "Editing...." :"Edit lecture"}          
              </button>
            </Form>
          );
        }}
      </Formik>
          }
    </div>
  );
};

export default EditLectureForm;
