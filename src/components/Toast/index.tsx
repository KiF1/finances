import { Toaster } from "react-hot-toast";

export function Toast(){
  return(
    <Toaster position="top-right" reverseOrder={true} toastOptions={{
      duration: 5000,
      style: {
        padding: '12px 16px',
        borderRadius: '16px'
      },
      success: {
        style: {
          backgroundColor: '#323238',
          color: '#ffffff',
          fontSize: '16px',
          fontWeight: '500'
        }
      },
      error: {
        style: {
          backgroundColor: '#323238',
          color: '#AB222E',
          fontSize: '16px',
          fontWeight: '500'
        }
      }
    }} />
  )
}