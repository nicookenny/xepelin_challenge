/** @format */

import { RouterProvider } from 'react-router-dom'
import { router } from './modules/common/components/Router/Router'
import {
  UserContextProvider,
  useUserContext,
} from './modules/user/context/UserContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Text = () => {
  const { account, user } = useUserContext()
  console.log({
    account,
    user,
  })

  return <></>
}

function App() {
  return (
    <UserContextProvider>
      <ToastContainer />
      <Text />
      <RouterProvider router={router} />
    </UserContextProvider>
  )
}

export default App
