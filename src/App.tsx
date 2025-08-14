
import './App.css'
import EmploymentForm from './pages/EmploymentForm'
import ThemeProvider from './theme/ThemeProvider'

function App() {
  return (
    <ThemeProvider>
      <EmploymentForm />
    </ThemeProvider>
  )
}

export default App
