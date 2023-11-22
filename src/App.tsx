import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "./lib/react-query"
import { ContextProvider } from "./context/ContextApplication"
import { Router } from "./Router"
import { BrowserRouter } from "react-router-dom"

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ContextProvider>
          <Router />
        </ContextProvider>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
