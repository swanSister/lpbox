
<script>
import axios from 'axios'
const API_URL = "http://3.34.211.151:3002"
export default { 
  createLp:function(param){
    console.log(param)
      return axios.post(`${API_URL}/lp/create`,param,{
        headers: {
          accept: 'application/json',
        }
      })
  },
  getAllUser:function(param){
    console.log(param)
      return axios.post(`${API_URL}/user/getAllUser`,param,{
        headers: {
          accept: 'application/json',
        }
      })
  },
  getAllLpList:function(param){
    console.log(param)
      return axios.post(`${API_URL}/lp/getAllLpList`,param,{
        headers: {
          accept: 'application/json',
        }
      })
  },
  uploadLPImage:function(file,filename){
    console.log("uploadLPImage",file)
    let formData = new FormData()
    formData.append('image', file)
    return axios.post(`${API_URL}/images/${filename}`, formData,{
      headers: {
      'content-type': 'multipart/form-data' //do not forget this 
      }
    })
  },
  updateLp:function(param){
    console.log(param)
      return axios.post(`${API_URL}/lp/updateById`,param,{
        headers: {
          accept: 'application/json',
        }
      })
  },
  deleteLp:function(param){
    console.log(param)
      return axios.post(`${API_URL}/lp/deleteById`,param,{
        headers: {
          accept: 'application/json',
        }
      })
  },
  deleteImg:function(param){
    console.log(param)
      return axios.post(`${API_URL}/lp/deleteImgById`,param,{
        headers: {
          accept: 'application/json',
        }
      })
  },
 
}
</script>