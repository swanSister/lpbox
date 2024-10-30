
<script>
import axios from 'axios'
const API_URL = "http://52.79.215.83:3002"
export default { 
  createLp:function(param){
    console.log(param)
      return axios.post(`${API_URL}/lp/create`,param,{
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
 
}
</script>