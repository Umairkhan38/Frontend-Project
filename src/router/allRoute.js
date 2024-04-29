import {Routes , Route } from "react-router-dom";
// import {Form2} from '../form/form2'
import {Quotation} from '../formPage/quotationId/quotationId'
import {OfmId} from '../formPage/ofmId/ofmId'
import {OfmCommunication} from '../formPage/ofmcommunication/ofmcommunication'
import Customer from '../Pages/customerPage/createCustomer/Customer.js';
import EditCustomer from "../Pages/customerPage/editCustomer/EditCustomer.js";
import RegistrationSuccessPage from "../Pages/customerPage/createCustomer/CustomerSuccess.js";
import UpdateSuccessPage from "../Pages/customerPage/editCustomer/UpdateSuccess.js";
import CreateSales from "../Pages/salesinquiryPage/CreateSales.js";
import SalesSuccessPage from "../Pages/salesinquiryPage/SalesSuccess.js";


const AllRoute = () => {
  return (
    <Routes>
      <Route path="/SalesInquiry" element={<CreateSales />} />
      <Route path="/Quotation" element={<Quotation/>} />
      <Route path="/OfmId" element={<OfmId/>} />
      <Route path="/OfmCommunication" element={<OfmCommunication/>}/>  
      <Route path="/Customer/:rId" element={<Customer/>}/>
      <Route path="/Customer" element={<Customer/>}/>
      <Route path="/editCustomer" element={<EditCustomer/>}/>
      <Route path="/registerSuccess/:id" element={<RegistrationSuccessPage />}/>
      <Route path="/salesSuccess/:id" element={<SalesSuccessPage />}/>
      <Route path="/updateSuccess/:id" element={<UpdateSuccessPage />}/>
    </Routes>
  );
};

export default AllRoute;

