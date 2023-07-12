import { useMemo, useState } from 'react';
import HNavBar from './components/HNavBar';
import Main from './components/Main';

function App() {

  const [currentPage, setCurrentPage] = useState("AGENT");

  const changePage = (page: string) => {
    setCurrentPage(page);
  }

  const page: JSX.Element | null = useMemo(() => {

    switch(currentPage) {
      case "AGENT": {
        return <Main currentPage="AGENT" />;
      }
      case "FLEET": {
        return <Main currentPage="FLEET" />;
      }
      case "CONTRACT": {
        return <Main currentPage="CONTRACT" />;
      }
      case "SYSTEM": {
        return <Main currentPage="SYSTEM" />;
      }
      default: {
        return <Main currentPage="AGENT" />;
      }
    }
  }, [currentPage]);

  return (
    <div className="App">
        <HNavBar handleClick={changePage}/>
        <div className="container">
          {page}
        </div>
    </div>    
  );
}

export default App;
