import React, { useState, useEffect } from 'react';
import { TextField ,Button,  Container, Grid, InputLabel , IconButton } from '@mui/material';
import '../../css/CustomerFrom.css';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';
import axios from 'axios';
import { useContext } from 'react'; 
// import DataContext from '../../contextAPI/DataContext'
import { useNavigate, useParams } from 'react-router-dom';




export default function Customer() {

  const navigate = useNavigate();
  let {rId} = useParams();
 


  const [formData, setFormData] = useState({
    branchId: '',
    name: '',
    customerDetail:[],
    insertedByUserId:'10223',
    lastUpdatedByUserId:'10223',
    insertedOn:'',
    lastUpdatedOn:''
  });
  
  

   useEffect(()=>{
    if(rId!==undefined){
      axios.get(`https://lens-svc.azurewebsites.net/lens-svc/customer/get?customerRefrenceNumber=${rId}`)
      .then(res=>{
        const {data} = res;
          setFormData(data);
          console.log("the rId fetched data is ",data)

      }) 
      .catch(err=>{
        console.log(err)
      })
    }else{

      setFormData({ branchId: '',
      name: '',
      customerDetail:[],
      insertedByUserId:'10223',
      lastUpdatedByUserId:'10223',
      insertedOn:'',
      lastUpdatedOn:''})

    }
    
    
  },[rId])




  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const newFormData = { ...formData };
    if (index === undefined) {
      newFormData[name] = value;
    } else {
      newFormData.customerDetail[index][name] = value;
    }
    setFormData(newFormData);
  };


  const handleAddCustomerDetail = () => {
    setFormData(prevState => ({
      ...prevState,
      customerDetail: [
        ...prevState.customerDetail,
        {
          address: '',
          contactPerson: '',
          designation: '',
          telephoneNos: '',
          eccNo: '',
          sstNo: '',
          cstNo: '',
          insertedByUserId: '10223',
          lastUpdatedByUserId: '10223',
          gstNo: '',
          industryId: '',
          panNo: ''
        }
      ]
    }));
  };
  
  const handleDeleteCustomerDetail = index => {
    setFormData(prevState => {
      const newCustomerDetail = [...prevState.customerDetail];
      newCustomerDetail.splice(index, 1);
      return { ...prevState, customerDetail: newCustomerDetail };
    });
  };
  

  const handleSubmit = async(e) => {
    e.preventDefault();
    const dateTime = moment().format('YYYY-MM-DD HH:mm:ss');
    

    if (formData.customerDetail && formData.customerDetail.length > 0) {
      // Update insertedOn and lastUpdatedOn for the last item in customerDetail
      formData.customerDetail[formData.customerDetail.length -1].lastUpdatedOn = dateTime;
      formData.customerDetail[formData.customerDetail.length -1].insertedOn = dateTime;
    } 
      // If customerDetail is not defined or empty, set insertedOn and lastUpdatedOn for formData
      formData.insertedOn = dateTime;
      formData.lastUpdatedOn = dateTime;
    
  
    
    const res = await axios.post("https://lens-svc.azurewebsites.net/lens-svc/customer/save", formData);
    console.log("response is ",res.data);
    navigate(`/registerSuccess/${res.data}`);

    console.log(formData);
    // Add form submission logic here

  };



  const handleUpdate = async (e)=>{
    e.preventDefault();
    const dateTime = moment().format('YYYY-MM-DD HH:mm:ss');

    if (formData.customerDetail && formData.customerDetail.length > 0) {
      // Update insertedOn and lastUpdatedOn for the last item in customerDetail
      formData.customerDetail[formData.customerDetail.length -1].lastUpdatedOn = dateTime;
      // formData.customerDetail[formData.customerDetail.length -1].insertedOn = dateTime;
    } 
      // If customerDetail is not defined or empty, set insertedOn and lastUpdatedOn for formData
      // formData.insertedOn = dateTime;
      formData.lastUpdatedOn = dateTime;

    const res = await axios.put("https://lens-svc.azurewebsites.net/lens-svc/customer/Update", formData);
    console.log("response from update is ",res.data);

    
    console.log(formData);
    rId=null;
    navigate(`/updateSuccess/${formData.customerReferenceNumber}`);
  }

  const cancelUpdate = ()=>{

      const confirmCancel = window.confirm("Are you sure you want to cancel the update?");
   // If user confirms, navigate to the home page and reload the window
  if (confirmCancel) {
    navigate('/');
    window.location.reload();
  }
  }

  return (

 
    <Container sx= {{marginTop:"20px", backgroundColor:"rgb(250, 251, 251)"}}>
      <h1 style={{marginLeft:"20px"}}>New Customer Registration :</h1>
      {/* <hr /> */}
      <form onSubmit={handleSubmit} style={{backgroundColor:"white", padding:"25px",border:"1px solid lightgray", borderRadius:"10px", boxShadow:"rgba(90, 114, 123, 0.11) 0px 7px 30px 0px", margin:"15px"}}>
        <Grid container spacing={2}>
         {rId &&<Grid item xs={4}>
            <InputLabel sx={{color:"black"}} >Customer Reference No</InputLabel >
            <TextField sx={{borderColor:"#DEE3E9", borderRadius:"10px" , backgroundColor:"white"}}
              name="customerReferenceNumber"
              value={formData.customerReferenceNumber}
            />
          </Grid>

}          <Grid item xs={4}>
            <InputLabel sx={{color:"black"}} >Branch ID</InputLabel >
            <TextField sx={{borderColor:"#DEE3E9", borderRadius:"10px" , backgroundColor:"white"}}
              name="branchId"
              value={formData.branchId}
              onChange={handleChange}
            
            />
          </Grid>
          <Grid item xs={4}>
            <InputLabel sx={{color:"black"}} >Name</InputLabel >
            <TextField sx={{borderColor:"#DEE3E9", borderRadius:"10px" , backgroundColor:"white"}}
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Grid> 

          {formData?.customerDetail?.map((detail, index) => (
            <div style={{display:'flex',flexDirection:'column' ,margin:"20px", padding: "10px 20px 20px 20px", borderRadius: "8px", border: "1px solid #ddd", backgroundColor: "white", boxShadow:"rgba(90, 114, 123, 0.11) 0px 7px 30px 0px"  }}  key = {index}>
              {/* <Grid> */}
          <h4 >Customer Detail {index + 1}</h4>
      <Grid container  spacing={2}>
        <Grid item xs={12} sm={4}>
          <InputLabel sx={{color:"black"}} >Address</InputLabel >
          <TextField sx={{borderColor:" #DEE3E9", borderRadius:"10px" , backgroundColor:"white"}}
            name="address"
            value={detail.address}
            onChange={e => handleChange(e, index)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <InputLabel sx={{color:"black"}} >Contact Person</InputLabel >
          <TextField sx={{borderColor:"#DEE3E9", borderRadius:"10px" , backgroundColor:"white"}}
            name="contactPerson"
            value={detail.contactPerson}
            onChange={e => handleChange(e, index)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <InputLabel sx={{color:"black"}} >Industry Id</InputLabel >
          <TextField sx={{borderColor:"#DEE3E9", borderRadius:"10px" , backgroundColor:"white"}}
            name="industryId"
            value={detail.industryId}
            onChange={e => handleChange(e, index)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <InputLabel sx={{color:"black"}} >Designation</InputLabel >
          <TextField sx={{borderColor:"#DEE3E9", borderRadius:"10px" , backgroundColor:"white"}}
            name="designation"
            value={detail.designation}
            onChange={e => handleChange(e, index)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <InputLabel sx={{color:"black"}} >Telephone Number</InputLabel >
          <TextField sx={{borderColor:"#DEE3E9", borderRadius:"10px" , backgroundColor:"white"}}
            name="telephoneNos"
            value={detail.telephoneNos}
            onChange={e => handleChange(e, index)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <InputLabel sx={{color:"black"}} >Ecc No</InputLabel >
          <TextField sx={{borderColor:"#DEE3E9", borderRadius:"10px" , backgroundColor:"white"}}
            name="eccNo"
            value={detail.eccNo}
            onChange={e => handleChange(e, index)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <InputLabel sx={{color:"black"}} >SSt No</InputLabel >
          <TextField sx={{borderColor:"#DEE3E9", borderRadius:"10px" , backgroundColor:"white"}}
            name="sstNo"
            value={detail.sstNo}
            onChange={e => handleChange(e, index)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <InputLabel sx={{color:"black"}} >GST No</InputLabel >
          <TextField sx={{borderColor:"#DEE3E9", borderRadius:"10px" , backgroundColor:"white"}}
            name="gstNo"
            value={detail.gstNo}
            onChange={e => handleChange(e, index)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <InputLabel sx={{color:"black"}} >Pan No</InputLabel >
          <TextField sx={{borderColor:"#DEE3E9", borderRadius:"10px" , backgroundColor:"white"}}
            name="panNo"
            value={detail.panNo}
            onChange={e => handleChange(e, index)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <InputLabel sx={{color:"black"}} >CST No</InputLabel >
          <TextField sx={{borderColor:"#DEE3E9", borderRadius:"10px" , backgroundColor:"white"}}
            name="cstNo"
            value={detail.cstNo}
            onChange={e => handleChange(e, index)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <IconButton onClick={() => handleDeleteCustomerDetail(index)} style={{ backgroundColor: "red", color: "white" }}>

            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
    </div>

   
          ))}

<Button style={{backgroundColor:"#03C9D7", color:"white", height:'30px',marginTop:'2rem', marginLeft:"18px"}} onClick={handleAddCustomerDetail}><AddIcon/> Add Customer Details</Button>
          </Grid>
          <Grid item xs={4}>
          <Grid item xs={4}  >
        
        {!rId ?( <Button type="submit" onClick ={handleSubmit} variant="contained" style={{backgroundColor:"black",padding:"8px 12px",marginTop:"10px"}}>Submit</Button>) : (
          <>
            <Button  variant="contained" onClick={handleUpdate}   style={{backgroundColor:"blue",padding:"8px 12px",marginTop:"8px"}}>Update</Button>
            <Button  variant="contained" onClick={cancelUpdate}   style={{backgroundColor:"gray",padding:"8px 12px",marginTop:"8px", marginLeft:"15px"}}>Cancel</Button> </>)}
          </Grid>
        </Grid>
      </form>
    </Container>
  );

}

