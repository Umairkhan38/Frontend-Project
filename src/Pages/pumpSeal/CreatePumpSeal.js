import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Grid, InputLabel, IconButton } from '@mui/material';
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
  let { pId } = useParams();



  const [formData, setFormData] = useState({
    branch: '',
    endUser: '',
    costingRequirement: true,
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
    srNo: '',
    dshaftOd: '',
    sboxCover: '',
    mnumberOfBolts: '',
    lraisedCol: ''
  });



  useEffect(() => {
    if (pId !== 0) {
      axios.get(`https://lens-svc.azurewebsites.net/lens-svc/pumSeal/get?pumSealDrfNo=${pId}`)
        .then(res => {
          const { data } = res;
          setFormData(data);
          console.log("the pId fetched data is ", data)

        })
        .catch(err => {
          console.log(err)
        })

    } else {
      setFormData(
        {
          branch: '',
          endUser: '',
          costingRequirement: true,
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
          srNo: '',
          dshaftOd: '',
          sboxCover: '',
          mnumberOfBolts: '',
          lraisedCol: ''
        })

    }


  }, [pId])



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };






  const handleSubmit = async (e) => {
    e.preventDefault();
    const dateTime = moment().format('YYYY-MM-DD HH:mm:ss');


    if (!formData.createdDate) {
      // Update insertedOn and lastUpdatedOn for the last item in customerDetail
      formData.createdDate = dateTime;
    }
    formData.lastEditedDate = dateTime;

    formData.srNo = parseInt(formData.srNo)

    console.log("formData sales is ", formData);


    try {
      const res = await axios.post("https://lens-svc.azurewebsites.net/lens-svc/pumSeal/save", formData);
      console.log("response is ", res.data);
      navigate(`/pumpSealSuccess/${res.data}`);
    }
    catch (err) {
      console.log(err);
    }



  };




  const handleUpdate = async (e) => {
    e.preventDefault();
    const dateTime = moment().format('YYYY-MM-DD HH:mm:ss');
    formData.lastEditedDate = dateTime;

    console.log("formData sales is ", formData);

    const res = await axios.put("https://lens-svc.azurewebsites.net/lens-svc/pumSeal/Update", formData);
    console.log("response from update is ", res.data);


    pId = "";
    navigate(`/pumpSealSuccess/${formData.pumpSealDrfNumber}`);
  }



  const cancelUpdate = () => {

    const confirmCancel = window.confirm("Are you sure you want to cancel the update?");
    // If user confirms, navigate to the home page and reload the window
    if (confirmCancel) {
      navigate('/');
      window.location.reload();
    }
  }




  return (

    <Container className="container" sx={{ marginTop: '20px', backgroundColor: 'rgb(250, 251, 251)' }}>
      {!pId ? <h1 style={{ marginLeft: '20px' }}>New Pump Seal :</h1> : <h1 style={{ marginLeft: '20px' }}>Update Pump Seal :</h1>}
      <form onSubmit={handleSubmit} className="form-style">
        {/* {Object.keys(formData).map((key, index) => (
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
    ))} */}
        <div className='card'>
          <h3>Drawing Requisition - Pump Seal :-</h3>
          <Grid container spacing={2}>
            {pId && <Grid item xs={4}>
              <InputLabel className="ip-label" >PumpSeal Drf Number</InputLabel >
              <TextField
                className="text-field"
                name="pumpSealDrfNumber"
                value={formData.pumpSealDrfNumber}
                onChange={handleChange} />
            </Grid>
            }

            <Grid item xs={4}>
              <InputLabel className="ip-label" >Branch</InputLabel >
              <TextField
                className="text-field"
                name="branch"
                value={formData.branch}
                onChange={handleChange} />
            </Grid>


            <Grid item xs={4}>
              <InputLabel className="ip-label" >endUser</InputLabel >
              <TextField
                className="text-field"
                name="endUser"
                value={formData.endUser}
                onChange={handleChange} />
            </Grid>

            <Grid item xs={4}>
              <InputLabel className="ip-label" >Customer Address</InputLabel >
              <TextField
                className="text-field"
                name="customerAddress"
                value={formData.customerAddress}
                onChange={handleChange} />
            </Grid>


            <Grid item xs={4}>
              <InputLabel className="ip-label">Costing Requirement</InputLabel>
              <select
                className="text-field" style={{ width: "55%", padding: "10px" }}
                name="costingRequirement"
                value={formData.costingRequirement}
                onChange={handleChange}
              >
                <option value={true}>True</option>
                <option value={false}>False</option>
              </select>
            </Grid>
          </Grid>
        </div>


        <div className='card'>
          <h3>Pump Data :-</h3>
          <Grid container spacing={2}>

            <Grid item xs={4}>
              <InputLabel className="ip-label" >Make</InputLabel >
              <TextField
                className="text-field"
                name="make"
                value={formData.make}
                onChange={handleChange} />
            </Grid>


            <Grid item xs={4}>
              <InputLabel className="ip-label" >Model</InputLabel >
              <TextField
                className="text-field"
                name="model"
                value={formData.model}
                onChange={handleChange} />
            </Grid>

            <Grid item xs={4}>
              <InputLabel className="ip-label" >Customer Address</InputLabel >
              <TextField
                className="text-field"
                name="customerAddress"
                value={formData.customerAddress}
                onChange={handleChange} />
            </Grid>


            <Grid item xs={4}>
              <InputLabel className="ip-label">Costing Requirement</InputLabel>
              <select
                className="text-field" style={{ width: "55%", padding: "10px" }}
                name="costingRequirement"
                value={formData.costingRequirement}
                onChange={handleChange}
              >
                <option value={true}>True</option>
                <option value={false}>False</option>
              </select>
            </Grid>

            <Grid item xs={4}>
              <InputLabel className="ip-label" >Bearing BKT</InputLabel >
              <TextField
                className="text-field"
                name="bearingBracket"
                value={formData.bearingBracket}
                onChange={handleChange} />
            </Grid>

            <Grid item xs={4}>
              <InputLabel className="ip-label" >Impeller</InputLabel >
              <TextField
                className="text-field"
                name="impeller"
                value={formData.impeller}
                onChange={handleChange} />
            </Grid>

            <Grid item xs={4}>
              <InputLabel className="ip-label" >Shaft</InputLabel >
              <TextField
                className="text-field"
                name="shaft"
                value={formData.shaft}
                onChange={handleChange} />
            </Grid>

            <Grid item xs={4}>
              <InputLabel className="ip-label" >Shaft</InputLabel >
              <TextField
                className="text-field"
                name="sealChamber"
                value={formData.sealChamber}
                onChange={handleChange} />
            </Grid>


            <Grid item xs={4}>
              <InputLabel className="ip-label" >Tag Number</InputLabel >
              <TextField
                className="text-field"
                name="tagNumber"
                value={formData.tagNumber}
                onChange={handleChange} />
            </Grid>

            <Grid item xs={4}>
              <InputLabel className="ip-label" >Arrangement</InputLabel >
              <TextField
                className="text-field"
                name="tagNumber"
                value={formData.arrangement}
                onChange={handleChange} />
            </Grid>

            <Grid item xs={4}>
              <InputLabel className="ip-label">Pump Type</InputLabel>
              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  className="text-field"
                  style={{ width: "45%", padding: "10px" }}
                  type="text"
                  name="pumpType"
                  value={formData.pumpType}
                  onChange={handleChange}
                />
                <select
                  className="text-field"
                  style={{ width: "10%", marginLeft: "10px" }}
                  name="pumpType"
                  value={formData.pumpType}
                  onChange={handleChange}
                >
                  <option value={true}>True</option>
                  <option value={false}>False</option>
                </select>
              </div>
            </Grid>


            <Grid item xs={4}>
              <InputLabel className="ip-label">Stuffing Box</InputLabel >
              <TextField
                className="text-field"
                name="stuffingBox"
                value={formData.stuffingBox}
                onChange={handleChange} />
            </Grid>

            <Grid item xs={4}>
              <InputLabel className="ip-label">Stage</InputLabel >
              <TextField
                className="text-field"
                name="stage"
                value={formData.stage}
                onChange={handleChange} />
            </Grid>


            <Grid item xs={4}>
              <InputLabel className="ip-label">Casting</InputLabel >
              <TextField
                className="text-field"
                name="casting"
                value={formData.casting}
                onChange={handleChange} />
            </Grid>
          </Grid>

        </div>



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


