import React from 'react'
import { Routes, Route } from "react-router-dom"
import Home from './Home/Home'
import Navbar from './Navbar/Navbar'
import { useState } from 'react'
import Loginn from './Loginn/Loginn'
import Input from './input/input'
import Verifyy from './Verifyy/Verifyy'
import Condition from './Condition/Condition'
import Sidebar from './Homestore/Sidebar/Sidebar'
//import DelBoyProfile from './Homestore/DelBoyProfile/DelBoyProfile'
import UserProfile from './UserProfile/UserProfile'
import DelBoyProfile from './Homestore/DelBoyProfile/DelBoyProfile'
import UserOrderPage from './Homestore/UserOrderPage/UserOrderPage'
import DelOrder from './DelOrderPage/DelOrder/DelOrder'
import OutForDelivery from './DelOrderPage/OutForDelivery/OutForDelivery'
import AllDeliveryBoyTotals from './DelOrderPage/AllDeliveryBoyTotals/AllDeliveryBoyTotals'
import DelOrderHistory from './DelOrderPage/DelOrderHistory/DelOrderHistory'

const App = () => {
  const [showLogin, setShowLogin] = useState(false)
  return (
    <>
      {showLogin ? <Loginn setShowLogin={setShowLogin} /> : <></>}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route>
            <Route path="/" element={<Home />} />
            <Route path='/login' element={<Loginn />} />
            <Route path='/create' element={<Input />} />
            <Route path='/verify' element={<Verifyy />} />
            <Route path='/condition' element={<Condition />} />
            <Route path='/sidebar' element={<Sidebar />} />
            <Route path='/createdelprofileuser' element={<DelBoyProfile />} />
            <Route path='/delorder' element={<DelOrder />} />
            <Route path='/userprofile' element={<UserProfile />} />
            <Route path='/userprofilenano' element={<UserOrderPage />} />
            <Route path="/out-for-delivery/:orderId" element={<OutForDelivery />} />
            <Route path='totalorderlist' element={<AllDeliveryBoyTotals />} />
            <Route path="/delivery/history/:delBoyId" element={<DelOrderHistory />} />
          </Route>
        </Routes>
      </div>
    </>
  )
}

export default App ;