import {Routes , Route } from "react-router-dom";
// import {Form2} from '../form/form2'
import {SalesInquiry} from '../formPage/salesInquiryForm/salesinquiry'
import {Quotation} from '../formPage/quotationId/quotationId'
import {OfmId} from '../formPage/ofmId/ofmId'
import {OfmCommunication} from '../formPage/ofmcommunication/ofmcommunication'
import Customer from '../customerPage/createCustomer/Customer.js';
import EditCustomer from "../customerPage/editCustomer/EditCustomer.js";
import RegistrationSuccessPage from "../customerPage/createCustomer/CustomerSuccess.js";
import UpdateSuccessPage from "../customerPage/editCustomer/UpdateSuccess.js";


const AllRoute = () => {
  return (
    <Routes>
      <Route path="/SalesInquiry" element={<SalesInquiry/>} />
      <Route path="/Quotation" element={<Quotation/>} />
      <Route path="/OfmId" element={<OfmId/>} />
      <Route path="/OfmCommunication" element={<OfmCommunication/>}/>  
      <Route path="/Customer/:rId" element={<Customer/>}/>
      <Route path="/Customer" element={<Customer/>}/>
      <Route path="/editCustomer" element={<EditCustomer/>}/>
      <Route path="/registerSuccess/:id" element={<RegistrationSuccessPage />}/>
      <Route path="/registerSuccess/:id" element={<RegistrationSuccessPage />}/>
      <Route path="/updateSuccess/:id" element={<UpdateSuccessPage />}/>
    </Routes>
  );
};

export default AllRoute;

