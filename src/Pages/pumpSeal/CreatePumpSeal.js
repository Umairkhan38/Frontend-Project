import React, { useState, useEffect } from 'react';
import { TextField ,Button,  Container, Grid, InputLabel , IconButton } from '@mui/material';
// import '../../css/CustomerFrom.css';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';
import axios from 'axios';
// import DataContext from '../../contextAPI/DataContext'
// import "C:/Admin Panel/adminpanel/src/Pages/customerPage/createCustomer/customerFrom.css";
import { useNavigate, useParams } from 'react-router-dom';




export default function CreatePumpSeal() {

  const navigate = useNavigate();
  let {pId} = useParams();
 


  const [formData, setFormData] = useState({
    branch: '',
    endUser: '',
    costingRequirement:true,
    customerAddress: '',
    make: '',
    model: '',
    impeller: '',
    shaft: '',
    sealChamber: '',
    bearingBracket: '',
    tagNumber: '',
    arrangement: '',
    pumpType: '',
    stuffingBox: '',
    stage: '',
    casting: '',
    series: '',
    sealArrangement: '',
    sealType: '',
    performance: '',
    flushPlan: '',
    barrierOrBufferPlan: '',
    quenchPlan: '',
    barrierOrBufferFluid: '',
    designOffered: '',
    sizeAvailable: '',
    materialCode: '',
    sealSeries: '',
    shaftSize: '',
    boreDia: '',
    boreDepth: '',
    nearestObstruction: '',
    allPressureUnit: '',
    totalHeat: '',
    suctionPressure: '',
    dischargePressure: '',
    directionOfRotation: '',
    speed: '',
    boxPressure: '',
    operatingFluid: '',
    allTempPressureUnit: '',
    nature: '',
    operatingTemperature: '',
    minOperatingTemperature: '',
    spGravity: '',
    freezePoint: '',
    boilPoint: '',
    viscosity: '',
    viscosityUnit: '',
    percentageOfSolid: '',
    grainPoint: '',
    description: '',
    d1SleeveOd: '',
    studHoles: '',
    d2StuffingBoxId: '',
    d4StuffingBoxBore: '',
    d5SpigotDia: '',
    d51: '',
    d52: '',
    d9BoltCircle: '',
    boltSize: '',
    l11: '',
    l12: '',
    l1SleeveExten: '',
    l2ShaftHub: '',
    l3ThreadLength: '',
    l8sbDepth: '',
    l9NearObstr: '',
    alpha: '',
    beta: '',
    theta: '',
    createdByUserGUID: '',
    lastEditedByUserGUID: '',
    rowguid: '',
    region: '',
    address: '',
    emailId: '',
    srNo:'',
    dshaftOd: '',
    sboxCover: '',
    mnumberOfBolts: '',
    lraisedCol: ''
  });
  
  

   useEffect(()=>{
    if(pId!==0){
      axios.get(`https://lens-svc.azurewebsites.net/lens-svc/pumSeal/get?pumSealDrfNo=${pId}`)
      .then(res=>{
        const {data} = res;
          setFormData(data);
          console.log("the pId fetched data is ",data)

      }) 
      .catch(err=>{
        console.log(err)
      })

    }else{
      setFormData(
       {
    branch: '',
    endUser: '',
    costingRequirement:true,
    customerAddress: '',
    make: '',
    model: '',
    impeller: '',
    shaft: '',
    sealChamber: '',
    bearingBracket: '',
    tagNumber: '',
    arrangement: '',
    pumpType: '',
    stuffingBox: '',
    stage: '',
    casting: '',
    series: '',
    sealArrangement: '',
    sealType: '',
    performance: '',
    flushPlan: '',
    barrierOrBufferPlan: '',
    quenchPlan: '',
    barrierOrBufferFluid: '',
    designOffered: '',
    sizeAvailable: '',
    materialCode: '',
    sealSeries: '',
    shaftSize: '',
    boreDia: '',
    boreDepth: '',
    nearestObstruction: '',
    allPressureUnit: '',
    totalHeat: '',
    suctionPressure: '',
    dischargePressure: '',
    directionOfRotation: '',
    speed: '',
    boxPressure: '',
    operatingFluid: '',
    allTempPressureUnit: '',
    nature: '',
    operatingTemperature: '',
    minOperatingTemperature: '',
    spGravity: '',
    freezePoint: '',
    boilPoint: '',
    viscosity: '',
    viscosityUnit: '',
    percentageOfSolid: '',
    grainPoint: '',
    description: '',
    d1SleeveOd: '',
    studHoles: '',
    d2StuffingBoxId: '',
    d4StuffingBoxBore: '',
    d5SpigotDia: '',
    d51: '',
    d52: '',
    d9BoltCircle: '',
    boltSize: '',
    l11: '',
    l12: '',
    l1SleeveExten: '',
    l2ShaftHub: '',
    l3ThreadLength: '',
    l8sbDepth: '',
    l9NearObstr: '',
    alpha: '',
    beta: '',
    theta: '',
    createdByUserGUID: '',
    lastEditedByUserGUID: '',
    rowguid: '',
    region: '',
    address: '',
    emailId: '',
    srNo:'',
    dshaftOd: '',
    sboxCover: '',
    mnumberOfBolts: '',
    lraisedCol: ''
  })

    }
    
    
  },[pId])



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };



 


  const handleSubmit = async(e) => {
    e.preventDefault();
    const dateTime = moment().format('YYYY-MM-DD HH:mm:ss');
    

    if (!formData.createdDate) {
      // Update insertedOn and lastUpdatedOn for the last item in customerDetail
      formData.createdDate = dateTime;
    } 
    formData.lastEditedDate=dateTime;

        formData.srNo=parseInt(formData.srNo)
    
      console.log("formData sales is ",formData);


      try{
          const res = await axios.post("https://lens-svc.azurewebsites.net/lens-svc/pumSeal/save", formData);
        console.log("response is ",res.data);
        navigate(`/pumpSealSuccess/${res.data}`);
      }
      catch(err){
        console.log(err);
      }



  };




  const handleUpdate = async (e)=>{
    e.preventDefault();
    const dateTime = moment().format('YYYY-MM-DD HH:mm:ss');
    formData.lastEditedDate=dateTime;
    
      console.log("formData sales is ",formData);

    const res = await axios.put("https://lens-svc.azurewebsites.net/lens-svc/pumSeal/Update", formData);
    console.log("response from update is ",res.data);

    
    pId="";
    navigate(`/pumpSealSuccess/${formData.pumpSealDrfNumber}`);
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
//     <Container className="container" sx= {{marginTop:"20px", backgroundColor:"rgb(250, 251, 251)"}}>
//    {!pId?<h1 style={{marginLeft:"20px"}}>New Sales Inquiry :</h1> : <h1 style={{marginLeft:"20px"}}>Update Sales Inquiry :</h1> }
//       <form onSubmit={handleSubmit} className="form-style">
//         <Grid container spacing={2}>
//          {pId &&<Grid item xs={4}>
//             <InputLabel className="ip-label">Sales Inquiry Number</InputLabel >
//             <TextField
//               className="text-field" 
//               name="inquiryNumber"
//               value={formData.inquiryNumber}
//             />
//           </Grid>
// }          
//       <Grid item xs={4}>
//             <InputLabel className="ip-label" >Company ID</InputLabel >
//             <TextField
//               className="text-field" 
//               name="companyId"
//               value={formData.companyId}
//               onChange={handleChange}
            
//             />
//           </Grid>
//           <Grid item xs={4}>
//             <InputLabel className="ip-label" >Category ID</InputLabel >
//             <TextField
//               className="text-field" 
//               name="categoryId"
//               value={formData.categoryId}
//               onChange={handleChange}
//             />
//           </Grid> 

//           <Grid item xs={4}>
//             <InputLabel className="ip-label">Category Name</InputLabel >
//             <TextField
//               className="text-field" 
//               name="categoryName"
//               value={formData.categoryName}
//               onChange={handleChange}
//             />
//           </Grid> 


//           <Grid item xs={4}>
//             <InputLabel className="ip-label">Customer ID</InputLabel >
//             <TextField
//               className="text-field" 
//               name="customerId"
//               value={formData.customerId}
//               onChange={handleChange}
//             />
//           </Grid> 

//           <Grid item xs={4}>
//             <InputLabel className="ip-label">Customer Name</InputLabel >
//             <TextField
//               className="text-field" 
//               name="customerName"
//               value={formData.customerName}
//               onChange={handleChange}
//             />
//           </Grid> 


//           <Grid item xs={4}>
//             <InputLabel className="ip-label">Customer Address</InputLabel >
//             <TextField
//               className="text-field" 
//               name="customerAddress"
//               value={formData.customerAddress}
//               onChange={handleChange}
//             />
//           </Grid> 


//           <Grid item xs={4}>
//             <InputLabel className="ip-label">Contact Person</InputLabel >
//             <TextField
//               className="text-field" 
//               name="contactPerson"
//               value={formData.contactPerson}
//               onChange={handleChange}
//             />
//           </Grid> 

//           <Grid item xs={4}>
//             <InputLabel className="ip-label">Designation</InputLabel >
//             <TextField
//               className="text-field" 
//               name="designation"
//               value={formData.designation}
//               onChange={handleChange}
//             />
//           </Grid> 

//           <Grid item xs={4}>
//             <InputLabel className="ip-label">Special Comments</InputLabel >
//             <TextField
//               className="text-field" 
//               name="specialComments"
//               value={formData.specialComments}
//               onChange={handleChange}
//             />
//           </Grid> 


//           <Grid item xs={4}>
//             <InputLabel className="ip-label">Mobile Number</InputLabel >
//             <TextField
//               className="text-field" 
//               name="mobileNo"
//               value={formData.mobileNo}
//               onChange={handleChange}
//             />
//           </Grid> 


//           <Grid item xs={4}>
//             <InputLabel className="ip-label">Source</InputLabel >
//             <TextField
//               className="text-field" 
//               name="source"
//               value={formData.source}
//               onChange={handleChange}
//             />
//           </Grid>


//           <Grid item xs={4}>
//             <InputLabel className="ip-label">Branch ID</InputLabel >
//             <TextField
//               className="text-field" 
//               name="branchId"
//               value={formData.branchId}
//               onChange={handleChange}
//             />
//           </Grid> 



//           <Grid item xs={4}>
//             <InputLabel className="ip-label">Industry</InputLabel >
//             <TextField
//               className="text-field" 
//               name="industry"
//               value={formData.industry}
//               onChange={handleChange}
//             />
//           </Grid> 



        
//           {formData?.salesItems?.map((detail, index) => (
//             <div className='card'  key = {index}>
//               {/* <Grid> */}
//           <h4 >Sales Item {index + 1}</h4>
//       <Grid container  spacing={2}>
//         <Grid item xs={12} sm={4}>
//           <InputLabel className="ip-label">Quantity</InputLabel >
//           <TextField
//             className="text-field" 
//             name="quantity"
//             value={detail.quantity}
//             onChange={e => handleChange(e, index)}
//             fullWidth
//           />
//         </Grid>
//         <Grid item xs={12} sm={4}>
//           <InputLabel className="ip-label">Unit</InputLabel >
//           <TextField
//             className="text-field" 
//             name="unit"
//             value={detail.unit}
//             onChange={e => handleChange(e, index)}
//             fullWidth
//           />
//         </Grid>


//         <Grid item xs={12} sm={4}>
//           <InputLabel className="ip-label" >New or Existing</InputLabel >
//           {/* <TextField
//             className="text-field" 
//             name="newOrExisting"
//             value={detail.newOrExisting}
//             onChange={e => handleChange(e, index)}
//             fullWidth
//           /> */}

//           <select name ="newOrExisting" value={detail.newOrExisting} onChange={e => handleChange(e, index)} >
//             <option  value="Existing">Existing</option>
//             <option  value="New">New</option>
//           </select>
//         </Grid>

//         <Grid item xs={12} sm={4}>
//           <InputLabel className="ip-label"  >Type</InputLabel >
//           <TextField
//             className="text-field" 
//             name="type"
//             value={detail.type}
//             onChange={e => handleChange(e, index)}
//             fullWidth
//           />
//         </Grid>

//         <Grid item xs={12} sm={4}>
//           <InputLabel className="ip-label">Size</InputLabel >
//           <TextField
//             className="text-field" 
//             name="size"
//             value={detail.size}
//             onChange={e => handleChange(e, index)}
//             fullWidth
//           />
//         </Grid>


//         <Grid item xs={12} sm={4}>
//           <InputLabel className="ip-label">Header Description</InputLabel >
//           <TextField
//             className="text-field" 
//             name="headerDescription"
//             value={detail.headerDescription}
//             onChange={e => handleChange(e, index)}
//             fullWidth
//           />
//         </Grid>


//         <Grid item xs={12} sm={4}>
//           <InputLabel className="ip-label">Item Description</InputLabel >
//           <TextField
//             className="text-field" 
//             name="itemDescription"
//             value={detail.itemDescription}
//             onChange={e => handleChange(e, index)}
//             fullWidth
//           />
//         </Grid>


//         <Grid item xs={12} sm={4}>
//           <InputLabel className="ip-label"  >CI CODE</InputLabel >
//           <TextField
//             className="text-field" 
//             name="ciCode"
//             value={detail.ciCode}
//             onChange={e => handleChange(e, index)}
//             fullWidth
//           />
//         </Grid>

//           {/* MOC Tyeps    */}
//   { detail.moc.map((elem,idx)=>{
//    return (
//    <div className='card' style={{width:"100%"}} spacing={2}>
//     <h3>{elem.mocType}</h3>

//     <Grid container spacing={2} direction="row">


//   <Grid item xs={12} sm={4}>
//  <InputLabel className="ip-label">Moc Type</InputLabel >
//  <TextField
//    className="text-field" 
//    name="mocType"
//    value={elem.mocType}
//    fullWidth
//  />
// </Grid>

//   <Grid item xs={12} sm={4}>
//  <InputLabel className="ip-label">Mating Ring</InputLabel >
//  <TextField
//    className="text-field" 
//    name="matingRing"
//    value={elem.matingRing}
//    onChange={e => handleChange(e,index, idx)}
//    fullWidth
//  />
// </Grid>


//   <Grid item xs={12} sm={4}>
//  <InputLabel className="ip-label">Seal Ring</InputLabel >
//  <TextField
//    className="text-field" 
//    name="sealRing"
//    value={elem.sealRing}
//    onChange={e => handleChange(e, index, idx)}
//    fullWidth
//  />
// </Grid>


//   <Grid item xs={12} sm={4}>
//  <InputLabel className="ip-label">Elastomer</InputLabel >
//  <TextField
//    className="text-field" 
//    name="elastomer"
//    value={elem.elastomer}
//    onChange={e => handleChange(e,index, idx)}
//    fullWidth
//  />
// </Grid>


//   <Grid item xs={12} sm={4}>
//  <InputLabel className="ip-label">Spring Element</InputLabel >
//  <TextField
//    className="text-field" 
//    name="springElement"
//    value={elem.springElement}
//    onChange={e => handleChange(e,index,  idx)}
//    fullWidth
//  />
// </Grid>


//   <Grid item xs={12} sm={4}>
//  <InputLabel className="ip-label">Hardware</InputLabel >
//  <TextField
//    className="text-field" 
//    name="hardware"
//    value={elem.hardware}
//    onChange={e => handleChange(e,index,  idx)}
//    fullWidth
//  />
// </Grid>


//   <Grid item xs={12} sm={4}>
//  <InputLabel className="ip-label">Fasteners</InputLabel >
//  <TextField
//    className="text-field" 
//    name="fasteners"
//    value={elem.fasteners}
//    onChange={e => handleChange(e, index,idx)}
//    fullWidth
//  />
// </Grid>
// </Grid>
//    </div> 
// )
// })
           
// }   

        
//       </Grid>
//     </div>

   
//           ))}
//           </Grid>
//           <Grid item xs={4}>
//           <Grid item xs={4}  >
        
//         {!pId ?( <Button className="submit-btn" type="submit" onClick ={handleSubmit} variant="contained" >Submit</Button>) : (
//           <>
//             <Button className="update-btn" variant="contained" onClick={handleUpdate} >Update</Button>
//             <Button className="cancel-btn"  variant="contained" onClick={cancelUpdate} >Cancel</Button> </>)}
//           </Grid>
//         </Grid>
//       </form>
//     </Container>

<Container className="container" sx={{ marginTop: '20px', backgroundColor: 'rgb(250, 251, 251)' }}>
{!pId ? <h1 style={{ marginLeft: '20px' }}>New Pump Seal :</h1> : <h1 style={{ marginLeft: '20px' }}>Update Pump Seal :</h1>}
<form onSubmit={handleSubmit} className="form-style">
  <Grid container spacing={2}>
    {Object.keys(formData).map((key, index) => (
      <Grid item xs={4} key={index}>
        <InputLabel className="ip-label">{key}</InputLabel>
        {key === 'costingRequirement' ? (
            <select
              className="text-field" style={{width:"55%", padding:"10px"}}
              name={key}
              value={formData[key]}
              onChange={handleChange}
            >
              <option value={true}>True</option>
              <option value={false}>False</option>
            </select>
          ) : (
            <TextField
              className="text-field" 
              name={key}
              value={formData[key]}
              onChange={handleChange}
            />
          )}
      </Grid>
    ))}
  </Grid>
  <Grid item xs={4}>
    <Grid item xs={4}>
      {!pId ? (
        <Button className="submit-btn" type="submit" variant="contained">
          Submit
        </Button>
      ) : (
        <>
          <Button className="update-btn" variant="contained" onClick={handleUpdate}>
            Update
          </Button>
          <Button className="cancel-btn" variant="contained" onClick={cancelUpdate}>
            Cancel
          </Button>{' '}
        </>
      )}
    </Grid>
  </Grid>
</form>
</Container>


  );

}



